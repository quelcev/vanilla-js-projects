const sliderContainerEl = document.querySelector(".slider-container");
const slidesEl = document.querySelectorAll(".single-slide");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
let currentSlideIndex = 0;

window.addEventListener("DOMContentLoaded", () => {
  slidesEl.forEach((slide, index) => {
    slide.style.left = `${index * 100}%`;
  });
  triggerSlide();
});

nextBtn.addEventListener("click", () => {
  currentSlideIndex++;
  triggerSlide();
});

prevBtn.addEventListener("click", () => {
  currentSlideIndex--;
  triggerSlide();
});

function triggerSlide() {
  if (currentSlideIndex < slidesEl.length - 1) {
    nextBtn.style.display = "block";
  } else {
    nextBtn.style.display = "none";
  }

  if (currentSlideIndex < 1) {
    prevBtn.style.display = "none";
  } else {
    prevBtn.style.display = "block";
  }

  slidesEl.forEach((slide) => {
    slide.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
  });
}

let startX, startY, endX, endY;

function handleSwipe() {
  const deltaX = endX - startX;
  const deltaY = endY - startY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 0) {
      if (currentSlideIndex < 1) return;
      currentSlideIndex--;
      triggerSlide();
    } else {
      if (currentSlideIndex >= slidesEl.length - 1) return;
      currentSlideIndex++;
      triggerSlide();
    }
  }
}

// Mouse events
sliderContainerEl.addEventListener("mousedown", (e) => {
  startX = e.clientX;
  startY = e.clientY;

  const onMouseMove = (e) => {
    endX = e.clientX;
    endY = e.clientY;
  };

  const onMouseUp = (e) => {
    sliderContainerEl.removeEventListener("mousemove", onMouseMove);
    sliderContainerEl.removeEventListener("mouseup", onMouseUp);
    handleSwipe();
  };

  sliderContainerEl.addEventListener("mousemove", onMouseMove);
  sliderContainerEl.addEventListener("mouseup", onMouseUp);
});

// Touch events
sliderContainerEl.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  startX = touch.clientX;
  startY = touch.clientY;
});

sliderContainerEl.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];
  endX = touch.clientX;
  endY = touch.clientY;
});

sliderContainerEl.addEventListener("touchend", (e) => {
  handleSwipe();
});
