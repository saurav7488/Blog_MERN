const jwt = require('jsonwebtoken') 
const authModel = require('../models/auth_model') 

const checkUserAuthenticated = async (req,res,next) => {
     let token;
    const {authorization} = req.headers 
    if(authorization && authorization.startsWith("Bearer")) {
         try {
             token = authorization.split(" ")[1]
             const {userID} = jwt.verify(token , "ksjdiweavbhfgalkdjl") 
             req.user = await authModel.findById(userID).select("--password")
             next()
         }
         catch(error) {
             return res.status(404).json({message:"Unthorised user"})
         }
    }
    else {
        return res.status(404).json({messasge:"Unthorised user"})
    }
}

module.exports = checkUserAuthenticated