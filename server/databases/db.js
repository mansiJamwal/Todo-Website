const mongoose= require("mongoose");
mongoose.connect("mongodb+srv://jamwalmansi16:mansijamwal@cluster0.2lyylrg.mongodb.net/todoapp")
  

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


