const imgContainerEl = document.querySelector(".image-container");
const btnEl = document.querySelector(".btn");

btnEl.addEventListener("click", () => {
  addNewImg();
});

function addNewImg() {
  for (let i = 0; i < 4; i++) {
    const imgTag = document.createElement("img");
    imgTag.src = `https://picsum.photos/300?random=${Math.floor(
      Math.random() * 2000
    )}`;
    imgContainerEl.appendChild(imgTag);
  }
}
