const mongoose = require('mongoose') 

// Jnw7pmCSX6bd2skJ

const MONGO_URL = 'mongodb+srv://jitenderkumarmukul:Jnw7pmCSX6bd2skJ@cluster0.qdwjjud.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const dbConnect = async () =>{
     try{
         await mongoose.connect(MONGO_URL) 
         console.log('Database connect successfuly')
     }
     catch(error) {
          console.error(error)
     }
}

module.exports = dbConnect