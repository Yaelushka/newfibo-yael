const result = document.querySelector("#result");
const userNumber =document.getElementById("input").value
const loadingElement = document.querySelector(".loading");
const resetBtn= document.querySelector(".reset");

resetBtn.addEventListener("click",function(){
input.value= " "});

userNumber.addEventListener("blur", (keyUp) => { 
   //?result.innerHTML = FibNum.number;     
})
onblur = (keyUp) =>{};



function showLoading(isShow){
   loadingElement.classList.toggle("hidden", !isShow) 
}

function showError(message){
   console.log("errrrrror")
}

async function searchFibNum(){  
   try{
      showLoading(true);
    
     const Response = await 
     fetch ("http://localhost:3000/results");
     console.log({Response});

   if (!Response.ok){
      throw new Error ("Something went wrong...")
   }
   const FibNum= await Response.json()
   result.innerHTML = FibNum.number;
   }  catch(err){
      showError(err.message)
   }
   finally{ showLoading(false)}  
   
}





//function fibonacci(n){
//    const fib= [0,1]; 
//    for (let i=2; i<n; i++){
//       a = fib[i-1];
//       b = fib[i-2];
//       fib.push(a+b);
        
//    }
    
//   return fib;
//}

//console.log(fibonacci(20));

//const newFib = fibonacci(21)


