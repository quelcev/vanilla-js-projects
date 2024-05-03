const recipesApi = "https://dummyjson.com/recipes";
const categoryBtnContainerEl = document.querySelector(
  ".category-btn-container"
);
const menuContainerEl = document.querySelector(".menu-container");
let recipes = [];

window.addEventListener("DOMContentLoaded", async () => {
  recipes = await fetchRecipes();
  const mealTypeArrays = recipes.map((recipe) => recipe.mealType);
  const mealType = ["all", ...new Set([].concat(...mealTypeArrays))];
  displayCategory(mealType);
  displayRecipes(recipes);
});
categoryBtnContainerEl.addEventListener("click", (e) => {
  const isBtn = e.target.classList.contains("category-btn");

  if (isBtn) {
    toggleActiveBtn(e.target);

    const cat = e.target.dataset.cat;
    let newRecipes = [];
    if (cat === "all") {
      newRecipes = recipes;
    } else {
      newRecipes = recipes.filter((recipe) => {
        const mealTypes = recipe.mealType.map((item) => item.toLowerCase());
        if (mealTypes.includes(cat)) {
          return mealTypes;
        }
      });
    }
    displayRecipes(newRecipes);
  }
});

function toggleActiveBtn(activeBtn) {
  [...categoryBtnContainerEl.children].forEach((item) =>
    item.classList.remove("active")
  );
  activeBtn.classList.add("active");
}
function displayIngredients(ingredients) {
  return `
    <ul class="ingredients">
      ${ingredients
        .map((ingredient, index) => {
          if (index > 2) return;
          return `<li>${ingredient}</li>`;
        })
        .join("")}
      ...
    </ul>
  `;
}
function displayRecipes(recipes) {
  menuContainerEl.innerHTML = recipes
    .map((recipe) => {
      const { id, name, image, rating, ingredients } = recipe;
      return `
        <article class="menu-item">
          <div class="img-container">
            <img src="${image}" alt="${name}" />
          </div>
          <div class="info">
            <div class="name__rating">
              <p class="name"><strong>${name}</strong></p>
              <p class="rating"><strong>${rating}</strong><i class="fas fa-star"></i></p>
            </div>
            <div class="ingredients__read-more">
              ${displayIngredients(ingredients)}
              <a href="recipe.html" class="read-more" data-id="${id}">Read More</a>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  const menuItemEls = document.querySelectorAll(".menu-item");
  toggleTransitionClass();
  window.addEventListener("scroll", throttle(toggleTransitionClass, 100));

  function toggleTransitionClass() {
    menuItemEls.forEach((el) => {
      if (window.scrollY > el.offsetTop - 600) {
        el.classList.add("transition");
      } else {
        el.classList.remove("transition");
      }
    });
  }

  const readMoreEls = document.querySelectorAll(".read-more");
  readMoreEls.forEach((el) => {
    el.addEventListener("click", (e) => {
      const id = e.currentTarget.dataset.id;
      localStorage.setItem("recipeId", id);
    });
  });
}
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

function throttle(goal_func, wait_ms) {
  // fires goal_func but only if wait_ms has elapsed, otherwise does nothing.
  var time = Date.now();
  return function () {
    if (time + wait_ms - Date.now() < 0) {
      goal_func();
      time = Date.now();
    }
  };
}
