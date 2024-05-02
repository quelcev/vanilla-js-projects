const singleRecipeApi = "https://dummyjson.com/recipes";
const recipeContainerEl = document.querySelector(".recipe-container");

window.addEventListener("DOMContentLoaded", async () => {
  const recipe = await fetchRecipe();
  displayRecipe(recipe);
});

async function fetchRecipe() {
  try {
    const recipeId = localStorage.getItem("recipeId");
    if (!recipeId) {
      document.location.href = "/recipes";
      return;
    }
    const response = await fetch(`${singleRecipeApi}/${recipeId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
function displayRecipe(recipe) {
  const {
    caloriesPerServing,
    cookTimeMinutes,
    image,
    ingredients,
    instructions,
    name,
    prepTimeMinutes,
    rating,
    servings,
  } = recipe;

  document.title = `${name} - Recipe`;
  recipeContainerEl.innerHTML = `
    <div class="img-container">
      <img src="${image}" alt="${name}" class="recipe-img" />
    </div>
    <div class="recipe-info">
      <h2 class="name">
        <span>${name}</span>
        <span class="rating"><strong>${rating}</strong><i class="fas fa-star"></i></span>
      </h2>
      <p class="ingredients"><strong>Ingredients:</strong></p>
      <ul class="ingredients-list">
        ${ingredients
          .map((ingredient) => {
            return `<li>${ingredient}</li>`;
          })
          .join("")}
      </ul>
      <p class="instructions"><strong>Instructions:</strong></p>
      <ul class="instructions-list">
      ${instructions
        .map((instruction) => {
          return `<li>${instruction}</li>`;
        })
        .join("")}
      </ul>
    <div class="more-info">
      <p class="prep-time">Prep time: ${prepTimeMinutes}mins<span></span></p>
      ${
        cookTimeMinutes > 0
          ? `<p class="cook-time">Cook time: ${cookTimeMinutes}mins<span></span></p>`
          : ""
      }
      <p class="servings">Servings: ${servings}<span></span></p>
      <p class="calories">Calories per serving: ${caloriesPerServing}<span></span></p>
    </div>
    </div>
  `;
}
