require("dotenv").config();
const express=require("express");
const app=express();
const userRouter=require('./routes/userrouter');
const todoRouter=require('./routes/todorouter');
const bodyParser = require("body-parser");
const cors=require('cors');
app.use(cors());
app.use(bodyParser.json());


app.use('/',userRouter);
app.use('/todo',todoRouter);
app.listen(3000,()=>{
    console.log("listening on port 3000");
})