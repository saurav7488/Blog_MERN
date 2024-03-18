import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Addblog = () => {
    const navigate = useNavigate()
    const [categorised, setCategorised] = useState([])
    const [file,setFile] = useState([])
    const [input, setInput] = useState({
        title: "",
        description: "",
        category: "",
    })
   
    useEffect(() => {
        const fetchAllCategory = async () => {
            const res = await axios.get("http://localhost:8000/api/avi/get/categorised",
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })

            setCategorised(res.data)
        }
        fetchAllCategory()
        }, [])
        const formdata=new FormData()
        formdata.append("title",input.title) 
        formdata.append("category",input.category) 
        formdata.append("description",input.description)  
        formdata.append("thumbnail",file) 

        const handleSubmit=async(e)=>{
            e.preventDefault() 
            try{
                 const res = await axios.post("http://localhost:8000/api/avi/add/blog",formdata,
                 {
                     headers:{
                         Authorization:`Bearer ${localStorage.getItem("token")}`
                     }
                 }
                 )

                 alert(res.data.message)
                 navigate("/")
            }
            catch(error) {
                 alert(error.response.data.message)
            }
       }
    return (
        <>
            <div className="container mt-4">
                <h2 className="mb-4">Add Blog</h2>
                <form onSubmit={handleSubmit} >
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" 
                        name="title" 
                        value={input.title} 
                        onChange={(e)=>{setInput({...input,[e.target.name]:e.target.value})}} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select className="form-control" name="category"
                        value={input.category} 
                        onChange={(e)=>{setInput({...input,[e.target.name]:e.target.value})}} >
                            <option disabled>Select Category</option>
                            {categorised && categorised.map((item)=>{
                                 return <option key={item._id} value={item._id} >{item.title}</option>
                            })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" rows="5" 
                        name="description"
                        value={input.description} 
                        onChange={(e)=>{setInput({...input,[e.target.name]:e.target.value})}} ></textarea>
                    </div>

                    <div className="mb-3" >
                        <label htmlFor="formGroupExampleInput" className="form-label" >
                            Thumbnail
                        </label>
                        <input className="form-control"
                            type="file" name="thumbnail" id="formGroupExampleInput"
                            placeholder="Select Thumbnail" 
                            onChange={(e)=>setFile(e.target.files[0])} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Addblog
