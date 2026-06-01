const { createMessage } = require("../../controllers/messageController");

module.exports= (socket,io)=>{
    socket.on("sendMessage",async(data)=>{
        try{
            const savedMessage = await createMessage(data);
            io.emit("receiveMessage",{username:socket.user.name,message:savedMessage}); 
        }catch(err){
            console.log(err.message);
        }
    })
}