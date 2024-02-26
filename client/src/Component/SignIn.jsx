import { useState } from "react";
import "./Signin.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const SignIn = () => {
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    function handleSubmit(e){
        e.preventDefault();
        // console.log(name +" "+ password);
    }
    let navigate=useNavigate();
    function addDetailsToDb(){
        Axios.post('https://library-management-1-2ls6.onrender.com/create-login',{
            name:name,
            password:password,
        }).then(()=>{
            console.log(" success ");
        }).catch((err)=>{
            console.log("error",err);
        })
        navigate("/");
    }
    // const navigate=useNavigate();
    // const navigateToSignin = () => {
    //     // Use the navigate function to go to the "/createaccount" route
    //     navigate("/");

    //   };
  return (
    <div className="login">
        <div className="head">
            <h2>Create Account</h2>
        </div>
        <div className="formm">
            <div>
            <form onSubmit={handleSubmit}>
                <label>Name </label>
                <input type="text"  onChange={(e)=>setName(e.target.value)}/>
                <label>password </label>
                <input type="password" onChange={(e)=>setPassword(e.target.value)}/>
                <button className="formButton" onClick={addDetailsToDb}>Submit</button>
            </form>
            </div>
        </div>
    </div>
  )
}

export default SignIn