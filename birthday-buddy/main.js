import data from "./data.js";

const listEl = document.querySelector(".list");
const titleEl = document.querySelector(".title");
const clearAllBtnEl = document.querySelector(".clear-all-btn");
let people = data;

displayPeople();

clearAllBtnEl.addEventListener("click", () => {
  people = [];
  displayPeople();
});

listEl.addEventListener("click", (e) => {
  const isRemoveBtn = e.target.classList.contains("remove-btn");
  if (isRemoveBtn) {
    const id = parseInt(e.target.closest(".person-container").dataset.personId);
    people = people.filter((person) => person.id !== id);
    displayPeople();
  }
});

function updateTitle() {
  titleEl.textContent = `${people.length} Birthdays Today`;
}

function displayPeople() {
  if (people.length < 1) {
    clearAllBtnEl.remove();
  }

  updateTitle();

  listEl.innerHTML = people
    .map((person) => {
      const { age, id, image, name } = person;
      return `
      <article class="person-container" data-person-id="${id}">
        <img
          src="${image}"
          alt="${name}"
          class="person-img"
        />
        <div class="person-info">
          <h4>${name}</h4>
          <p>${age} years</p>
          <button class="remove-btn">Remove</button>
        </div>
      </article>
    `;
    })
    .join("");
}
