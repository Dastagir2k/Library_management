import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const[title,setTitle]=useState("")
  const[desc,setDescr]=useState("")
  const[price,setPrice]=useState(null)
  const[cover,setCover]=useState("")
  const naviagte=useNavigate()
  const location=useLocation();
  const bookid=location.pathname.split("/")[2]
  console.log(location.pathname.split("/")[2])
  const handleChange=(e)=>{
    setCover(e.target.files[0]);
  }
  const handleClick= async(e)=>{
    e.preventDefault();
    try{
        await axios.post("http://localhost:6060/add-book",{
            _id:bookid,
            title : title ,
            desc : desc ,
            price:price,
            cover:cover
        });
        naviagte("/")
    }catch(err){
        console.log(err);
    }
  }
  return (
    <div className="formm">
      <h1>Update New Book</h1>
      <input
        type="text"
        placeholder="title"
        onChange={(e)=> setTitle(e.target.value)}
        name="title"
      />
      <input
        type="text"
        placeholder="decr"
        onChange={(e)=> setDescr(e.target.value)}
        name="decr"
      />
      <input
        type="number"
        placeholder="price"
        onChange={(e)=> setPrice(e.target.value)}
        name="price"
      />
      <input
        type="file"
        placeholder="cover"
        onChange={handleChange}
        name="cover"
      />
      <button className="formButton" onClick={handleClick}>Update</button>
    </div>
  );
};

export default Update;
