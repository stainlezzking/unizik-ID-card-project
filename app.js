const express = require("express")
const app = express()


app.use("/static", express.static(__dirname+"/public/static"))

app.get("/", function(req,res){
    res.sendFile(__dirname+ "/public/index.html")
})

app.get("/create", function(req,res){
    res.sendFile(__dirname+"/public/FormDetails.html")
})

app.listen(5000, function(){
    console.log("server up and runnig on port 5000")
})