//Declare all variables up here
const projectCard = Array.from(document.querySelectorAll("[data-project-card]"));
const projectModal = document.querySelector("[data-modal-project]");
const projectsFileUrl = "media/project_media/projects.json";
const projectViewBtns = document.querySelectorAll(".project-view-btn");
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
    viewBtn.addEventListener("click", getProjectDetails)
});


//Every Function below this comment

//Fetch Function to get and set projects on load
async function getAllProjects () {
    const response = await fetch(projectsFileUrl);
    const projectData = await response.json();
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
getAllProjects();

//Function to set details of modal when a project is clicked
async function getProjectDetails (Event) {
    const response = await fetch(projectsFileUrl);
    const projectData = await response.json();
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
