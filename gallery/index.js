const galleryImgsEL = document.querySelectorAll(".gallery-container .img");
const modalEl = document.querySelector(".modal-overlay");
const modalCloseBtnEl = document.querySelector(".close-btn");
const modalMainImgEl = document.querySelector(".modal-main-img");
const modalImgTitleEl = document.querySelector(".modal-center h3");
const modalImgsEl = document.querySelectorAll(".modal-img");
const nextBtnEl = document.querySelector(".next-btn");
const prevBtnEl = document.querySelector(".prev-btn");
const modalImgContainerEl = document.querySelector(".modal-img-container");
let mainModalImgIndex = 0;
let startX, startY, endX, endY;
const minSwipeDistance = 30;

const handleSwipe = () => {
  const diffX = endX - startX;
  const diffY = endY - startY;
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
    if (diffX > 0) {
      mainModalImgIndex--;
    } else {
      mainModalImgIndex++;
    }
    setNewImg();
  }
};

modalImgContainerEl.addEventListener("mousedown", (e) => {
  startX = e.clientX;
  startY = e.clientY;
});

modalImgContainerEl.addEventListener("mousemove", (e) => {
  endX = e.clientX;
  endY = e.clientY;
});

modalImgContainerEl.addEventListener("mouseup", (e) => {
  endX = e.clientX;
  endY = e.clientY;
  handleSwipe();
});

modalImgContainerEl.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

modalImgContainerEl.addEventListener("touchmove", (e) => {
  endX = e.touches[0].clientX;
  endY = e.touches[0].clientY;
});

modalImgContainerEl.addEventListener("touchend", (e) => {
  handleSwipe();
});

nextBtnEl.addEventListener("click", () => {
  mainModalImgIndex++;
  setNewImg();
});

prevBtnEl.addEventListener("click", () => {
  mainModalImgIndex--;
  setNewImg();
});

galleryImgsEL.forEach((el) => {
  el.addEventListener("click", (e) => {
    switchMainModalImg(e.target, (disableFade = true));
    toggleModal({ show: true });
  });
});

modalImgsEl.forEach((el) => {
  el.addEventListener("click", (e) => {
    switchMainModalImg(e.target);
    setTimeout(() => {
      scrollToWithOffset(modalImgContainerEl);
    }, 300);
  });
});

modalEl.addEventListener("click", (e) => {
  const closeModal =
    e.target.classList.contains("modal-container") ||
    e.target.classList.contains("modal-center") ||
    e.target.classList.contains("close-btn");
  if (closeModal) {
    toggleModal({ show: false });
  }
});

function switchMainModalImg(newEl, disableFade) {
  if (!disableFade) {
    fadeImg(modalMainImgEl);
  }
  modalMainImgEl.src = newEl.src;
  modalMainImgEl.alt = newEl.alt;
  modalImgTitleEl.textContent = newEl.alt;
  mainModalImgIndex = newEl.dataset.imgIndex - 1;
  modalImgsEl.forEach((el, index) => {
    if (index === mainModalImgIndex) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}

function toggleModal({ show }) {
  if (show) {
    modalEl.classList.add("show");
    document.body.classList.add("overflow-hidden");
  } else {
    modalEl.classList.remove("show");
    document.body.classList.remove("overflow-hidden");
  }
}

function setNewImg() {
  if (mainModalImgIndex > modalImgsEl.length - 1) {
    mainModalImgIndex = 0;
  }
  if (mainModalImgIndex < 0) {
    mainModalImgIndex = modalImgsEl.length - 1;
  }
  const newImg = document.querySelector(
    `.modal-images-container [data-img-index="${mainModalImgIndex + 1}"]`
  );
  switchMainModalImg(newImg);
}

function scrollToWithOffset(element) {
  const offset = 15;
  const elementPosition = element.getBoundingClientRect().top;

  modalEl.scrollTop = elementPosition + modalEl.scrollTop - offset;
}

function fadeImg(img) {
  img.style.opacity = 0;
  setTimeout(() => {
    img.style.opacity = 1;
  }, 500);
}
