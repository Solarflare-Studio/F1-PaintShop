const loadingContent = document.querySelector("#loadingContent");
const welcomeContent = document.querySelector("#welcomeContent");
const pattenContent = document.querySelector("#pattenContent");

const tutorial = document.querySelector("#tutorial");
const pattenTutorial = document.querySelector("#pattenTutorial");
const menu = document.querySelector("#menu");
const progress = document.querySelector("#file");
const dropdownArrow = document.querySelector("#dropdownArrow");
const dropdownElm = document.querySelector("#languageSelect");
const tabToggle = document.querySelector("#tabToggle");
const tabContent = document.querySelector("#tabContent");
let selectedLanguage = document.querySelector("#selectedLanguage");
const f1PaintTab = document.querySelectorAll(".tab button");

let loadingProgress = 0;
selectedLanguage.innerHTML = "Language 1";
move();
function move() {
  if (loadingProgress == 0) {
    loadingProgress = 1;
    const id = setInterval(frame, 10);
    function frame() {
      if (loadingProgress >= 100) {
        clearInterval(id);
        loadingProgress = 0;
      } else {
        loadingProgress++;
        progress.value = loadingProgress;
        welcome();
      }
    }
  }
}
// Redirect to welcome layout
function welcome() {
  if (loadingProgress === 100) {
    menu.classList.remove("hidden");
    welcomeContent.classList.remove("hidden");
    loadingContent.classList.add("hidden");
  }
}

// select language
function handleLanguageSelect() {
  dropdownArrow.classList.toggle("rotate-180");
}
function handleLanguageChange(e) {
  selectedLanguage.innerHTML = e;
}
window.addEventListener("click", (event) => {
  if (event.target.closest("#languageSelect") !== dropdownElm) {
    dropdownArrow.classList.remove("rotate-180");
  }
});

// Redirect to patten layout
function handleWelcomeNext() {
  pattenContent.classList.remove("hidden");
  welcomeContent.classList.add("hidden");
  tutorial.classList.remove("hidden");
}

// Redirect to tutorial layout
function handleTutorial() {
  pattenTutorial.classList.remove("hidden");
  tutorial.classList.add("hidden");
}

// Redirect to patten layout
function handlePattenTutorial() {
  pattenTutorial.classList.add("hidden");
}

//tab content hide/show
function handleTabToggle() {
  tabToggle.classList.toggle("rotate-180");
  tabContent.classList.toggle("hidden");
}

// Add click event listener to each box
f1PaintTab.forEach((box) => {
  box.addEventListener("click", (event) => {
    const currTarget = event.target;
    // Get the previous element
    const parentElm = currTarget.closest("li");
    // Get the previous and next elements
    const previousElement = parentElm.previousElementSibling;
    const nextElement = parentElm.nextElementSibling;

    // Remove the active class from all boxes
    f1PaintTab.forEach((box) => {
      const parentElm = box.closest("li");
      parentElm.classList.remove("activeTab");
      parentElm.classList.remove("prevTab");
    });

    // Add the active class to the clicked element
    parentElm.classList.add("activeTab");

    // Add a class to the previous element
    if (previousElement) {
      previousElement.classList.add("prevTab");
    }

    // Remove a class from the next element
    if (nextElement) {
      nextElement.classList.remove("prevTab");
    }
  });
});
