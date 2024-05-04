const switchBtnEl = document.querySelector(".switch-btn");
const switchEl = document.querySelector(".switch");
const videoEl = document.querySelector("video");

switchBtnEl.addEventListener("click", () => {
  if (!videoEl.paused) {
    videoEl.pause();
    switchEl.classList.add("paused");
  } else {
    videoEl.play();
    switchEl.classList.remove("paused");
  }
});
