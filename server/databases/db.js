require("dotenv").config();
const mongoose= require("mongoose");
mongoose.connect(process.env.MONGO_URI);
  

const UserSchema=new mongoose.Schema({
    username: { type: String, unique: true },
    password: String
}
)

const TodoSchema=new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}
);


const Todo=mongoose.model('Todo',TodoSchema);
const User=mongoose.model('User',UserSchema);


module.exports={
    Todo, 
    User
}


