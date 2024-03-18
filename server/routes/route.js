const express = require('express') 
const router = express.Router() 
const getController = require('../controller/authController')
const multer = require('multer')
const checkUserAuthenticated = require('../middleware/authmiddleware')


const storage = multer.diskStorage({
     destination:function(req,file,cb) {
         cb(null,'public/upload/')
     },
     filename:function(req,file,cb) {
         cb(null,`${Date.now()}-${file.originalname}`)
     }
})

const upload = multer({storage:storage})


router.post('/user/register',getController.userRegistration)
router.post('/user/login',getController.userLogin)

// protected routes


router.get('/get/allblogs',checkUserAuthenticated,getController.getAllBLogs)
router.post('/add/blog',checkUserAuthenticated,upload.single("thumbnail"),getController.addNewBlogs) 
router.get('/get/blog/:id',checkUserAuthenticated,getController.getSingleBlogs)

router.get('/get/categorised',checkUserAuthenticated,getController.getAllcategories) 
router.post('/add/categorised',checkUserAuthenticated,getController.addNewCategorised)



module.exports = router