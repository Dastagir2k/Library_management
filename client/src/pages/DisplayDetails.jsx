import axios from "axios";
import { useEffect, useState } from "react";

const DisplayDetails = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get("http://localhost:6060/details");
        setBooks(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBook();
  }, []);
  return (
    //     <table className="table">
    //     <thead>
    //         <tr>
    //             <th>User Name : </th>
    //             <th>Book Name</th>

    //         </tr>
    //     </thead>
    //     <tbody>
    //         {books.map((val, index) => (
    //             <tr key={index} className="employee">
    //                 <td>{val.name}</td>
    //                 <td>{val.title}</td>
    //             </tr>
    //         ))}
    // =
    //     </tbody>
    // </table>
    <div className="container">
        <h1>Order History</h1>
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Book Ordered</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.name}</td>
              <td>{book.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default DisplayDetails;
