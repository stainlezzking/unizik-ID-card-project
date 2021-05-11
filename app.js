const express = require("express")
const app = express()
const upload = require("./modules/multer.js")
const multer = require("multer")
const bodyParser = require("body-parser")
const {bodyCheck} = require("./modules/RandomF")
const { addToDB } = require("./modules/mongooseConfig.js")

app.use("/static", express.static(__dirname+"/public/static"))
app.use("/uploads", express.static(__dirname+"/uploads"))
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended:false}))


app.get("/", function(req,res){
    res.render("index")
})

app.get("/create", function(req,res){
    res.render("FormDetails")
})
app.get("/ID", function(req,res){
    addToDB(2017244070).then(data=> res.render("idCard",{data}))
   
})


app.post("/create",(req,res)=>{
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
//    bodyCheck will responnd to the server
})
})



app.listen(5000, function(){
    console.log("server up and runnig on port 5000")
})

 