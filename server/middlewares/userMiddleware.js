// authentication
const jwt=require("jsonwebtoken");


function userMiddleware(req,res,next){
    const fulltoken= req.headers.authorization;
    const token=fulltoken.split(" ")[1];
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(decoded.username){
            next();
        }else(
            res.status(403).json({
                msg:"You are not authenticated"
            })
        )
    }catch(e){
        res.status(411).json({
            msg:"Incorrect outputs"
        })
    }
}

module.exports=userMiddleware;