import { countLines } from "./helpFunctions.js";

export default function cardCaseMore() {
  const cards = document.querySelectorAll(".card-case");

  if (cards.length) {
    cards.forEach((card) => {
      const btnMore = card.querySelector(".card-case__btn-more");
      const btnMoreText = btnMore.querySelector("span");
      const content = card.querySelector(".card-case__content");
      const lines = countLines(content)
      
      if (lines > 6) {
        content.classList.add("_hide");
      } else {
        btnMore.remove();
      }

      btnMore.addEventListener("click", () => {
        if (content.classList.contains("_hide")) {
          btnMore.classList.add("_active");
          content.classList.remove("_hide");
          btnMoreText.textContent = "Свернуть";
        } else {
          btnMore.classList.remove("_active");
          content.classList.add("_hide");
          btnMoreText.textContent = "Подробнее";
        }
      });
    });
  }
}
