
import {Route,Routes} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Header from "./component/Header"
import Addblog from "./pages/Addblog"
import AddCategory from "./pages/AddCategory"
import Singleblog from "./pages/Singleblog"
import Protected from "./services/Protected"
const App = () => {
  return (
    <div>
         <Header/>
         <Routes>
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              {/* protected route */}
              <Route path="/" element={<Protected/>}>
              <Route path="/" element={<Home/>} />
              <Route path="/add-blog" element={<Addblog/>} />
              <Route path="/add-category" element={<AddCategory/>} />
              <Route path="/blog/:id" element={<Singleblog/>} />
              </Route>

         </Routes>
    </div>
  )
}

export default App
