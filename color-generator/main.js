const hexChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
let color = "#f1f5f8";
const bodyEl = document.body;
const generateBtnEl = document.querySelector(".generate-btn");
const colorEl = document.querySelector(".color");

updateColor();

generateBtnEl.addEventListener("click", () => {
  color = "#";
  for (let i = 0; i < 6; i++) {
    const randomNumber = Math.floor(Math.random() * hexChars.length);
    color += hexChars[randomNumber];
  }
  updateColor();
});
colorEl.addEventListener("click", (e) => {
  const isCopy = e.target.classList.contains("copy");
  if (isCopy) {
    copyToClipboard(color);
    e.target.innerHTML = `Copied <i class="fas fa-check"></i>`;
    setTimeout(() => {
      colorEl.innerHTML = `${color}<span class="copy">Copy</span>`;
    }, 3000);
  }
});

function updateColor() {
  bodyEl.style.backgroundColor = color;
  colorEl.innerHTML = `${color}<span class="copy">Copy</span>`;
}
function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      // console.log("Copied to clipboard");
    })
    .catch((err) => {
      console.error("Unable to copy to clipboard:", err);
    });
}
