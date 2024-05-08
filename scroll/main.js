const navBtnEl = document.querySelector(".nav-btn");
const linksEl = document.querySelector(".nav .links");
const navEl = document.querySelector(".nav");
const heroCtaEl = document.querySelector(".hero-cta-container");
const scrollLinkEls = document.querySelectorAll(".scroll-link");
const dateEl = document.querySelector(".date");

dateEl.textContent = new Date().getFullYear();
if (location.hash.length > 0) {
  const target = document.querySelector(location.hash);
  let offset = navEl.offsetHeight - 0.5;
  if (window.matchMedia("(max-width: 639px)").matches) {
    offset = navEl.offsetHeight - 15;
  }
  const bodyRect = document.body.getBoundingClientRect().top;
  const elementRect = target.getBoundingClientRect().top;
  const elementPosition = elementRect - bodyRect;
  const offsetPosition = elementPosition - offset;

  triggerScroll(offsetPosition);
}

scrollLinkEls.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    history.pushState(null, null, href);
    const isSticky = navEl.classList.contains("sticky");
    const isShowLinks = linksEl.classList.contains("show-links");
    const target = document.querySelector(href);
    let offset = navEl.offsetHeight - 0.5;
    if (isSticky && isShowLinks) {
      offset = navEl.offsetHeight - linksEl.offsetHeight;
    }
    if (!isSticky && isShowLinks) {
      offset = navEl.offsetHeight - 15;
    }
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = target.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    linksEl.style.height = 0;
    linksEl.classList.remove("show-links");

    triggerScroll(offsetPosition);
  });
});

function triggerScroll(offsetPosition) {
  setTimeout(() => {
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }, 100);
}

window.addEventListener(
  "scroll",
  throttle(() => {
    const top = window.pageYOffset || document.documentElement.scrollTop;
    if (top >= navEl.offsetHeight) {
      navEl.classList.add("sticky");
    } else {
      navEl.classList.remove("sticky");
    }
  }, 10)
);

navBtnEl.addEventListener("click", () => {
  if (linksEl.offsetHeight > 0) {
    linksEl.style.height = 0;
    linksEl.classList.remove("show-links");
  } else {
    linksEl.style.height = `${linksEl.scrollHeight}px`;
    linksEl.classList.add("show-links");
  }
});

function throttle(goal_func, wait_ms) {
  // fires goal_func but only if wait_ms has elapsed, otherwise does nothing.
  var time = Date.now();
  return function () {
    if (time + wait_ms - Date.now() < 0) {
      goal_func();
      time = Date.now();
    }
  };
}
