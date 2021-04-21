var alert = document.querySelector(".alert")
var modal = new bootstrap.Modal(document.querySelector('.modal'))

document.querySelector("noscripts").style.display="none"
    const form = document.querySelector("form")
    const inputs = Array.from(document.querySelectorAll("input"))


    // form submit check if all inputs are filled
    form.addEventListener("submit", function(e){
        e.preventDefault()
    try{
     inputs.forEach(input => {
         if(!Boolean(input.value.trim())){
             throw "Make sure all inputs are filled correctly"
         }
        //  making sure regnumber is ten digits
         if(input.name== "regnumber"){
             if(input.value.length !== 10){
                throw "your regnumber should be 10 characters long"
             }
         }
         if(input.name == "department"){
           if(!/^[a-zA-Z]*$/.test(input.value)){
               throw "your department should contain just texts"
           }
         }
         
     });
     form.submit()
    } catch(err){
        alert.innerText = err
        alert.classList.add("show")
        setTimeout(()=>{
            alert.classList.remove("show")
        },2500)
    }  
    })

    // inputs validation
    var getInput ;
    inputs.forEach(input=>{
        input.addEventListener("keyup", function(e){
            if(input.name === "regnumber"){
                getInput  =  e.target.value.length < 11 ? e.target.value : getInput ;
                if(e.target.value.length > 9){
                    e.target.value = getInput
                }
            }
        })
    })

// onChange function for the input of file type
 var loadFile = function(e) {
     var file = e.target.files[0]
   if(file){
       modal.show()
     var image = document.querySelector(".image-crop img") 
     image.setAttribute("src", URL.createObjectURL(file))
   }
 
};

//  attach event listener to clear/show input file value when modal is closed or saved 
document.querySelector(".modal").addEventListener("click", function(e){
    if(e.target.getAttribute("data-bs-dismiss")){
        document.querySelector("input[type=file]").value = ""
    }
    if(e.target.getAttribute("data-upload")){
        modal.hide()
    }
})

document.querySelector(".modal").addEventListener("shown.bs.modal", function(){
    
})
