const Message = require("../models/messageModel");

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

export const getMessages = async(req,res)=>{
    try{
        const messages = await Message.findAll();
        if(!messages){
            return res.status(400).json({message:"Messages not found"});
        }
        return res.status(200).json(messages);

    }catch(err){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {sendMessage,getMessages}