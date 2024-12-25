import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function SignUp(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();   

    useEffect(()=>{
        const token=localStorage.getItem('token');
        if(token){
            navigate('/todo');
        }
    },[])

    async function addUser(){
        try{
            const response=await fetch("http://localhost:3000/signup",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            })
            const data=await response.json();
            if(response.ok){
                console.log(data);
                localStorage.setItem('token',data.token);
                setUsername("");
                setPassword("");
                navigate("/todo");
            }else{
                console.log("username taken");
            }
        }catch(e){
            console.log("error has occured");
        }
    }

    return(
        <>
            <input type="text" value={username} placeholder="Username" onChange={(e)=>{
                setUsername(e.target.value);
            }}/>
            <input type="text" value={password} placeholder="Password" onChange={(e)=>{
                setPassword(e.target.value);
            }}/>
            <button onClick={addUser} >Create account</button>
        </>
    )
}
export default SignUp;