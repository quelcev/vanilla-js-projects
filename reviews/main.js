window.addEventListener("DOMContentLoaded", async () => {
  const reviews = await fetchReviews();
  const reviewEl = document.querySelector(".review");
  let reviewIndex = 0;
  let currentReview = reviews[reviewIndex];
  let prevReview = null;

  showReview();

  reviewEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("next-btn")) {
      updateReview((reviewIndex += 1));
    }
    if (e.target.classList.contains("prev-btn")) {
      updateReview((reviewIndex -= 1));
    }
    if (e.target.classList.contains("random-btn")) {
      let randomNumber = Math.floor(Math.random() * reviews.length);
      if (prevReview === randomNumber) {
        randomNumber += 1;
      }
      updateReview((reviewIndex = randomNumber));
    }
    showReview();
  });

  async function fetchReviews() {
    const response = await fetch("data.json");
    const jsonData = await response.json();
    return jsonData;
  }

  function updateReview(newReviewIndex) {
    if (newReviewIndex > reviews.length - 1) {
      reviewIndex = 0;
    }
    if (newReviewIndex < 0) {
      reviewIndex = reviews.length - 1;
    }
    currentReview = reviews[reviewIndex];
    prevReview = reviewIndex;
  }

  function showReview() {
    const { img, job, name, text } = currentReview;
    reviewEl.innerHTML = `
      <div class="img-container">
        <img src="${img}" alt="${name}" class="img" />
      </div>
      <h4 class="author">${name}</h4>
      <p class="job">${job}</p>
      <p class="info">${text}</p>

      <div class="btns-container">
        <div>
          <button class="prev-btn">
            <i class="fas fa-chevron-left"></i>
          </button>
          <button class="next-btn">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
        <button class="random-btn">Random</button>
      </div>
    `;
  }
});
