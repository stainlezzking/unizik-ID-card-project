const express = require("express")
const app = express()
const upload = require("./modules/multer.js")
const multer = require("multer")
const bodyParser = require("body-parser")
const {bodyCheck} = require("./modules/RandomF")
const { addToDB, collection } = require("./modules/mongooseConfig.js")

app.use("/static", express.static(__dirname+"/public/static"))
app.use("/uploads", express.static(__dirname+"/uploads"))
app.set("view engine", "ejs")
app.use(express.json())


app.get("/", function(req,res){
    res.render("index")
})

app.get("/create", function(req,res){
    res.render("FormDetails")
})
app.get("/test", function(req,res){
    collection.findOne({regNumber: 2017244070}).then(user=>{
        console.log(user)
        res.render("details",{user})
    })
})
app.get("/findStudent", function(req,res){
    res.render("FindStudent")
})
app.post("/findStudent", function(req,res){
    collection.findOne({regNumber: req.body.regNumber}, function(err,user){
        if(err){
           return res.json({err: err.message})
        }
        if(!user){
            return res.json({err: "no student found make sure the qrCode is positioned properly"})
        }
        if(user){
            return res.render("details", {user}, function(err,str){
                if(err){
                    console.log(err)
                }else{
                    console.log(str)
                    res.json({success:str})
                }
            })
        }
    })
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

const PORT = process.env.PORT || 5000

app.listen(PORT, function(){
    console.log(`server up and runnig on port ${PORT}`)
})

 