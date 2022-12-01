const prev = document.getElementById("prev");
const next = document.getElementById("next");
const progress = document.getElementById("progress");
const circles = document.querySelectorAll(".circle");

let cnt = 1;

next.addEventListener("click", () => {
  ++cnt;
  if (cnt > circles.length) cnt = circles.length;
  update();
});
prev.addEventListener("click", () => {
  --cnt;
  if (cnt < 1) cnt = 1;
  update();
});

function update() {
  circles.forEach((circle, idx) => {
    if (idx < cnt) circle.classList.add("active");
    else circle.classList.remove("active");
  });

  const actives = document.querySelectorAll(".active");
  progress.style.width =
    ((actives.length - 1) / (circles.length - 1)) * 100 + "%";

  if (cnt === 1) prev.disabled = true;
  else if (cnt === circles.length) finished();
  else {
    prev.disabled = false;
    next.disabled = false;
  }
  //   console.log(cnt);
}

function finished() {
  next.disabled = true;
  // 提交按钮
}
