const adviceIdContainer = document.querySelector("[data-advice-id]");
const adviceButton = document.querySelector("[data-advice-random]");
const adviceContentContainer = document.querySelector("[data-advice-content]");
getAdvice();
adviceButton.addEventListener("click", () => {
  getAdvice();
});

async function getAdvice () {
  adviceContentContainer.textContent = "Advice Loading...";
  adviceIdContainer.textContent = "";
  const url = "https://api.adviceslip.com/advice";
  const response = await fetch(url);
  const toJson = await response.json();
  console.log(toJson);
  adviceIdContainer.textContent = toJson.slip.id;
  adviceContentContainer.textContent = `"${toJson.slip.advice}"`;
}