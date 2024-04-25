const toursApi = "https://www.course-api.com/react-tours-project";
let tours = [];
const yesToursEl = document.querySelector(".yes-tours");
const noToursEl = document.querySelector(".no-tours");
const showLessBtnEl = document.querySelector(".show-less-btn");
const readMoreBtnEl = document.querySelector(".read-more-btn");
const toursContainerEl = document.querySelector(".tours-container");
const refreshBtnEl = document.querySelector(".refresh-btn");
const loaderOverlayEl = document.querySelector(".loader-overlay");

window.addEventListener("DOMContentLoaded", async () => {
  await fetchTours();
  displayTours();
});
refreshBtnEl.addEventListener("click", async () => {
  await fetchTours();
  displayTours();
});

async function fetchTours() {
  loaderOverlayEl.className = "loader-overlay show-flex";
  try {
    const response = await fetch(toursApi);
    const toursData = await response.json();
    tours = toursData;
  } catch (error) {
    console.log(error);
  }
  loaderOverlayEl.className = "loader-overlay hide";
}

function displayTours() {
  toggleTitle();

  toursContainerEl.innerHTML = tours
    .map((tour) => {
      const { id, image, info, name, price } = tour;
      return `
        <article class="single-tour" data-tour-id="${id}">
          <div class="img-container">
            <img
              src="${image}"
              alt="${name}"
            />
            <span>${formatter.format(price.replace(",", ""))}</span>
          </div>
          <div class="info">
            <h5>${name}</h5>
            <p class="desc limit">${info}</p>
            <div class="toggle-btn-container read-more">
              <button class="show-less-btn hide">Show Less</button>
              <button class="read-more-btn">Read More</button>
            </div>
            <button class="not-interested-btn">Not Interested</button>
          </div>
        </article>
      `;
    })
    .join("");

  const notInterestedBtns = document.querySelectorAll(".not-interested-btn");
  notInterestedBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.closest(".single-tour").dataset.tourId;
      tours = tours.filter((tour) => tour.id !== id);
      displayTours();
    });
  });

  const readMoreBtns = document.querySelectorAll(".read-more-btn");
  readMoreBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      toggleShowText({ btn, btnToShow: "show-less" });
      equalHeight();
    });
  });

  const showLessBtns = document.querySelectorAll(".show-less-btn");
  showLessBtns.forEach((btn) => {
    btn.addEventListener("click", () =>
      toggleShowText({ btn, btnToShow: "read-more" })
    );
  });

  equalHeight();
  const throttleEqualHeight = throttle(equalHeight, 500);
  window.addEventListener("resize", throttleEqualHeight);

  function equalHeight() {
    const descTextEls = document.querySelectorAll(".info > p.desc:not(.limit)");
    const titleEls = document.querySelectorAll(".info > h5");

    resetEqualHeight();

    setTimeout(() => {
      if (window.matchMedia("(max-width: 600px)").matches) {
        resetEqualHeight();
      } else {
        descTextEls.forEach(
          (el) => (el.style.minHeight = `${getHighestVal(descTextEls)}px`)
        );
        titleEls.forEach(
          (el) => (el.style.minHeight = `${getHighestVal(titleEls)}px`)
        );
      }
    }, 500);

    function resetEqualHeight() {
      descTextEls.forEach((el) => (el.style.minHeight = 0));
      titleEls.forEach((el) => (el.style.minHeight = 0));
    }
  }
}

function throttle(func, delay) {
  let timeoutId;
  let lastExecTime = 0;

  return function (...args) {
    const currentTime = Date.now();
    const timeSinceLastExec = currentTime - lastExecTime;

    if (!lastExecTime || timeSinceLastExec >= delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastExecTime = currentTime;
      }, delay - timeSinceLastExec);
    }
  };
}

function getHighestVal(items) {
  return Math.max(...[...items].map((el) => el.offsetHeight));
}

function toggleShowText({ btn, btnToShow }) {
  const tourTextEl = btn.closest(".info").querySelector(".desc");
  const toggleBtnContainerEl = btn.closest(".toggle-btn-container");
  toggleBtnContainerEl.className = `toggle-btn-container ${btnToShow}`;
  tourTextEl.classList.toggle("limit");
}

function toggleTitle() {
  if (tours.length > 0) {
    yesToursEl.className = "yes-tours show";
    noToursEl.className = "no-tours hide";
  } else {
    yesToursEl.className = "yes-tours hide";
    noToursEl.className = "no-tours show";
  }
}

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});
