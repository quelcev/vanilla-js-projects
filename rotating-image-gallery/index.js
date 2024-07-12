const imgContainerEl = document.querySelector(".image-container");
const nextEl = document.getElementById("next");
const prevEl = document.getElementById("prev");
let x = 315;

let updateGalleryTimeout = null;

window.addEventListener("DOMContentLoaded", updateGallery);
nextEl.addEventListener("click", () => {
  clearTimeout(updateGalleryTimeout);
  nextImg();
});
prevEl.addEventListener("click", () => {
  clearTimeout(updateGalleryTimeout);
  prevImg();
});

function nextImg() {
  x = x - 45;
  updateGallery();
}

function prevImg() {
  x = x + 45;
  updateGallery();
}

function updateGallery() {
  imgContainerEl.style.transform = `perspective(1000px) rotateY(${x}deg)`;
  updateGalleryTimeout = setTimeout(nextImg, 3000);
}
