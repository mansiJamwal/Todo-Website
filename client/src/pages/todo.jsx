import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom";



function Todo(){
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [todos,setTodos]=useState([]);

    const navigate=useNavigate();

    useEffect(()=>{
        const token=localStorage.getItem('token');
        if(!token){
            navigate('/');
        }
    },[])

    async function addTodo(){
        try{
            const response=await fetch("http://localhost:3000/todo",{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({title,description})
            });
            const data=await response.json();
            console.log(data);
            setTitle('');
            setDescription('');
            setTodos([...todos,data.todo]);
            
        }catch(e){
            console.log(e);
        }

    }

    useEffect( ()=>{
        const fetchTodos= async ()=>{
            const responseTodos= await fetch("http://localhost:3000/todo",{
                method:'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const todoData= await responseTodos.json();
            setTodos(todoData.todos);
        }
        fetchTodos();
    },[]);

    function deleteaccount(){
        navigate('/deleteaccount');
    }

    function logout(){
        localStorage.removeItem('token');
        navigate('/');
    }

    return(
        <>
            <input type="text" value={title} placeholder="input" onChange={(e)=>{
                setTitle(e.target.value);
            }} />
            <input type="text" value={description} placeholder="description" onChange={(e)=>{
                setDescription(e.target.value);
            }} />
             <button onClick={deleteaccount}  >Delete Your account</button>
             <button onClick={logout}>Log out of account</button>
            <button onClick={addTodo} > Add Todo</button>
            {
                todos.map((todo)=>{
                    return <TodoItem  key={todo._id} todo={todo} todos={todos} setTodos={setTodos}></TodoItem>
                })
            }
           

        </>
    )
}

function TodoItem({todo,todos,setTodos}){

    async function deletetodo(){
        try{
            console.log(todos)
           
            const response=await fetch(`http://localhost:3000/todo/${todo._id}`,{
                method:'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            const data=await response.json();
            console.log(data);
            // setTodos(todos.filter((t) => {
            //    return t._id !== todo._id
            // }));
            setTodos(todos.filter(t => t._id !== todo._id));
           
        }catch(e){
            console.log(e);
    }
    }

    async function markasDone(){
        try{
            const response=await fetch(`http://localhost:3000/todo/${todo._id}`,{
                method:'PATCH',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ completed: !todo.completed })
                
            })
            const data=await response.json();
            console.log(data);
            setTodos(todos.map(t => 
                t._id === todo._id ? { ...t, completed: !t.completed } : t
            ));
        }catch(e){
            console.log(e);
        }
    }

    return(
        <>
            <h1>{todo.title}</h1>
            <h4>{todo.description}</h4>
            <button onClick={deletetodo}>Delete Todo</button>
            <input type="checkbox" checked={todo.completed} onChange={markasDone} />
        </>
    )
}



export default Todo;