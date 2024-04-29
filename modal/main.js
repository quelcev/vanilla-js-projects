const modalOverlayEl = document.querySelector(".modal-overlay");
const openModalEl = document.querySelector(".open-modal");

modalOverlayEl.addEventListener("click", (e) => {
  const isCloseBtn = e.target.classList.contains("close-btn");
  const isModalOverlay = e.target.classList.contains("modal-overlay");
  if (isCloseBtn || isModalOverlay) {
    modalOverlayEl.classList.remove("show");
  }
});
openModalEl.addEventListener("click", () =>
  modalOverlayEl.classList.add("show")
);
