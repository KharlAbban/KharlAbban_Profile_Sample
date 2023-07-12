const form = document.querySelector("#form");
form.addEventListener("submit", (Event) => {
  Event.preventDefault();
  document.querySelector(".newsletter-container").classList.add("hide");
  document.querySelector(".thank-you-container").classList.add("show");
  return 0;
});
document.querySelector("#form-btn").addEventListener("click", () => {
  document.querySelector(".thank-you-container").classList.remove("show");
});
