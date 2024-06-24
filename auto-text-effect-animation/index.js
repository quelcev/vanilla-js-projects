const containerEl = document.querySelector(".container");
const careers = ["Youtuber", "Web Developer", "Freelancer", "Instructor"];
let careerIndex = 0;
let characterIndex = 0;

updateText();

function updateText() {
  const aOrAn = careers[careerIndex].slice(0, 1) === "I" ? "an" : "a";
  containerEl.innerHTML = `
    <h1>I am ${aOrAn} ${careers[careerIndex].slice(0, characterIndex)}</h1>
  `;
  characterIndex++;
  if (characterIndex === careers[careerIndex].length + 1) {
    careerIndex++;
    characterIndex = 0;
  }
  if (careerIndex === careers.length) {
    careerIndex = 0;
  }
  setTimeout(updateText, 200);
}
