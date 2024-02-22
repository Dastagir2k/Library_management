import { BrowserRouter, Routes , Route} from "react-router-dom"
import Book from "./pages/Book"
import Add from "./pages/Add"
import Update from "./pages/Update"
import "./index.css"
import Login from "./Component/Login"
import Signin from "./Component/SignIn"
import Homepage from "./Component/Homepage"
import DisplayDetails from "./pages/DisplayDetails"
const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route path="/home" element={<Homepage/>}></Route>
        <Route path="/book" element={<Book/>}></Route>
        <Route path="/update/:id" element={<Update/>}></Route>
        <Route path="/add" element={<Add/>}></Route>
        <Route path="/details" element={<DisplayDetails/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App