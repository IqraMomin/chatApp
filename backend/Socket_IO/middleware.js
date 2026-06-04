const { User } = require("../models");
const jwt = require("jsonwebtoken");
const cookie= require("cookie");

module.exports = (io)=>{
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
            const user =await User.findOne({
                where:{
                    id:decoded.id
                }
            });
            if(!user){
                return next(
                    new Error("User not found")
                );
            }
            console.log("Decoded Id : ",decoded.id,"User",user.name,user.id);
            socket.user = user;
            next();
    
        }catch(err){
            console.log(err.message);
            next(new Error("Invalid Token"));
        }
    })
}