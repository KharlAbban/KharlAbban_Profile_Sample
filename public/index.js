document.getElementById("year").textContent = new Date().getFullYear();

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
 