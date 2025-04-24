const result = document.querySelector("#result");
const input =document.getElementById("input");
const loadingElement = document.querySelector("#loading");
const resetBtn= document.querySelector(".reset");
const errorElement = document.querySelector("#error");


input.addEventListener("change", function() { 
  displayResult ()   
})
 
function showLoading(isShow){
  loadingElement.classList.toggle("hidden", !isShow) 
}

function showError(message){
   errorElement.textContent = message
   errorElement.classList.remove("hidden")
}

function hideError(){  
   errorElement.textContent = ""
   errorElement.classList.add("hidden")

}


async function searchFibNum(x){ 
  
   try{
      showLoading(true);
     const Response = await 
     fetch (`http://localhost:3000/calculate/${x}`);
     console.log({Response});

   if (!Response.ok){
      throw new Error ("Something went wrong...")
      
   }
   
   const data = await Response.json();
   console.log(data.result)
   result.textContent = data.result;
   
   
   }  catch(err){
      console.log("errrror")   }
   finally{ showLoading(false)
      }  
   
}
function displayResult (){

   input.style.border = "";
   input.style.boxShadow = "";

   if(input.value==123){
      result.textContent = "";
      showError("418 - I am a teapot");
      return;
   }

   if(input.value>20 ){
      result.textContent = ""
      showError("Number must be lower than 20")
      input.style.border = "1px solid red";
      input.style.boxShadow = "0 0 3px red";
      return;
   }
   if (input.value<=0){
      result.textContent = "";
      showError("Number can't be smaller than 1")
      input.style.border = "1px solid red";
      input.style.boxShadow = "0 0 3px red";
      return;
   }
  
   else {
      hideError();
      searchFibNum(input.value);
      
}
   }
  
;


resetBtn.addEventListener("click",function(){
   input.style.border = "";
   input.style.boxShadow = "";
   input.value= " "
   result.textContent = ""
   hideError();

   
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


