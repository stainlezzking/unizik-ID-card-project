const { Module } = require("module")

const multer = require("multer")



// config multer#



const multerFilter = (req, file, cb) => {
  var obj = JSON.parse(JSON.stringify(req.body))
  if (!file.mimetype.startsWith("image")) {
     return cb("Please upload only images.", false);
  }
  console.log("this place still aint runnning")
  cb(null, true)
}


const diskstorage = multer.diskStorage({
    destination: function(req,res, next){
        next(null, "./uploads/")
    },
    filename: function(req,file,next){
        next(null,  Math.ceil(Math.random()*100000).toString(32) +file.originalname)
    }
})
const upload = multer({
    storage:diskstorage,
    fileFilter: multerFilter,
    limits: { fileSize: 1*1024*1024 }
}).single("avatar")


module.exports =  upload