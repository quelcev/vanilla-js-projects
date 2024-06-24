const btnEl = document.querySelector(".btn");

btnEl.addEventListener("mouseover", (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  btnEl.style.setProperty("--rippleTop", y + "px");
  btnEl.style.setProperty("--rippleLeft", x + "px");
});
