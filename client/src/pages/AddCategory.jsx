import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const AddCategory = () => {
  const navigate = useNavigate()
   const [input,setInput] = useState({
       title:""
   })
   const handleSubmit=async(e)=>{
       e.preventDefault() 
       try{
           const res = await axios.post("http://localhost:8000/api/avi/add/categorised",input,
           {
               headers:{
                   Authorization:`Bearer ${localStorage.getItem("token")}`
               }
           }) 
           alert(res.data.message) 
           navigate("/home")
       }
       catch(error) {
            alert(error.response.data.message)
       }
   }
  return (
    <>
       <div className="container mt-4">
            <h2 className="mb-4">Add Category</h2>
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title"
                     name="title"
                     value={input.title} 
                     onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})}  />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>   
    </>
  )
}

export default AddCategory
