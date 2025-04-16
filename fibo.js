const result = document.querySelector("#result");
const input =document.getElementById("input");
const loadingElement = document.querySelector("#loading");
const resetBtn= document.querySelector(".reset");



input.addEventListener("change", function() { 
   displayResult ()   
})
//onblur = (keyUp) =>{};



function showLoading(isShow){
  loadingElement.classList.toggle("hidden", !isShow) 
}


async function searchFibNum(x){ 
   
   if(input.value>20 ){
      console.log("Please enter a number lower than 20")
   }
   try{
      showLoading(true);
      
     const Response = await 
     fetch (`http://localhost:3000/calculate/${x}`);
     console.log({Response});

   if (!Response.ok){
      throw new Error ("Something went wrong...")
      
   }
   const data = await Response.json();
   result.textContent = data.result;
  
   
   }  catch(err){
      console.log("errrror")   }
   finally{ showLoading(false)
      }  
   
}
function displayResult (){
   //const num = parseInt(input.value);
   searchFibNum(input.value);
}

resetBtn.addEventListener("click",function(){
   input.value= " "
   result.textContent = ""
});



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


