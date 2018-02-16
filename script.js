let expand = document.querySelectorAll(".expand");
let close = document.querySelectorAll(".x");
let arrow = document.querySelectorAll('sub'); // need to change later

// expand details for each semester
expand.forEach(showDetail)
function showDetail(e){
    e.addEventListener("click", displayIndivdual);
    function displayIndivdual(){
     e.parentElement.nextElementSibling.classList.remove("hide");
    }
}
// close details for each semester /* need change later */
close.forEach(hideDetails);
function hideDetails(x){
    x.addEventListener("click", hideIndividual);
    function hideIndividual(){
        x.parentElement.classList.add("hide");
    }
}
// unfold and fold the detail info in additional-info (and exams)
arrow.forEach(clickArrow);
function clickArrow(a){
    a.addEventListener('click', unfold);
    function unfold(){
        a.parentElement.parentElement.classList.toggle('unfold');
    }
}

// get info for each semester
let ectsS = [];
let allEcts;
let allEctsS = [];
fetch("try.json").then(result=>result.json()).then(semesters=>generateForEachSemester(semesters));
function generateForEachSemester(semesters){
    semesters.forEach(createBlocks);
    function createBlocks(semester, index){
        let semesterNr = index + 1;
        allEcts = 0;
        let thisSemester = document.querySelector('.semester:nth-of-type('+ semesterNr + ') .blocks');
        const blocks = semester.components; // array
        blocks.forEach(block=>{
            allEcts += block.ects;
            ectsS.push(block.ects);
            let generatedBlock = document.createElement('div');
            generatedBlock.style.textAlign = "center";
            generatedBlock.classList.add('block');
            let h4 = document.createElement('h3');
            h4.textContent = block.name;
            let info = document.createElement('p');
            info.textContent = "ECTS: " + block.ects;
            let plus = document.createElement('p'); // need change later
            plus.textContent = "+"
            generatedBlock.appendChild(h4);
            generatedBlock.appendChild(info);
            generatedBlock.appendChild(plus); // need change later
            thisSemester.appendChild(generatedBlock);
        });
        for(i=0; i<ectsS.length; i++){
            thisSemester.style.gridTemplateColumns = "repeat(" + allEcts + ", 1fr)";
            document.querySelectorAll('.block')[i].style.gridColumn = "span " + ectsS[i];
        }
        allEctsS.push(allEcts);
    }
    /* in case some semester has more ECTS than others */
    let longestBar = Math.max(...allEctsS); // the ... is because allEctsS is an array, can't use Math.max directly. can also use Math.max.apply(null, array)
    for(i=0; i<semesters.length; i++){
        document.querySelector('.semester:nth-of-type('+ (i+1) + ') .blocks').style.width = allEctsS[i]/longestBar*100 +"%";
    }
}
