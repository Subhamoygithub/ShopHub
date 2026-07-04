const jwt = require("jsonwebtoken");
const JwtVerify =(req,res,next)=>{
    const authHeader = req.headers["authorization"];


    if(!authHeader){
        return res.status(401).json({message:"Authorization Header Misssing",
            error:null,status:false
        })
    }

    const token = authHeader.split(" ")[1];
    console.log("Token : ", token);


    if(!token){
        return res.status(401).json({
            message: "Token Missing", error : null , status : false
        });
    }

    jwt.verify(token,process.env.JWT_KEY,(err,decode)=>{
        if(err){
         console.error("JWT VERIFY ERROR" ,err);
         return res.status(403).json({
            message : "Invalid token",
         });
         
        }
        console.log("JWT SUCCESS");
        console.log(decode);
        req.user = decode;

        next();
        
        
    });
};
module.exports = JwtVerify