//Declare all variables up here
const projectCard = Array.from(document.querySelectorAll("[data-project-card]"));
const projectModal = document.querySelector("[data-modal-project]");
const projectsFileUrl = "media/project_media/projects.json";
const projectViewBtns = document.querySelectorAll(".project-view-btn");
const newCards = document.querySelectorAll("[data-card-new]");
document.getElementById("year").textContent = new Date().getFullYear();

//Animation for typed words
var typed = new Typed("#typeHere", {
    strings: ['Web Developer', 'Site and App Tester', 'Website Consultant'],
    typeSpeed: 45,
    backSpeed: 40,
    backDelay: 2500,
    startDelay: 1000,
    loop: true,
});
//Event Listener for Navigation Toggle
document.getElementById("nav-toggle-btn").addEventListener("click", function (Event) {
    document.body.classList.toggle("nav-toggle-active");
});
//Event Listener for toggle button
const toggleBTT = () => {
    if (window.scrollY > 500) {
        document.getElementById("BTT").classList.add("active");
    } else {
        document.getElementById("BTT").classList.remove("active");
    }
}
//Add event listener on window so it effects on scroll
window.addEventListener("scroll", toggleBTT);
//Code for Map
var map = L.map('map').setView([6.064566399999999, -0.2628136], 16);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var marker = L.marker([6.064566399999999, -0.2628136]).addTo(map);
//Event Listener for View Project Button
projectViewBtns.forEach((viewBtn) => {
    viewBtn.addEventListener("click", setProjectDetails)
});


//Every Function below this comment
//Function to get project data
async function getProjects () {
    const response = await fetch(projectsFileUrl);
    const projectData = await response.json();
    return projectData;
}
//Function to Splice Array (Sends items with empty endDate to last index)
function spliceArray(array, index) {
    if (index >= array.length || index < 0) {
      // Invalid index
      return array;
    }
    const element = array.splice(index, 1)[0];
    array.push(element);
    return array;
}
//Function to set text for milliseconds
function getDateFormat(milliSecs) {
    let seconds = Math.floor(milliSecs/1000);
    let minutes = Math.floor(milliSecs / (1000 * 60));
    let hours = Math.floor(milliSecs / (1000 * 60 * 60));
    let days = Math.floor(milliSecs / (1000 * 60 * 60 * 24));
    let weeks = Math.floor(milliSecs / (1000 * 60 * 60 * 24 * 7));
    let months = Math.floor(milliSecs / (1000 * 60 * 60 * 24 * 7 * 4));
    let years = Math.floor(milliSecs / (1000 * 60 * 60 * 24 * 7 * 4 * 12));

    switch (true) {
        case milliSecs >= (1000 * 60 * 60 * 24 * 7 * 4 * 12):
            return years + " years ago";
            break;
        case milliSecs >= (1000 * 60 * 60 * 24 * 7 * 4):
            return months + " months ago";
            break;
        case milliSecs >= (1000 * 60 * 60 * 24 * 7):
            return weeks + " weeks ago";
            break;
        case milliSecs >= (1000 * 60 * 60 * 24):
            return days + " days ago";
            break;
        case milliSecs >= (1000 * 60 * 60):
            return hours + " hours ago";
            break;
        case milliSecs >= (1000 * 60):
            return minutes + " minutes ago";
            break;
        case milliSecs >= (1000):
            return seconds + " seconds ago";
            break;
        default:
            break;
    }
}
//Function to set whats new
async function whatsNew () {
    const projectData = await getProjects();
    //Sort Array
    projectData.sort(function (a, b) {
        return new Date(b.endDate) - new Date(a.endDate);
    });
    //Move elements with empty end dates to last index
    projectData.forEach((item) => {
        if (!item.endDate == "") return;
        spliceArray(projectData, projectData.indexOf(item));
    });
    //Set Content for each New Card
    newCards.forEach((newCard, index) => {
        newCard.querySelector("[data-card-new-title]").textContent = projectData[index].title;
        newCard.querySelector("[data-card-new-summary]").textContent = projectData[index].summary;
        newCard.querySelector("[data-card-new-view-btn]").setAttribute("href", projectData[index].liveUrl);
        newCard.querySelector("[data-card-new-edit-btn]").setAttribute("href", projectData[index].codeBase);
        //get milliseconds nad pass to function to return text
        const milliSecs = new Date() - new Date(projectData[index].endDate);
        newCard.querySelector("[data-new-card-time]").textContent = getDateFormat(milliSecs);//endDate
    });
}
whatsNew();
//Fetch Function to get and set projects on load
async function setAllProjects () {
    const projectData = await getProjects();
    projectCard.forEach((card, index) => {
        // let randomIndex = Math.floor(Math.random() * projectData.length);
        card.setAttribute("data-project-card", index);
        var imagePath = `media/project_media/${projectData[index].thumbnail}`;
        card.querySelector("[data-project-card-bg]").style.backgroundImage = `url(${imagePath})`;
        card.querySelector("[data-project-card-id]").textContent = projectData[index].id;
        card.querySelector("[data-project-card-title]").textContent = projectData[index].title;
        card.querySelector("[data-project-card-summary]").textContent = projectData[index].summary;
        card.querySelector("[data-project-card-status]").textContent = `Status: ${projectData[index].status}`;
    });
}
setAllProjects();

//Function to set details of modal when a project is clicked
async function setProjectDetails (Event) {
    const projectData = await getProjects();
    var btnCard = Event.target.parentElement.parentElement.parentElement;
    var projectIndex = parseInt(btnCard.getAttribute("data-project-card"));
    console.log(projectData[projectIndex]);
    var imagePath = `media/project_media/${projectData[projectIndex].bgImg}`;
    projectModal.querySelector("[data-modal-project-bg-img]").style.backgroundImage = `url(${imagePath})`;
    projectModal.querySelector("[data-modal-project-id]").textContent = projectData[projectIndex].id;
    projectModal.querySelector("[data-modal-project-title]").textContent = projectData[projectIndex].title;
    projectModal.querySelector("[data-modal-project-author]").textContent = projectData[projectIndex].author;
    projectModal.querySelector("[data-modal-project-duration]").textContent = projectData[projectIndex].duration;
    projectModal.querySelector("[data-modal-project-status]").textContent = projectData[projectIndex].status;
    projectModal.querySelector("[data-modal-project-languages]").textContent = projectData[projectIndex].languages;
    projectModal.querySelector("[data-modal-project-description]").textContent = projectData[projectIndex].description;

    projectModal.querySelector("[data-modal-project-codebase]").setAttribute("href", projectData[projectIndex].codeBase);
    projectModal.querySelector("[data-modal-project-liveUrl]").setAttribute("href",projectData[projectIndex].liveUrl);
}
