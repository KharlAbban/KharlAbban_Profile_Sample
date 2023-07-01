const btn = document.querySelectorAll("[data-accordion-button]");
btn.forEach((button, index) => {
  button.addEventListener("click", (event) => {
    button.classList.toggle("active");
    button.parentElement.parentElement.querySelector("[data-accordion-content]").classList.toggle("open");
  })
})