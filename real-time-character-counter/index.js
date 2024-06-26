const textareaEl = document.querySelector(".textarea");
const maxLength = textareaEl.getAttribute("maxlength");
const totalCharactersEl = document.querySelector(".total-characters");
const remainingCharactersEl = document.querySelector(".remaining-characters");

setTotalAndRemaining(0, maxLength);

textareaEl.addEventListener("focus", () => setMaxLength(textareaEl));
textareaEl.addEventListener("input", () => {
  const value = textareaEl.value.length;
  setMaxLength(textareaEl);
  setTotalAndRemaining(value, maxLength - value);
});

function setTotalAndRemaining(total, remaining) {
  totalCharactersEl.innerText = total;
  remainingCharactersEl.innerText = remaining;
}
function setMaxLength(el) {
  el.setAttribute("maxlength", maxLength);
}
