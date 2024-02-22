import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import "./Book.css";

const Book = () => {
    const[books,setBooks]=useState([]);
    const navigate=useNavigate()
    const goToAdd=()=>{
        navigate("/add")
    }
    const navToOrder=()=>{
        navigate("/details");
    }
    useEffect(()=>{
        const fetchBook=async()=>{
            try {
                const response=await axios.get("http://localhost:6060/books")
                setBooks(response.data)
                console.log(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchBook();
    },[])
    const handledelete= async(id)=>{
        try{
            await axios.delete("http://localhost:6060/books/"+id);
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    }
  return (
    <div>
        {/* <img src="http://localhost:6060/images/cover-1708467977028.png" alt="10" width={100} height={100}/> */}
        <h1>Dastagir Library Managemnt</h1>
        <button className="detail-btn" onClick={navToOrder}>Order History</button>
        <div className="books-grid">
            {books.map(book=>(
                <div className="book" key={book.id}>
                    {/* {book.cover && <img src={book.cover} alt=""/>} */}
                    {/* {book.cover && <img src={`http://localhost:6060/images/${book.cover}`} alt="" />} */}
                    {book.cover && (
                            <img
                            src={`http://localhost:6060/images/${book.cover}`}
                                alt={book.title}
                                style={{ width: "100px", height: "100px" }} // Adjust the size as needed
                            />
                        )}
                        {/* console.log(book.cover); */}
                    <h2>Book Title :{book.title}</h2>
                    <p>{book.decr}</p>
                    <span>{book.price}</span>
                    <button className="delete" onClick={()=>handledelete(book.id)}>Delete</button>
                    <button className="update"><Link to={`/update/${book}`}>Update</Link></button>
                </div>
            ))}

        </div>
        <button className="formButton" onClick={goToAdd}>
           Add New Book
        </button>
    </div>
  )
}

export default Book;