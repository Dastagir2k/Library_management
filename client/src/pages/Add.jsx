// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Add = () => {
//   const[title,setTitle]=useState("")
//   const[desc,setDescr]=useState("")
//   const[price,setPrice]=useState(null)
//   const[cover,setCover]=useState("")
//   const naviagte=useNavigate()
  
//   const handleClick= async(e)=>{
//     e.preventDefault();
//     try{
//         await axios.post("http://localhost:6060/add-book",{
//             title : title ,
//             desc : desc ,
//             price:price,
//             cover:cover
//         });
//         naviagte("/")
//     }catch(err){
//         console.log(err);
//     }
//   }
//   return (
//     <div className="form">
//       <h1>Add Book</h1>
//       <input
//         type="text"
//         placeholder="title"
//         onChange={(e)=> setTitle(e.target.value)}
//         name="title"
//       />
//       <input
//         type="text"
//         placeholder="decr"
//         onChange={(e)=> setDescr(e.target.value)}
//         name="decr"
//       />
//       <input
//         type="number"
//         placeholder="price"
//         onChange={(e)=> setPrice(e.target.value)}
//         name="price"
//       />
//       <input
//         type="text"
//         placeholder="cover"
//         onChange={(e)=> setCover(e.target.value)}
//         name="cover"
//       />
//       <button className="formButton" onClick={handleClick}>Add</button>
//     </div>
//   );
// };

// export default Add;


import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [title, setTitle] = useState("");
  const [desc, setDescr] = useState("");
  const [price, setPrice] = useState(null);
  const [cover, setCover] = useState(null); // Change to null since it will hold file data
  const navigate = useNavigate();
  
  const handleFileChange = (e) => {
    // Capture the selected file
    setCover(e.target.files[0]);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(); // Create a FormData object to store form data
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("price", price);
      formData.append("cover", cover); // Append the file to the FormData object
      
      await axios.post("https://library-management-1-2ls6.onrender.com/add-book", formData, {
        headers: {
          "Content-Type": "multipart/form-data" // Set content type to multipart/form-data
        }
      });
      navigate("/book");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="formm">
      <h1>Add Book</h1>
      <input
        type="text"
        placeholder="title"
        onChange={(e) => setTitle(e.target.value)}
        name="title"
      />
      <input
        type="text"
        placeholder="decr"
        onChange={(e) => setDescr(e.target.value)}
        name="decr"
      />
      <input
        type="Total Quality"
        placeholder="price"
        onChange={(e) => setPrice(e.target.value)}
        name="price"
      />
      <input
        type="file" // Use type file for file input
        onChange={handleFileChange} // Call handleFileChange when file is selected
        name="cover"
      />
      <button className="formButton" onClick={handleClick}>Add</button>
    </div>
  );
};

export default Add;
