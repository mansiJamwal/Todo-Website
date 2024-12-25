
const express=require("express");
const router=express.Router();
const {User,Todo}=require("../databases/db.js");
const userMiddleware=require("../middlewares/userMiddleware.js");
const jwt=require("jsonwebtoken");


//add todo
router.post('/',userMiddleware,async(req,res)=>{
    try{
        const title=req.body.title;
        const description=req.body.description;
        const fulltoken=req.headers.authorization
        if (!fulltoken || !fulltoken.startsWith('Bearer ')) {
            return res.status(401).json({ msg: "No or invalid token provided" });
        }
        const token=fulltoken.split(" ")[1];
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findOne({ username: decoded.username });
        const user_id=user._id;
        console.log(user_id);
        const newTodo=await Todo.create({
            title:title,
            description:description,
            completed:false,
            user:user_id
        })
        res.status(201).json({
            todo: newTodo
        })
    }catch(e){
        res.status(411).json({
            msg:"Invalid inputs"
        })
    }
})

//delete a todo
router.delete('/:todo_id',userMiddleware,async(req,res)=>{
    try{
        const { todo_id } = req.params;
        const deletedTodo = await Todo.findByIdAndDelete(todo_id); 
        if (!deletedTodo) {
            res.status(404).json({ msg: "Todo not found" }); 
        }
        res.status(200).json({ msg: "Todo deleted successfully" });
    }catch(e){
        res.status(411).json({
            msg:"Invalid inputs"
        })
    }
})

router.get('/',userMiddleware,async(req,res)=>{
    try{
        const fulltoken=req.headers.authorization
        
        if (!fulltoken || !fulltoken.startsWith('Bearer ')) {
            return res.status(401).json({ msg: "No or invalid token provided" });
        }
        const token=fulltoken.split(" ")[1];
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findOne({ username: decoded.username }); // Find the user by username
        const todos = await Todo.find({ user: user._id });
        res.json({
            todos:todos
        })
    }catch(e){
        res.status(411).json({
            msg:"something went wrong"
        })
    }
})

router.patch('/:todo_id',userMiddleware,async(req,res)=>{
    try{
        const {todo_id}=req.params;
        const { completed } = req.body;
        const response= await Todo.findByIdAndUpdate(todo_id,{'completed':completed}, { new: true });
        if(response){
            return res.status(200).json({
                msg:"updated successfully todo"
            })
        }
    }catch(e){
        console.log(e);
    }
})


module.exports=router;