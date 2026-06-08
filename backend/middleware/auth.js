const jwt = require("jsonwebtoken");

const authenticate = async(req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRETKEY);
        req.user = decoded;
        next();

    }catch(err){
        return res.status(401).json({
            message: "Invalid Token"
        });

    }
}

module.exports={authenticate}