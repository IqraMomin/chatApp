const Message = require("../models/messageModel");
const { Op } = require("sequelize");
const AWS = require("aws-sdk");

const uploadToS3 = async (file, fileName,fileType) => {
    let s3Bucket = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_KEY
    })
   var params = {
            Bucket: process.env.BUCKET_NAME,
            Key: fileName,
            Body: file,
            ContentType:fileType
   }
    return new Promise((resolve,reject)=>{
        s3Bucket.upload(params,(err,s3response)=>{
            if(err){
                console.log(err);
                reject(err);
            }
            else{
                resolve(s3response.Location);
            }
        })
    })
}

const createMessage = async (data) => {

    const savedMessage =
        await Message.create({
            userId: data.userId,
            message: data.message.text,
            mediaUrl: data.message.mediaUrl
        });

    return savedMessage;
};

const uploadMedia = async (req, res) => {
    try {
        const file = req.file;
        const fileName = `${Date.now()}-${file.originalname}`;
        const fileUrl = await uploadToS3(file.buffer, fileName,file.mimetype);
        
        return res.status(200).json({ fileUrl, success: true })

    } catch (err) {
        return res.status(500).json({ fileUrl: "", success: false })
    }
}


const sendMessage = async (req, res) => {
    try {
        const { userId, message } = req.body;
        if (!userId || !message) {
            return res.status(400).json({
                success: false,
                message: "UserId and Message both are required"
            });
        }
        const savedMessage = await Message.create({
            userId, message
        });
        return res.status(201).json({
            success: true,
            data: savedMessage
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const getMessages = async (req, res) => {
    try {
        const lastMessageId = Number(req.query.lastMessageId) || 0;
        const checkMessages = async () => {
            const messages = await Message.findAll({
                where: {
                    id: {
                        [Op.gt]: lastMessageId
                    }
                }
            })
            if (messages.length > 0) {
                res.status(200).json(messages);
                return true;
            }
            return false;
        }
        const immediate = await checkMessages();
        if (immediate) return;
        const interval = setInterval(async () => {
            const found = await checkMessages();
            if (found) {
                clearInterval(interval);
            }
        }, 1000)
        setTimeout(() => {
            clearInterval(interval);
            if (!res.headersSent) {
                return res.status(200).json([]);
            }
        }, 3000);

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = { sendMessage, getMessages, createMessage, uploadMedia }