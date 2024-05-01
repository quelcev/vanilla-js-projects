const recipesApi = "https://dummyjson.com/recipes";
const categoryBtnContainerEl = document.querySelector(
  ".category-btn-container"
);

window.addEventListener("DOMContentLoaded", async () => {
  const recipes = await fetchRecipes();
  const mealTypeArrays = recipes.map((recipe) => recipe.mealType);
  const mealType = ["all", ...new Set([].concat(...mealTypeArrays))];
  displayCategory(mealType);
});

async function fetchRecipes() {
  try {
    const response = await fetch(recipesApi);
    const { recipes } = await response.json();
    return recipes;
  } catch (error) {
    console.log(error);
  }
}
function displayCategory(mealType) {
  categoryBtnContainerEl.innerHTML = mealType
    .map((cat) => {
      return `
        <button 
          class="${cat === "all" ? "category-btn active" : "category-btn"}" 
          data-cat="${cat.toLowerCase()}">${cat}
        </button>
      `;
    })
    .join("");
}

let isMouseDown = false;
let startX;
let scrollLeft;
categoryBtnContainerEl.addEventListener("mousedown", (e) => {
  isMouseDown = true;
  startX = e.pageX - categoryBtnContainerEl.offsetLeft;
  scrollLeft = categoryBtnContainerEl.scrollLeft;
});
categoryBtnContainerEl.addEventListener("mouseleave", () => {
  isMouseDown = false;
});
categoryBtnContainerEl.addEventListener("mouseup", () => {
  isMouseDown = false;
});
categoryBtnContainerEl.addEventListener("mousemove", (e) => {
  if (!isMouseDown) return;
  e.preventDefault();
  const x = e.pageX - categoryBtnContainerEl.offsetLeft;
  const walk = (x - startX) * 1; // Adjust scroll speed
  categoryBtnContainerEl.scrollLeft = scrollLeft - walk;
});
