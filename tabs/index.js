const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const btn = e.currentTarget;
    const id = btn.dataset.id;
    const tabContent = document.querySelector(
      `[data-target-id="${id}-content"]`
    );

    hideItems(tabBtns);
    hideItems(tabContents);

    showItem(btn);
    showItem(tabContent);
  });
});

function showItem(item) {
  item.classList.add("active");
}
function hideItems(items) {
  items.forEach((item) => item.classList.remove("active"));
}
