const navToggleEl = document.querySelector(".nav-toggle");
const linksEl = document.querySelector(".links");
const navCenterEl = document.querySelector(".nav-center");
const linksIconEl = document.querySelector(".links-icon");

navToggleEl.addEventListener("click", () => {
  if (linksEl.offsetHeight < 1) {
    linksEl.style.height = `${linksEl.scrollHeight}px`;
    linksIconEl.style.height = `${linksIconEl.children[0].scrollHeight}px`;
    navCenterEl.classList.add("show-links");
  } else {
    linksEl.style.height = 0;
    linksIconEl.style.height = 0;
    navCenterEl.classList.remove("show-links");
  }
});
