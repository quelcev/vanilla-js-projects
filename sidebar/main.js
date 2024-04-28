const sidebarToggleEl = document.querySelector(".sidebar-toggle");
const sidebarOverlayEl = document.querySelector(".sidebar-overlay");

sidebarToggleEl.addEventListener("click", () =>
  sidebarOverlayEl.classList.add("show")
);
sidebarOverlayEl.addEventListener("click", (e) => {
  const isOverlay = e.target.classList.contains("sidebar-overlay");
  const isCloseBtn = e.target.classList.contains("close-btn");
  if (isOverlay || isCloseBtn) {
    sidebarOverlayEl.classList.remove("show");
  }
});
