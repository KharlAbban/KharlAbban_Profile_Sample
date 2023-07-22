const currentHour = document.querySelectorAll("[data-current-hour]");
const prevHours = document.querySelectorAll("[data-previous-hours]");
const cards = document.querySelectorAll("[data-card]");
const navLinks = document.querySelectorAll(".changeLink");

navLinks.forEach((changeLink) => {
  changeLink.addEventListener("click", () => {
    navLinks.forEach(link => {link.classList.remove("active-text")});
    changeLink.classList.add("active-text");

    console.log(changeLink.textContent.toLowerCase());
    getInfo(changeLink.textContent.toLowerCase());
  });
});

async function getInfo(timeFrame) {
  let prefix;
  switch (true) {
    case (timeFrame == "daily"):
      prefix = "Yesterday";
      break;
    case (timeFrame == "weekly"):
      prefix = "Last Week";
      break;
    case (timeFrame == "monthly"):
      prefix = "Last Month";
      break;  
    default:
      break;
  }
  const response = await fetch("data.json");
  const data = await response.json();
  data.forEach((item, index) => {
    currentHour[index].textContent = `${item.timeframes[timeFrame].current}hrs`;
    prevHours[index].textContent = `${prefix} - ${item.timeframes[timeFrame].previous}hrs`;
  });
}