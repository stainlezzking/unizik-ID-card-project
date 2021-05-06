const mongoose = require("mongoose")

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

function addToDB(student){
    collection.findOne({regNumber : student.reg}, function(err, data){
        if(err) console.log(err)
        if(data){
            return regNumber
        }else{
            new collection(student).save()
            .then(data=> data.reg )
        }
    })
}
module.exports = {
    collection,
    addToDB
}




