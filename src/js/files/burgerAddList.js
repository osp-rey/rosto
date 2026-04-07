import { createEl, slideDown, slideUp } from "./helpFunctions.js";

export default function burgerAddList() {
  const spollers = document.querySelectorAll(
    ".burger__add-list .menu-item-has-children",
  );

  if (spollers.length) {
    spollers.forEach((spoller) => {
      const btn = spoller.querySelector(".main-menu-link");
      const menu = spoller.querySelector(".sub-menu");

      const wrapperMenu = createEl("div", "wrapper-sub-menu");
      wrapperMenu.appendChild(menu);
      spoller.appendChild(wrapperMenu);
      slideUp(wrapperMenu);

      btn.addEventListener("click", (e) => {
        e.preventDefault();

        if (btn.classList.contains("_active")) {
          btn.classList.remove("_active");
          slideUp(wrapperMenu);
        } else {
          btn.classList.add("_active");
          slideDown(wrapperMenu);
        }
      });
    });
  }
}
