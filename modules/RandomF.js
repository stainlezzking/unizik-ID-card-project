const fs = require("fs")
const {addToDB} = require("./mongooseConfig")
module.exports.bodyCheck = function(req,res){
    var pass = true;
    for(props in req.body){
        if(!req.body[props]){
            pass = false
            fs.unlinkSync(req.file.path)
            Fields ={error:"Make sure all field is filled",...req.body}
            return res.render("FormDetails", {Fields})
        } 
    }
    if(req.body["regNumber"].length !== 10){
        pass = false
        fs.unlinkSync(req.file.path)
        Fields ={error:"check your reg number",...req.body}
        return res.render("FormDetails", {Fields})
    }
    if(pass){
        const student = {...req.body, path : req.file.path}
        addToDB(student).then(user=>{
            user = {...student}
            return res.render("idCard", {user})
        }).catch(err=>{
            console.log("an error occured in the addToBD function block:" + err.message)
           return res.send("something went wrong!! try again later or contact us ")
        })
    }
 
}