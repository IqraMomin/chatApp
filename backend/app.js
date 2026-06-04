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

app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser());

app.use("/users",userRoutes);
app.use("/messages",messageRoutes);

const server = http.createServer(app);

socketIO(server);



module.exports = server;