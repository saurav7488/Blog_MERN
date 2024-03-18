const express = require('express') 
const app = express()
const router = require('./routes/route')
const dbConnect = require('./config/db')
const cors = require('cors')
const PORT = 8000

app.use(cors())
app.use(express.json())

app.use(express.static("public/upload"))
app.use('/api/avi',router)

dbConnect().then(()=>app.listen(PORT,()=>{
    console.log(`server connect successfuly ${PORT}`)
}))





