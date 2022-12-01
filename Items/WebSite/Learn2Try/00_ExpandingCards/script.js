const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    removeActiveClasses();
    card.classList.add("select");
  });
});

function removeActiveClasses() {
  cards.forEach((card) => {
    card.classList.remove("select");
  });
}
