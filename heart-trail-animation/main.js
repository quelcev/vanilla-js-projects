const bodyEl = document.querySelector("body");

bodyEl.addEventListener("mousemove", (e) => {
  const x = e.offsetX;
  const y = e.offsetY;
  const spanEl = document.createElement("span");
  const size = Math.floor(Math.random() * 100) + 1;
  spanEl.style.width = size + "px";
  spanEl.style.height = size + "px";
  spanEl.style.top = y + "px";
  spanEl.style.left = x + "px";
  bodyEl.appendChild(spanEl);
  setTimeout(() => {
    spanEl.remove();
  }, 3000);
});
