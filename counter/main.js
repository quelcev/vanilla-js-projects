const btnsContainerEl = document.querySelector(".btns-container");
const countEl = document.querySelector(".count");
const increaseBtnEl = document.querySelector(".increase");
const decreaseBtnEl = document.querySelector(".decrease");
const resetBtnEl = document.querySelector(".reset");
let count = 0;
let counterInterval = null;
let counterTimeout = null;

updateCount(count);

increaseBtnEl.addEventListener("click", () => updateCount((count += 1)));
decreaseBtnEl.addEventListener("click", () => updateCount((count -= 1)));
resetBtnEl.addEventListener("click", () => updateCount((count = 0)));

increaseBtnEl.addEventListener("mousedown", () =>
  updateCountMouseHold("increase")
);
decreaseBtnEl.addEventListener("mousedown", () =>
  updateCountMouseHold("decrease")
);

[increaseBtnEl, decreaseBtnEl].forEach((el) => {
  el.addEventListener("mouseup", resetCounterTimer);
  el.addEventListener("mouseleave", resetCounterTimer);
});

function resetCounterTimer() {
  clearInterval(counterInterval);
  clearTimeout(counterTimeout);
}

function updateCountMouseHold(operation) {
  resetCounterTimer();

  counterTimeout = setTimeout(() => {
    counterInterval = setInterval(() => {
      if (operation === "increase") {
        updateCount((count += 1));
      } else {
        updateCount((count -= 1));
      }
    }, 100);
  }, 500);
}

function updateCount(newCount) {
  countEl.textContent = newCount;
}
