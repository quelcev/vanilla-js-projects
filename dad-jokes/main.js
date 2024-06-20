const generateBtnEl = document.querySelector(".generate-btn");
const resultEl = document.querySelector(".result");

window.addEventListener("DOMContentLoaded", fetchJoke);
generateBtnEl.addEventListener("click", fetchJoke);

async function fetchJoke() {
  try {
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "text/plain",
      },
    });
    const jokeText = await response.text();
    resultEl.textContent = jokeText;
  } catch (error) {
    console.log(error);
  }
}
