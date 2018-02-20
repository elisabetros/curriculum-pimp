/*
to do:
+blocks width needs refine, now doesn't display properly when ects is much bigger


maybe:
?

issues:
!

*/
let arrow = document.querySelectorAll('.arrow');
let info = document.querySelectorAll('.info');

// unfold and fold the detail info in other-info (and exams) ---> now the arrow doesn't work, only the section
arrow.forEach(clickArrow);

function clickArrow(a) {
  a.addEventListener('click', unfold);

  function unfold() {
    a.parentElement.parentElement.classList.toggle('unfold');
  }
}
info.forEach(clickInfo);

function clickInfo(e) {
  e.addEventListener('click', unfoldTwo);

  function unfoldTwo() {
    e.classList.toggle('unfold');
  }
}

// get info for each semester
let ectsS = [];
let allEcts;
let allEctsS = [];
fetch("try.json").then(result => result.json()).then(semesters => generateForEachSemester(semesters));

function generateForEachSemester(semesters) {
  semesters.forEach(createBlocks);

  function createBlocks(semester, index) {
    let semesterNr = index + 1;
    allEcts = 0;
    let thisSemester = document.querySelector('.semester:nth-of-type(' + semesterNr + ') .blocks');
    const blocks = semester.components; // array
    blocks.forEach(block => {
      allEcts += block.ects;
      ectsS.push(block.ects);
      let generatedBlock = document.createElement('div');
      generatedBlock.style.textAlign = "center";
      generatedBlock.classList.add('block');
      let h3 = document.createElement('h3');
      h3.textContent = block.name;
      h3.style.display = "inline-block";
      h3.style.color = "white";
      let credit = document.createElement('span');
      credit.textContent = "ECTS: " + block.ects;
      credit.style.marginLeft = "30px";
      let content = document.createElement('p');
      content.textContent = block.content;
      let plus = document.createElement('p'); // need change later
      plus.style.textAlign = "right";
      plus.style.marginRight = "30px";
      plus.classList.add('expand');
      plus.innerHTML = "&caron;";
      plus.style.fontSize = "37px";
      let details = document.createElement('div');
      details.className = "hide details"; // need change later
      details.style.backgroundColor = "white";
      details.innerHTML = block.details;
      generatedBlock.appendChild(h3);
      generatedBlock.appendChild(credit);
      generatedBlock.appendChild(content);
      generatedBlock.appendChild(plus);
      generatedBlock.appendChild(details);
      thisSemester.appendChild(generatedBlock);
    });
    // expand details for each semester
    let expand = document.querySelectorAll(".expand");
    expand.forEach(showDetail);

    function showDetail(e, index) {
      // click on each expand, opens the corresponding detail section
      e.addEventListener("click", displayIndivdual);

      function displayIndivdual() {
        e.nextElementSibling.classList.remove("hide");
      }
      // flash expand icons in order
      e.style.animation = "flash 2s " + (index * 1) + "s 1";
    }
    // close details for each semester /* need change later */
    let close = document.querySelectorAll(".x");
    close.forEach(hideDetails);

    function hideDetails(x) {
      x.addEventListener("click", hideIndividual);

      function hideIndividual() {
        x.parentElement.classList.add("hide");
      }
    }

    // set block width, need to run this after allEcts for whole semester(more than one blocks) is calculated
    for (i = 0; i < ectsS.length; i++) {
      thisSemester.style.gridTemplateColumns = "repeat(" + allEcts + ", 1fr)";
      document.querySelectorAll('.block')[i].style.gridColumn = "span " + ectsS[i];
      document.querySelectorAll('.details')[i].style.gridColumn = "span " + ectsS[i];
    }
    allEctsS.push(allEcts);
  }
  /* in case some semester has more ECTS than others */
  let longestBar = Math.max(...allEctsS); // the ... is because allEctsS is an array, can't use Math.max directly. can also use Math.max.apply(null, array)
  for (i = 0; i < semesters.length; i++) {
    document.querySelector('.semester:nth-of-type(' + (i + 1) + ') .blocks').style.width = allEctsS[i] / longestBar * 100 + "%";
  }
}

// fix navi to top after scroll and show kea log + search
const nav = document.querySelector('nav');
const main = document.querySelector('main');
const coreAreas = document.querySelector('#coreAreas'); // cuz nav will be fixed later, don't rely the trigger on nav itself, rather the one below nav, so grab this element
const semesterPlan = document.querySelector('#programStructure');
const exams = document.querySelector('#exams');
const other = document.querySelector('#other');
const keaLogo = document.querySelector('.kea-logo img');
const search = document.querySelector('.search');
window.addEventListener('scroll', getAndCheckNavOffsetTop);

function getAndCheckNavOffsetTop() {
  let offset = coreAreas.getBoundingClientRect();
  if (offset.top <= 115) {
    nav.style.position = "fixed";
    nav.style.top = "-45px"; // don't know why -45...
    nav.style.width = "100vw";
    coreAreas.style.top = "70px";
    semesterPlan.style.top = "70px"; // all the following div need to change accordingly as well. Strange.... don't need to change back when scroll back up
    exams.style.top = "70px";
    other.style.top = "70px";
    keaLogo.classList.add('show');
    search.classList.add('show');
  } else {
    nav.style.position = "inherit";
    nav.style.top = "0px";
    coreAreas.style.top = "0";
    keaLogo.classList.remove('show');
    search.classList.remove('show');
  }
}