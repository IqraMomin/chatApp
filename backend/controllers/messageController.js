const Message = require("../models/messageModel");
const {Op} = require("sequelize");

const sendMessage = async(req,res)=>{
try{
    const {userId,message} = req.body;
    if(!userId || !message){
        return res.status(400).json({
            success:false,
            message:"UserId and Message both are required"
        });        
    }
    const savedMessage =await Message.create({
        userId,message
    });
    return res.status(201).json({
        success:true,
        data:savedMessage
    })

}catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    });
}
}

const getMessages = async(req,res)=>{
    try{
        const lastMessageId = Number(req.query.lastMessageId) || 0;
        const checkMessages = async()=>{
            const messages = await Message.findAll({
                where:{
                    id:{
                        [Op.gt]:lastMessageId
                    }
                }
            })
            if(messages.length>0){
                res.status(200).json(messages);
                return true;
            }
            return false;
        }
        const immediate = await checkMessages();
        if(immediate) return;
        const interval = setInterval(async()=>{
            const found = await checkMessages();
            if(found){
                clearInterval(interval);
            }
        },1000)
        setTimeout(()=>{
            clearInterval(interval);
            if(!res.headersSent){
                return res.status(200).json([]);
            }
        },3000);

    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = {sendMessage,getMessages}