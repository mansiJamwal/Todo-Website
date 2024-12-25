const express=require("express");
const router=express.Router();
const {User,Todo}=require("../databases/db");
const userMiddleware=require("../middlewares/userMiddleware")

const jwt=require("jsonwebtoken");


//sign up
router.post('/signup',async (req,res)=>{
    try{
    const username=req.body.username;
    const password=req.body.password;
    const exists=await User.findOne({username:username});
    if(exists){
        res.status(409).json({
            msg:'user already exists'
        }
        )
    }else{
        await User.create({
            username:username,
            password:password
        })
        const token= jwt.sign({username},process.env.JWT_SECRET);
        res.json({
            token: token
        })
    }
}catch(e){
    res.status(403).json({
        msg:"Incorrect inputs"
    })
}
})

//sign in
router.post('/signin',async(req,res)=>{
    try{
        console.log(req.body.username, req.body.password)
        const username=req.body.username;
        const password=req.body.password;
        const user=await User.findOne({
            username:username,
            password:password
        })
        console.log(user)
        if(user){
            const token= jwt.sign({username},process.env.JWT_SECRET);
            res.status(200).json({
                token: token
            })
        }else{
            res.status(403).json({
                msg:"User not found"
            })
        }
    }catch(e){
        res.status(411).json({
            msg:"Incorrect validation"
        })
    }
})

router.delete('/deleteaccount',userMiddleware,async(req,res)=>{
    try{
        const { username, password } = req.body;
        console.log("Received request to delete account with:", req.body);
       
        const user = await User.findOne({ username, password });
        
        if (!user) {
            return res.status(404).json({
                msg: "User not found or invalid credentials"
            });
        }
        const todos = await Todo.find({ user: user._id });
        for (let todo of todos) {
            await Todo.findOneAndDelete({ _id: todo._id });
        }
        const response=await User.deleteOne(user);
        res.status(200).json({
            msg: "Account deleted successfully"
        });
    }catch(e){
        console.log("error encountered")
        res.status(411).json({
            
            msg:"incorrect validation"
        })
    }

});



module.exports=router;