import "../scss/style.scss";
import burger from "./files/burger.js";
import burgerAddList from "./files/burgerAddList.js";
import buttonsNote from "./files/buttonsNote.js";
import formSearchToggle from "./files/formSearchToggle.js";
import inputmask from "./files/inputmask.js";
import sliders from "./files/sliders.js";
import spoller from "./files/spoller.js";
import tab from "./files/tab.js";

document.addEventListener("DOMContentLoaded", () => {
  spoller();
  formSearchToggle();
  burgerAddList();
  burger();
  sliders();
  tab();
  inputmask();
  buttonsNote();

  Fancybox.bind("[data-fancybox]", { closeButton: false });
  // Fancybox.show([{ src: "#modal-feedback", type: "inline" }], {
  //   closeButton: false,
  // });
});
