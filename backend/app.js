const http = require("http");
const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./models/index");
const messageRoutes = require("./routes/messageRoutes");
require("dotenv").config();
const socketIO = require("./Socket_IO");
require("./crons/archievedChats");
const geminiRoutes= require("./routes/geminiRoutes");

app.use(express.json());
app.use(cors({
    origin:"http://localhost:5174",
    credentials:true
}));
app.use(cookieParser());

app.use("/users",userRoutes);
app.use("/messages",messageRoutes);
app.use("/gemini",geminiRoutes);

const server = http.createServer(app);

socketIO(server);



module.exports = server;