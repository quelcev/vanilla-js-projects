const magnifierIconEl = getEl(".magnifier-icon");

magnifierIconEl.addEventListener("click", () => {
  const searchBarContainerEl = getEl(".search-bar-container");
  searchBarContainerEl.classList.toggle("active");
});

function getEl(selector) {
  return document.querySelector(selector);
}
function getEls(selector) {
  return document.querySelectorAll(selector);
}
