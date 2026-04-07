import "../scss/style.scss";
import burger from "./files/burger.js";
import burgerAddList from "./files/burgerAddList.js";
import formSearchToggle from "./files/formSearchToggle.js";
import spoller from "./files/spoller.js";

document.addEventListener("DOMContentLoaded", () => {
  spoller();
  formSearchToggle();
  burgerAddList();
  burger();
});
