const numberEls = document.querySelectorAll(".number");

numberEls.forEach((el) => {
  const endNum = parseInt(el.dataset.endNum);
  const increment = Math.ceil(endNum / 500);
  let goalNum = 0;
  const intId = setInterval(() => {
    goalNum += increment;
    if (goalNum >= endNum) {
      el.textContent = `${goalNum}+`;
      clearInterval(intId);
      return;
    }
    console.log(234);
    el.textContent = goalNum;
  }, 1);
});
