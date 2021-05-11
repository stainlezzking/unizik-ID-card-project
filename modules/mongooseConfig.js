const mongoose = require("mongoose")
const fs = require("fs")
let collection ;
function dbSetUp(){
mongoose.connect("mongodb://localhost:27017/unizikID",{useNewUrlParser:true, useUnifiedTopology:true})


    const studentSchema = new mongoose.Schema({
        name: String,
        regNumber : Number,
        department: String,
        gradYear : String,
        phone: Number,
        path: String
    })
    
    collection = mongoose.model("student",studentSchema)
}

dbSetUp()

 function  addToDB(student){
   return collection.findOne({regNumber : student.regNumber}, function(err, data){
        if(err) console.log(err)
        if(data){
            fs.unlinkSync(student.path)
            console.log("user already exist :" + data)
            return data
        }else{
        
            return new collection(student).save()
            .then(data=>{ 
                console.log("new user created:" + data)
                return data
            })
        }
    })
    
}
module.exports = {
    collection,
    addToDB
}



