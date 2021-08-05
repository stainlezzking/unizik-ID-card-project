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
        const picture = fs.readFileSync(req.file.path)
        console.log(req.file)
        const student = {...req.body, picture, mimeType: req.file.mimetype, path:req.file.path }
        console.log(student)
        console.log("this is the line before your data is saved" )
        addToDB(student).then(user=>{
            console.log(user)
            return res.render("idCard", {user})
        }).catch(err=>{
            console.log("an error occured in the addToBD function block:" + err.message)
           return res.send("something went wrong!! try again later or contact us ")
        })
        // Note: I could have easily unlinked all the images from the upload folder 
        // after storig them, but since the servers are not persistent (heroku), might as 
        // well let them delete it them selfs
    }
 
}