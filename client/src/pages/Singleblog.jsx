import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const Singleblog = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [blog,setBlog] = useState({})
    useEffect(()=>{
         const fetchSingleBlog=async()=>{
                const res = await axios.get(`http://localhost:8000/api/avi/get/blog/${id}`,
                {
                  headers:{
                      Authorization:`Bearer ${localStorage.getItem("token")}`
                  }
              })     
                setBlog(res.data)       
         }
         fetchSingleBlog()
    },[id])
  return (
    <>
       <div className="container shadow ny-3" >
          <div className="col-md-12 d-flex items-center justify-content-center bg-light" >
              <div className="row" >
                <h1 className="ny-3" >{blog.title}</h1>
                <p className="my-3" >{blog.description}</p>
                <img src={`http://localhost:8000/${blog.thumbnail}`}
                  className="img img-responsive img-rounded my-3"
                 alt="" />
              </div>
          </div>
          <button onClick={()=>navigate("/")} className="btn btn-primary" >Back to post</button>
       </div>  
    </>
  )
}

export default Singleblog
