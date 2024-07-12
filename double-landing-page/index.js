const containerEl = document.querySelector(".container");

containerEl.addEventListener("mouseover", (e) => {
  resetActive();
  if (e.target.closest(".left")) {
    containerEl.classList.add("active-left");
  }
  if (e.target.closest(".right")) {
    containerEl.classList.add("active-right");
  }
});
containerEl.addEventListener("mouseleave", resetActive);

function resetActive() {
  containerEl.className = "container";
}
