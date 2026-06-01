const http = require("http");
const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./models/index");
const messageRoutes = require("./routes/messageRoutes");
const {Server} = require("socket.io");
const { createMessage } = require("./controllers/messageController");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser());

app.use("/users",userRoutes);
app.use("/messages",messageRoutes);

const server = http.createServer(app);
const io = new Server(server,{cors:{
    origin:"http://localhost:5173",
    credentials:true
}});

io.use((socket,next)=>{
    try{
        const token = socket.handshake.headers.cookie;
        if(!token){
            next(new Error("Unauthorized"));
        }
        const decoded = jwt.verify(token,process.env.SECRETKEY);
        socket.user = decoded;
        next();

    }catch(err){
        next(new Error("Invalid Token"));
    }
})

io.on("connection",(socket)=>{
    console.log("User Connected with id:",socket.id);
    socket.on("sendMessage",async(data)=>{
        try{
            const savedMessage = await createMessage(data);
            io.emit("receiveMessage",{username:socket.user.name,message:savedMessage}); 
        }catch(err){
            console.log(err.message);
        }
    })
})


module.exports = server;