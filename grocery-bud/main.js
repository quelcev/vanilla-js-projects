const formEl = document.querySelector(".form");
const groceryInputEl = document.querySelector(".grocery-input");
const groceryListContainerEl = document.querySelector(
  ".grocery-list-container"
);
const clearBtnEl = document.querySelector(".clear-btn");
const formAlertEl = document.querySelector(".form-alert");
const submitBtnEl = document.querySelector(".submit-btn");
let alertTimeout = null;
let isEditing = false;
let isEditingItemId = null;
let groceryList = JSON.parse(localStorage.getItem("grocery-list")) ?? [];

window.addEventListener("DOMContentLoaded", () =>
  groceryList.forEach((item) => addItem(item))
);

groceryListContainerEl.addEventListener("click", (e) => {
  const isDelete = e.target.classList.contains("delete-btn");
  const isEdit = e.target.classList.contains("edit-btn");
  if (isDelete) {
    const groceryItemEl = e.target.closest(".grocery-item");
    const id = groceryItemEl.dataset.itemId;
    groceryList = groceryList.filter((item) => item.id !== id);
    addToLocalStorage();
    groceryItemEl.remove();
    toggleAlert({ alertClass: "danger", text: "Item removed" });
    if (groceryListContainerEl.childNodes.length === 0) {
      clearBtnEl.classList.remove("show");
    }
  }
  if (isEdit) {
    const groceryItemEls = document.querySelectorAll(".grocery-item");
    const groceryItemEl = e.target.closest(".grocery-item");
    const itemValue = groceryItemEl.querySelector("p").textContent;
    const id = groceryItemEl.dataset.itemId;
    groceryItemEls.forEach((item) => item.classList.remove("editing"));
    groceryItemEl.classList.add("editing");
    groceryInputEl.value = itemValue;
    groceryInputEl.focus();
    isEditing = true;
    toggleIsEditing(true, id, "Update");
  }
});

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputVal = groceryInputEl.value;
  if (!inputVal) return;
  if (!isEditing) {
    const groceryItem = {
      id: generateUniqueId(),
      value: inputVal,
    };
    groceryList.push(groceryItem);
    addToLocalStorage();
    addItem(groceryItem);
    toggleAlert({ alertClass: "success", text: "Item added to the list" });
  } else {
    const groceryItemEl = document.querySelector(
      `[data-item-id="${isEditingItemId}"]`
    );
    const editingItemEl = groceryItemEl.querySelector("p");
    editingItemEl.textContent = inputVal;
    groceryItemEl.classList.remove("editing");
    groceryList = groceryList.map((item) => {
      if (item.id === isEditingItemId) {
        return { ...item, value: inputVal };
      }
      return item;
    });
    addToLocalStorage();
    toggleIsEditing(false, null, "Submit");
    toggleAlert({ alertClass: "success", text: "Item updated" });
  }
  groceryInputEl.value = "";
});

function addToLocalStorage() {
  localStorage.setItem("grocery-list", JSON.stringify(groceryList));
}

function removeToLocalStorage() {
  localStorage.removeItem("grocery-list");
}

function toggleIsEditing(editing, id, text) {
  isEditing = editing;
  isEditingItemId = id;
  submitBtnEl.textContent = text;
}

clearBtnEl.addEventListener("click", () => {
  groceryListContainerEl.replaceChildren();
  clearBtnEl.classList.remove("show");
  toggleAlert({ alertClass: "danger", text: "Empty list" });
  removeToLocalStorage();
});

function toggleAlert({ alertClass, text }) {
  clearTimeout(alertTimeout);
  formAlertEl.className = `form-alert show ${alertClass}`;
  formAlertEl.textContent = text;
  alertTimeout = setTimeout(() => {
    formAlertEl.className = "form-alert";
    formAlertEl.textContent = "";
  }, 2000);
}

function addItem(groceryItem) {
  const { id, value } = groceryItem;
  const li = document.createElement("li");
  const p = document.createElement("p");
  p.textContent = value;
  li.dataset.itemId = id;
  li.className = "grocery-item";
  li.innerHTML = `
    <div class="btn-container">
      <button class="edit-btn"><i class="fas fa-edit"></i></button>
      <button class="delete-btn"><i class="fas fa-trash"></i></button>
    </div>
  `;
  li.prepend(p);
  groceryListContainerEl.appendChild(li);
  clearBtnEl.classList.add("show");
}

function generateUniqueId() {
  return "id-" + crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
}
