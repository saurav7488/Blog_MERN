const authUser = require('../models/auth_model')
const categoryModel = require('../models/categoried_model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const blogModel = require('../models/blog_model')

const userRegistration = async (req,res) =>{
     const {name,email,password} = req.body
     try {
         if(name && email && password) {
             const isUser = await authUser.findOne({email}) 
             if(!isUser) {
                //  hash password
                 const genSalt = await bcrypt.genSalt(10) 
                 const hashedPassword = await bcrypt.hash(password,genSalt) 

                //  user saved
                const newUser = new authUser({
                     name,
                     email,
                     password:hashedPassword
                })

                const savedUser = await newUser.save()

                if(savedUser) {
                    return res.status(200).json({message:'user register successfuly'})
                }
                else {
                    return res.status(404).json({message:'user not register successfuly'})
                }

             }
             else {
                return res.status(404).json({message:'user already exist'})
             }
         }
         else {
            return res.status(404).json({message:'All fields are required'})
         }
     }
     catch(error) {
          return res.status(404).json({message:error.message})
     }
}

const userLogin = async (req,res) =>{
      const {email,password} = req.body 
      try{
         if(email && password) {
              const isEmail = await authUser.findOne({email}) 
              if(isEmail) {
                  if(isEmail.email === email && (await bcrypt.compare(password,isEmail.password))) {
                       // token generate 
                       const token = jwt.sign({userID:isEmail._id},"ksjdiweavbhfgalkdjl",
                       {expiresIn:"2d"})

                       return res.status(200).json({message:"Login successfuly",
                    token,name:isEmail.name})

                  }
                  else {
                    return res.status(404).json({message:'password is not correct'})
                  }
              }
              else {
                return res.status(404).json({message:'Email is not found in database'})
              }
         }
         else {
            return res.status(404).json({message:'All fields are required'})
         }
      }
      catch(error) {
          return res.status(404).json({message:error.message,msg:"something wrong"})
      }
}


const getAllBLogs = async(req,res) =>{
     try{
         const fetchAllBolgs = await blogModel.find({user:req.user._id})
         return res.status(200).json(fetchAllBolgs)
     }
     catch(error) {
         return res.status(404).json({"message":error.message})
     }
}

const addNewBlogs = async(req,res)=>{
    const {title,category,description} = req.body
    try{
        if(title && category && description) {
             const addblog = new blogModel({
                   title:title,
                   description:description,
                   category:category,
                   thumbnail:req.file.filename,
                   user:req.user._id,
             })

             const savedBlog = await addblog.save()
             if(savedBlog) {
                return res.status(200).json({"message":"Blog add successfuly"})
             }
             else {
                return res.status(200).json({"message":"Blog not add successfuly"})
             }
        }
        else {
            return res.status(404).json({"message":"All fields required"})
        }
    }
    catch(error) {
        return res.status(404).json({"message":error.message})
    }
}

const getSingleBlogs = async(req,res)=>{
    const {id} = req.params
    try{
        if(id) {
             const fetchBlogIds = await blogModel.findById(id)
             return res.status(200).json(fetchBlogIds)
        }
        else {
            return res.status(404).json({"message":"Invalid url"})
        }
    }
    catch(error) {
        return res.status(404).json({"message":error.message})
    }
}




const getAllcategories = async(req,res)=>{
    try{
        const fetchAllcategorised = await categoryModel.find({}) 
        return res.status(200).json(fetchAllcategorised)
    }
    catch(error) {
        return res.status(404).json({message:message.error})
    }
}

const addNewCategorised = async(req,res)=>{
    
    const {title} = req.body
    try{
        if(title) {
             const newcategory = new categoryModel({
                  title,
             })
             const addcategory = await newcategory.save()
             if(addcategory) {
                return res.status(404).json({message:"category add successfuly"})
             }
             else {
                return res.status(404).json({message:"title not add"})
             }
        }
        else {
            return res.status(404).json({message:"title will required"})
        }
    }
    catch(error) {
        return res.status(404).send(error)
    }
}

exports.getAllcategories = getAllcategories
exports.addNewCategorised = addNewCategorised
exports.userRegistration = userRegistration
exports.userLogin = userLogin
exports.getAllBLogs = getAllBLogs
exports.getSingleBlogs = getSingleBlogs
exports.addNewBlogs = addNewBlogs