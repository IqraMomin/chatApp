const {Server} = require("socket.io");
const socketAuth = require("../Socket_IO/middleware");
const chatHandler = require("../Socket_IO/handlers/chat");
const personalChatHandler = require("../Socket_IO/handlers/personalChat");


module.exports = (server)=>{
    const io = new Server(server,{cors:{
        origin:"http://localhost:5173",
        credentials:true
    }});

    socketAuth(io);

    io.on("connection",(socket)=>{
      chatHandler(socket,io); 
      personalChatHandler(socket,io);
    })
}