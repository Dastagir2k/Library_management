const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const  path = require('path');
const multer=require( 'multer' );
const fs=require( "fs" ) ;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
const destinationDirectory = path.join(__dirname, 'public/images');

// Create the destination directory if it doesn't exist
if (!fs.existsSync(destinationDirectory)) {
  fs.mkdirSync(destinationDirectory, { recursive: true });
}

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images")
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname + "-" + Date.now()+path.extname(file.originalname));
    }
})
const db = mysql.createConnection({
  user: "uvus2ces5057b5od",
  host: "bhahnmvnnoykstku4uel-mysql.services.clever-cloud.com",
  password: "Lv94X6NXpmIshR3QTNjO",
  database: "bhahnmvnnoykstku4uel",
});


const upload=multer({
  storage:storage
})
app.get("/books", (req, res) => {
  const query = "select * from books_store";
  db.query(query, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});
app.get("/details", (req, res) => {
  const query = "select * from book_order";
  db.query(query, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/add-book", upload.single("cover"), (req, res) => {
    const title=req.body.title;
    const descr=req.body.desc;
    const price=req.body.price;
    const coverImage = req.file;
    if (!coverImage) {
      return res.status(400).json({ error: "No cover image provided" });
  }
  const coverImagePath = path.basename(coverImage.path);
  const query =
    "insert into books_store (title,descr,cover,price) values(?,?,?,?)";
  
  db.query(query, [title,descr,coverImagePath,price], (err, data) => {
    if (err) return res.json(err);
    else{
        console.log("Sucecss while inserting");
        return res.json("Books has been created successfully");
    }
  });
});

app.delete("/books/:id",(req,res)=>{
    const booksId=req.params.id;
    const query="DELETE FROM books_store WHERE id=?";
    db.query(query,[booksId],(err,data)=> {
        if (err) return res.json(err);
    else{
        console.log("Books has been delete successfully");
        return res.json("Books has been delete successfully");
    }
    })
})



app.post("/books-slot", (req, res) => {
  const title = req.body.title;

  db.query(
    "UPDATE books_store SET price = price - 1 WHERE title = ? AND price > 0",
    [title],
    (err, result) => {
      if (err) {
        console.log("Error updating slots:", err);
        res.status(500).send("Internal Server Error");
      } else {
        res.status(200).send("Slot booked successfully");
      }
    }
  );
});
app.post("/book-order", (req, res) => {
  const title = req.body.title;
  const name=req.body.name
  db.query(
    "insert into book_order(name,title) values(?,?)",
    [name,title],
    (err, result) => {
      if (err) {
        console.log("Error updating slots:", err);
        res.status(500).send("Internal Server Error");
      } else {
        res.status(200).send("Slot booked successfully");
      }
    }
  );
});

// app.put("/books/:id",(req,res)=>{
//     const booksId=req.params.id;
//     const title=req.body.title;
//     const descr=req.body.desc;
//     const price=req.body.price;
//     const coverImage = req.file; 
//     const coverImagePath = path.basename(coverImage.path);
//     const query="update books_store set `title`= ? , `descr`= ? , `price`=?,`cover`=? where id=?" ;
//     db.query(query,[title,descr,price,coverImagePath,booksId],(err,data)=> {
//         if (err) return res.json(err);
//     else{
//         console.log("Books has been Updated successfully");
//         return res.json("Books has been Updated successfully");
//     }
//     })
// })


app.put("/books/:id", upload.single("cover"), (req, res) => {
  const bookId = req.params.id;
  const { title, desc, price } = req.body;
  const coverImage = req.file;

  let coverImagePath = ""; // Variable to hold the updated cover image path

  if (coverImage) {
    coverImagePath = path.basename(coverImage.path); // Get filename of uploaded cover image
  }

  // Update book in the database
  const query = "UPDATE books_store SET title=?, descr=?, price=?, cover=? WHERE id=?";
  db.query(query, [title, desc, price, coverImagePath, bookId], (err, result) => {
    if (err) {
      console.error("Error updating book:", err);
      res.status(500).json({ error: "Failed to update book" });
    } else {
      console.log("Book updated successfully");
      res.json({ message: "Book updated successfully" });
    }
  });
});


app.post('/create-login',(req,res)=>{
    const name=req.body.name;
    const password=req.body.password;
    db.query('INSERT INTO book_user (name,password) values (?,?)',
    [name,password],(err,result)=>{
        if(err){
            console.log("Error while inserting into db");
        }else{
            res.status(200).send("Data inserted successfully",result);
        }
    })
})



//inserting data from admin page to database



//LOGIN
app.post('/login',(req,res)=>{
    //GET TING THE DATA FROM FORM 
    const name=req.body.name;
    const password=req.body.password;
    db.query("SELECT * FROM book_user where name=? and password=?",[name,password],(err,result)=>{
        const adminUsername = 'admin';
        const adminPassword = '12345678';
        if(err){
            console.log("Error while querying the database");
            res.status(500).send("Internal Server Error");
        }else{
            if(name===adminUsername &&  password===adminPassword){
                
                    res.status(200).json({ role: 'admin' });
                
            }
            if(result.length>0){
                // User authenticated successfully
                res.status(200).json({ role: 'user' });
            }else{
                    // Invalid credentials
                    res.status(401).send("Invalid username or password");
            }
        }
    })
    
})

app.listen(6060, () => {
  console.log("server is running");
});
