let expand = document.querySelectorAll(".expand");
let close = document.querySelectorAll(".x");

expand.forEach(showDetail)

function showDetail(e){
    e.addEventListener("click", displayIndivdual);
    function displayIndivdual(){
     e.parentElement.nextElementSibling.classList.remove("hide");
    }
}

close.forEach(hideDetails);

function hideDetails(x){
    x.addEventListener("click", hideIndividual);
    function hideIndividual(){
        x.parentElement.classList.add("hide");
    }
}
