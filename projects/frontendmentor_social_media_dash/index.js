document
  .querySelector("[data-theme-toggle]")
  .addEventListener("change", (Event) => {
    const checkBox = Event.target;
    if (checkBox.checked) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  });
