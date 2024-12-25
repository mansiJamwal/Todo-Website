import {useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import './pages.css'

function Landing(){

    const navigate=useNavigate();
    useEffect(()=>{
        const token=localStorage.getItem('token');
        if(token){
            navigate('/todo');
        }
    },[])

    return(
        <div className="landing-container">
            <div className='button-container'> 
                <a href="/signup" >
                    <button  >Sign Up to get started</button>
                </a>
                <a href="/signin">
                <button >Sign in to existing account</button>
                </a>
            </div>
        </div>
    )
}

export default Landing;