import axios from 'axios'
import {  useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Register = () => {
    const navigate = useNavigate()
    const [input,setInput] = useState({
         name:"",
         email:"",
         password:""
    })
    const handleSubmit=async (e)=> {
         e.preventDefault() 
         try{
             const res = await axios.post("http://localhost:8000/api/avi/user/register",input)
             alert(res.data.message)
             navigate('/login')
         }
         catch(error) {
             alert(error.response.data.message)
         }
    }
    
  return (
    <>
        <div className="container shadow" >
            <h2 className="text-center my-3" >Sign Up Here</h2>
            <div className="col-md-12 my-33 d-flex items-center justify-content-center" >
                <div className="row" >
                    <form onSubmit={handleSubmit} >
                         <div className="mb-3" >
                             <label htmlFor="formGroupExampleInput" className="form-label" >
                                Name
                             </label>
                             <input type="text"
                             name="name"
                             value={input.name}
                             onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})}
                             className="form-control"
                             id="formGroupExampleInput"
                             placeholder="Enater Name" />
                         </div>
                         <div className="mb-3" >
                             <label htmlFor="formGroupExampleInput" className="form-label" >
                                Email
                             </label>
                             <input type="text"
                             name="email"
                             value={input.email}
                             onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})}
                             className="form-control"
                             id="formGroupExampleInput"
                             placeholder="Enater Email" />
                         </div>

                         <div className="mb-3" >
                             <label htmlFor="formGroupExampleInput" className="form-label" >
                                Password
                             </label>
                             <input type="text"
                             name="password"
                             value={input.password}
                             onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})}
                             className="form-control"
                             id="formGroupExampleInput"
                             placeholder="Enater Password" />
                         </div>
                         <div className="mb-3" >
                            <button type="submit" className="btn btn-primary btn-block" >
                                Sign Up
                            </button>
                         </div>
                    </form>
                </div>
            </div>
        </div>   
    </>
  )
}

export default Register
