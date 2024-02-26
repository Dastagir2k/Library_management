import Axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

const Homepage = () => {
  // const [details,setDetails]=useState([]);
  const location = useLocation();

  const [message, setMessage] = useState(false);
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const name = new URLSearchParams(location.search).get("name");
  const BookMessage = (title) => {
    // setMessage(true); // Refresh details after booking
    // toast.success("Slot booked successfully", {
    //   position: "top-right",
    //   autoClose: 3000, // Close the toast after 3 seconds
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });
    Axios.post("https://library-management-1-2ls6.onrender.com/books-slot", {title})
      .then((res) => {
        console.log(res);
        console.log("name", name);
        setMessage(true);
        // Refresh details after booking
        toast.success("Slot booked successfully", {
          position: "top-right",
          autoClose: 3000, // Close the toast after 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // window.location.reload();
      })
      .catch((err) => {
        console.error("Error booking slot:", err);
      });
    console.log(message);
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await Axios.get("https://library-management-1-2ls6.onrender.com/books");
        setBooks(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBook();
  }, []);

  return (
    <div>
      {/* <img src="http://localhost:6060/images/cover-1708467977028.png" alt="10" width={100} height={100}/> */}
      <h1>Welcome {name} !</h1>
      <div className="search">
        <input
          className="search"
          type="text"
          placeholder="Search Book"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="books-grid">
        {books
          .filter((book) => {
            const searchTerm = search.toLowerCase();
            return (
              book.title.toLowerCase().includes(searchTerm) ||
              book.descr.toLowerCase().includes(searchTerm)
            );
          })
          .map((book) => (
            <div className="book" key={book.id}>
              {book.cover && (
                <img
                  src={`https://library-management-1-2ls6.onrender.com/images/${book.cover}`}
                  alt={book.title}
                  style={{ width: "100px", height: "100px" }} // Adjust the size as needed
                />
              )}
              <h2>Book Title :{book.title}</h2>
              <p> Description :{book.descr}</p>
              <span>Total Stock :{book.price}</span>
              {/* <button className="delete"onClick={() => BookMessage()}>{message}</button> */}
              <button
                onClick={() => BookMessage(book.title)}
                disabled={book.price === 0}
              >
                {book.price === 0 ? "Out of Stock" : "Book"}
                {message}
              </button>
            </div>
          ))}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Homepage;
