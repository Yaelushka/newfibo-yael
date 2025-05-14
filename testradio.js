const result = document.querySelector("#result");
    const input =document.getElementById("input");
    const loadingElement = document.querySelector("#loading");
    const resetBtn= document.querySelector(".reset");
    const errorElement = document.querySelector("#error");
    let resultList = document.querySelector(".resultList");
    const dateAscRadio = document.getElementById("dateAsc");
    const dateDescRadio = document.getElementById("dateDesc");

    let savedItems= JSON.parse(localStorage.getItem("savedItems")) || [];
    console.log({savedItems});
    let checkBox= document.getElementById("checkbox");


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

        }
        catch(err){
            console.log("errrror") }
            finally{ showLoading(false)
            if (!errorElement.textContent) {
                addListItem(input.value, result.textContent);
            }
            } 
            
        };

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
            if(checkBox.checked){
            searchFibNum(input.value);}
            else{
                result.innerHTML=newFib[input.value]

            }
            
            
    } };


    resetBtn.addEventListener("click",function(){
        input.style.border = "";
        input.style.boxShadow = "";
        input.value= " "
        result.textContent = ""
        hideError();

        
    });



    async function fetchPastResults(){
        if(checkBox.checked){
        try{
            showLoading(true);

            const Response = await fetch ("http://localhost:3000/results");
            console.log({Response});
            if (!Response.ok) throw new Error ("Something went wrong..."); 
                const data = await Response.json();
               showPastResults(data);
                return data;
            
        }   catch(err){
            console.log("nope!");
            return [];
                }
        finally{ showLoading(false)
            
                }       
        }};

        function addListItem(number, result){
            if(checkBox.checked){
                const li = document.createElement("li");
                const now = new Date();
                const dateTimeString = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
                li.innerHTML = `The Fibonacci of <span class="bold">${number}</span> is <span class="bold">${result} </span>
                    <span style="float: right; margin-left: 10px;">${dateTimeString}</span>`;
                li.dataset.timestamp = now.getTime();
                resultList.appendChild(li);
            
            saveListItems();
            }
        };
    
    function saveListItems(){   
        let listItems=[];
        console.log(resultList);
        for(let i = 0; i < resultList.children.length; i++){
        listItems.push({
            html: resultList.children[i].innerHTML,
            timestamp: resultList.children[i].dataset.timestamp
        });
        }
    console.log (listItems)
    localStorage.setItem("resultsList", JSON.stringify(listItems));

    }   
    function loadListItems(){
        const storedResults = localStorage.getItem("resultsList");
        if (storedResults) {
        const resultsArray = JSON.parse(storedResults);
        resultsArray.forEach((itemData) => { 
        const listItem = document.createElement("li");
        listItem.innerHTML = itemData.html;
        listItem.dataset.timestamp = itemData.timestamp;
        resultList.appendChild(listItem);
        });
        }
        
    }
    loadListItems();


    function fibonacci(n){
        const fib= [0,1]; 
         for (let i=2; i<n; i++){
            a = fib[i-1];
            b = fib[i-2];
            fib.push(a+b);        
         };
         
        return fib;
    };

    console.log(fibonacci(20));

    const newFib = fibonacci(21)

    
    function showPastResults(results) { 
        results.forEach(item => {
            const li = document.createElement('li');
            const dateTimeString = new Date(item.createdAt).toLocaleDateString() + ' ' + new Date(item.createdAt).toLocaleTimeString();
            li.innerHTML = `The Fibonacci of <span class="bold">${item.number}</span> is <span class="bold">${item.result}</span>
                            <span style="float: right; margin-left: 10px;">${dateTimeString}</span>`;
            li.dataset.timestamp = new Date(item.createdAt).getTime(); 
            resultList.appendChild(li);
        });
        sortResults(); 
    }

    function sortResults() {
        const selectedOrder = document.querySelector('input[name="sortOrder"]:checked');
        const order = selectedOrder ? selectedOrder.value : null;

        const listItems = Array.from(resultList.children);

        listItems.sort((a, b) => {
            const timestampA = parseInt(a.dataset.timestamp);
            const timestampB = parseInt(b.dataset.timestamp);
            if (order === 'asc') {
                return timestampA - timestampB;
            } else if (order === 'desc') {
                return timestampB - timestampA;
            }
            return 0; 
        });

        resultList.innerHTML = ''; 
        listItems.forEach(item => resultList.appendChild(item));
    }

    
    dateAscRadio.addEventListener('change', function(){localStorage.setItem('sortOrder', 'asc')});
    dateDescRadio.addEventListener('change', function(){ localStorage.setItem('sortOrder', 'desc')});
    
