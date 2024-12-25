import { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";

function DeleteAccount(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();   

    async function deleteUser(){
        try{
        const response=await fetch("http://localhost:3000/deleteaccount",{
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({username,password})
        })
        if(response.ok){
            localStorage.removeItem('token');
            navigate('/');
        }else{
            console.log("user not present");
        }
        }catch(e){
            console.log(e);
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
            <button onClick={deleteUser} >Delete Account</button>
        </>
    )
}
export default DeleteAccount;