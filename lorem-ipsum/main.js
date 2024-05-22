import text from "./data.js";

const paragraphsInputEl = document.getElementById("paragraphs");
const formEl = document.querySelector(".form");
const textContainerEl = document.querySelector(".text-container");
const submitBtnEl = document.querySelector(".form button");

window.addEventListener("DOMContentLoaded", () => {
  paragraphsInputEl.max = text.length;
  paragraphsInputEl.placeholder = text.length;
});

paragraphsInputEl.addEventListener("change", (e) => {
  const value = e.target.value;
  if (value) {
    submitBtnEl.disabled = false;
  }
});

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = paragraphsInputEl.value;
  if (value) {
    // const textToAdd = text
    //   .slice(0, value)
    //   .map((item, index) => {
    //     return `<p>${index + 1}. ${item}</p>`;
    //   })
    //   .join("");
    // textContainerEl.innerHTML = textToAdd;

    const textToAdd = text.slice(0, value);
    textContainerEl.replaceChildren();
    textToAdd.forEach((item, index) => {
      const p = document.createElement("p");
      p.textContent = `${index + 1}. ${item}`;
      textContainerEl.appendChild(p);
    });

    textContainerEl.scrollIntoView();
  }
});
