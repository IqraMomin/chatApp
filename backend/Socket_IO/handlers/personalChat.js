const { createMessage } = require("../../controllers/messageController");

module.exports= (socket,io)=>{
    socket.on("join-room",(roomName)=>{
        socket.join(roomName)
    })
    socket.on("new-message",async(data)=>{
        try{
            const savedMessage = await createMessage(data);
            console.log(socket.user.name);
            io.to(data.roomName).emit("new-message",{username:socket.user.name,message:savedMessage}); 
        }catch(err){
            console.log(err.message);
        }
        
    })
}