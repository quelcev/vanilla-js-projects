const accordionBtnEls = document.querySelectorAll(".accordion-btn");
const accordionItemEls = document.querySelectorAll(".accordion-item");
const accordionContainerEl = document.querySelector(".accordion-container");

accordionBtnEls.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const showOneAccordion = accordionContainerEl.dataset.showOne;
    const accordionItemEl = e.currentTarget.closest(".accordion-item");
    const accordionContentEl =
      accordionItemEl.querySelector(".accordion-content");
    if (accordionItemEl.classList.contains("active")) {
      accordionContentEl.style.height = 0;
      accordionItemEl.classList.remove("active");
    } else {
      if (showOneAccordion === "true") {
        resetAccordion();
      }
      accordionContentEl.style.height = `${
        accordionContentEl.scrollHeight + 32
      }px`;
      accordionItemEl.classList.add("active");
    }
  });
});

function resetAccordion() {
  accordionItemEls.forEach((item) => {
    const accordionContentEl = item.querySelector(".accordion-content");
    accordionContentEl.style.height = 0;
    item.classList.remove("active");
  });
}
