const express = require("express")
const app = express()
const upload = require("./modules/multer.js")
const multer = require("multer")
const bodyParser = require("body-parser")
const {bodyCheck} = require("./modules/RandomF")

app.use("/static", express.static(__dirname+"/public/static"))
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended:false}))


app.get("/", function(req,res){
    res.render("index")
})

app.get("/create", function(req,res){
    res.render("FormDetails")
})

app.get("/test", function(req,res){
    Fields= {
        error : "generic error",
        name : "chukwuebuka azuka",
        department: "mathematics",
        regNumber : 2017244070
    }
    res.render("text", {Fields})
})

app.post("/create",(req,res)=>{
  console.log(req.body)

})
app.post("/unknown", (req,res)=>{
       upload(req,res, function(err){
        //  here multer error is gon be called on the file size
        if (err instanceof multer.MulterError) {
            Fields= {error : err.message,...req.body}
            return res.render("FormDetails",{Fields})
        }
        else if (err) {
            Fields= {error : err,...req.body}
            return res.render("FormDetails",{Fields})
            }
        else if(!req.file){
            Fields ={error:"an image is required",...req.body}
            return res.render("FormDetails", {Fields})
        }
        bodyCheck(req,res)
   
})

})


app.listen(5000, function(){
    console.log("server up and runnig on port 5000")
})

    // upload(req,res, function(err){
    //     //  here multer error is gon be called on the file size
    //     if (err instanceof multer.MulterError) {
    //          error= {error: "Make sure your image size is 1mb or less"}
    //          Fields= {error,...req.body}
    //         return res.render("FormDetails", Fields)
    //     }
    //     else if (err) {
    //        Fields= {error : err.message,...req.body}
    //         return res.render("FormDetails", Fields)
    //     }
    //     else if (!req.file) {
    //         error ={error:"an image is required"}
    //         Fields= {error,...req.body}
    //         return res.render("FormDetails", Fields)
    //     }
    //     res.send("you have uploaded your file successfully")
    // })