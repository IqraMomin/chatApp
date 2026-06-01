const http = require("http");
const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cookie = require("cookie");
require("./models/index");
const messageRoutes = require("./routes/messageRoutes");
const {Server} = require("socket.io");
const { createMessage } = require("./controllers/messageController");
const jwt = require("jsonwebtoken");
const User = require("./models/userModel");
require("dotenv").config();

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

io.use(async(socket,next)=>{
    try{
        const cookies = cookie.parse(
            socket.handshake.headers.cookie || ""
        );
        const token = cookies.token;
        console.log("Token",token);
        if(!token){
           return next(new Error("Unauthorized"));
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRETKEY);
        const user =await User.findByPk(decoded.id);
        if(!user){
            return next(
                new Error("User not found")
            );
        }

        socket.user = user;
        next();

    }catch(err){
        console.log(err.message);
        next(new Error("Invalid Token"));
    }
})

io.on("connection",(socket)=>{
    console.log("User Connected with id:",socket.user.name);
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