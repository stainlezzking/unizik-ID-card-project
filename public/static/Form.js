var alert = document.querySelector(".alert")


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
         if(input.name== "regNumber"){
             if(input.value.length !== 10){
                throw "your regnumber should be 10 characters long"
             }
         }
         if(input.name == "department"){
           if(!/^[a-zA-Z ]*$/.test(input.value)){
               throw "your department should contain just texts"
           }
         }
         
         
     });
     if(!document.querySelector("select").value){
         throw "your bloodGroup option is empty"
     }
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