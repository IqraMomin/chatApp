const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async(req,res)=>{
    try{
        const {name,email,password,phone} = req.body;
        const existingUser = await User.findOne({
            where:{email}
        });
        if(existingUser){
            return res.status(400).json({message:"User Already Exists"});
        }
        const saltRounds =10;
        const hashedPassword = await bcrypt.hash(password,saltRounds);
        const user = await User.create({name,email,phone,password:hashedPassword});
        return res.status(201).json({
            id:user.id,name,email,phone
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong"
          });
    }
}

const login = async(req,res)=>{
    try{
        const {email,password} =req.body;
    const user = await User.findOne({
        where:{email}
    });
    if(!user){
        return res.status(400).json({message:"Invalid Credentials"});
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({message:"Invalid Credentials"});
    }
    const token = await jwt.sign({id:user.id},process.env.JWT_SECRETKEY);
    res.cookie("token",token,{
        httpOnly:true,
        sameSite:"strict"
    })
    console.log(token);
    return res.json({message:"Login Successful"});
    }
    catch(err){
        console.log(err);
    }
}


module.exports = {signup,login}