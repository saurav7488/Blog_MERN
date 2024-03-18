import {Navigate,Outlet} from "react-router-dom"
const Protected=()=>{
       const auth = localStorage.getItem("token")
       return auth && auth !== null ? <Outlet/> : <Navigate to="/login" />
}   
export default Protected