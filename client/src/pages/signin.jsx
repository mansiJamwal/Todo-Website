import {useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();

    useEffect(()=>{
        const token=localStorage.getItem('token');
        if(token){
            navigate('/todo');
        }
    },[])


    async function verifyUser(){
        try{
            const response=await fetch("http://localhost:3000/signin",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            })
            const data=await response.json();
            console.log(data);
            localStorage.setItem('token',data.token);
            setUsername("");
            setPassword(""); 
            navigate("/todo");
        }catch(e){
            console.log("error has occured");
        }
    }

    return(
        <>
            <input type="text" placeholder="Username" onChange={(e)=>{
                setUsername(e.target.value);
            }} />
            <input type="text" placeholder="Password" onChange={(e)=>{
                setPassword(e.target.value);
            }} />
            <button onClick={verifyUser} >Sign in to the account</button>
        </>
    )
}
export default SignIn;