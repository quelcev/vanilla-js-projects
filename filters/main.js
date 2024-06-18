import products from "./products.js";

const productsContainerEl = document.querySelector(".products-container");
const companyFilterEl = document.querySelector(".company-filter ul");
const productSearchEl = document.querySelector("#product-search");
const companies = [
  "all",
  ...new Set(products.map((product) => product.company)),
];
let companiesEl = [];

productSearchEl.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query)
  );
  displayProducts(filteredProducts);
  resetCompanyFilter();
});

window.addEventListener("DOMContentLoaded", () => {
  displayProducts(products);

  companyFilterEl.innerHTML = companies
    .map((company) => {
      return `<li>
        <button class="${
          company === "all" ? "active" : ""
        } btn" data-company="${company}">${company}</button>
      </li>`;
    })
    .join("");
  companiesEl = companyFilterEl.querySelectorAll(".company-filter .btn");
});

companyFilterEl.addEventListener("click", (e) => {
  productSearchEl.value = "";
  const isBtn = e.target.classList.contains("btn");
  const filterBtns = document.querySelectorAll(".company-filter button");
  if (isBtn) {
    const filterCompany = e.target.dataset.company;
    const filteredProducts = products.filter(
      (product) => product.company === filterCompany
    );

    filterBtns.forEach((btn) => {
      if (btn.dataset.company === filterCompany) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    if (filterCompany === "all") {
      displayProducts(products);
    } else {
      displayProducts(filteredProducts);
    }
  }
});

function resetCompanyFilter() {
  companiesEl.forEach((el, i) => {
    if (i === 0) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}

function displayProducts(products) {
  productsContainerEl.innerHTML = products
    .map((product) => {
      const { company, title, image, price } = product;
      return `
        <article class="single-product">
          <img src="${image}" class="product-img" alt="${title}" />
          <div>
            <h5 class="product-name">${title}</h5>
            <span class="product-price">${formatter.format(price)}</span>
          </div>
        </article>
      `;
    })
    .join("");
}

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
