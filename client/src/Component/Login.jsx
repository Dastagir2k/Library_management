import { useState } from "react";
import "./Login.css";
import {  useNavigate } from "react-router-dom";
import  Axios  from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    function handleSubmit(e){
        e.preventDefault();
        console.log(name +" "+ password);
    }
    const LoginToDb = () => {
        // Use the navigate function to go to the "/createaccount" route
        Axios.post('http://localhost:6060/login',{
            name:name,
            password:password,
        }).then((result)=>{
            console.log(" success ",result);
            const role=result.data.role;
            if(role==='admin'){
                navigate('/book');
            }else if(role==='user'){
                navigate(`/home?name=${name}`);
            }else{
                alert("ïnvalid");
            }
        }).catch((err)=>{
            console.log("error",err);
        })

      };
    const NavigateToCreate=()=>{
        navigate('/signin');
    }
  return (
    <div className="login">
        <div className="head">
            <h2>Login</h2>
        </div>
        <div className="formm">
            <div>
            <form onSubmit={handleSubmit}>
                <label>Name </label>
                <input type="text"  onChange={(e)=>setName(e.target.value)}/>
                <label>password </label>
                <input type="password" onChange={(e)=>setPassword(e.target.value)}/>
                <button  onClick={LoginToDb}>Enter</button>
        <div>
            <button className="formButton"  onClick={NavigateToCreate}>Create Account</button>
        </div>
            </form>
            </div>
        </div>
    
    </div>
  )
}

export default Login