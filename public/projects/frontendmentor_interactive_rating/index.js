const rateInputs = document.querySelectorAll(".rate");
let rateChosen;
rateInputs.forEach(rateInput => {
  rateInput.addEventListener("click", rateClicked);
});
document.querySelector("#rateBtn").addEventListener("click", submitRate);

function rateClicked(event) {
  for (var i=0;i<rateInputs.length;i++) {
    if (rateInputs[i].classList.contains("clicked")) {
      rateInputs[i].classList.remove("clicked");
    }
  }
  event.target.classList.add("clicked");
}

function submitRate(event) {
  let oneChosen = false;
  for (var i=0;i<rateInputs.length;i++) {
    if (rateInputs[i].classList.contains("clicked")) {
      oneChosen = !oneChosen;
      rateChosen = rateInputs[i];
      document.querySelector("#selected").textContent = rateChosen.value;
    }
  }
  if (!oneChosen) {alert("Please select a rating!"); return;}
  document.querySelector("#thanksState").classList.remove("d-none");
  document.querySelector("#rateState").classList.add("d-none");
}