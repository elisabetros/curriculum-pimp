let expand = document.querySelectorAll(".expand");
let close = document.querySelectorAll(".x");
let arrow = document.querySelectorAll('sub'); // need to change later

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

arrow.forEach(clickArrow);
function clickArrow(a){
    a.addEventListener('click', unfold);
    function unfold(){
        a.parentElement.parentElement.classList.toggle('unfold');
    }
}
