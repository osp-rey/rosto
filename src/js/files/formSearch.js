export default function formSearch() {
  const forms = document.querySelectorAll(".form-search");

  if (forms.length) {
    document.addEventListener("click", () => {
      const currentForms = document.querySelectorAll(".form-search._open");

      if (currentForms.length) {
        currentForms.forEach((f) => f.classList.remove("_open"));
      }
    });

    forms.forEach((form) => {
      const toggle = form.querySelector(".form-search__toggle");

      if (toggle) {
        form.addEventListener("click", (e) => e.stopPropagation());
  
        toggle.addEventListener("click", () => {
          form.classList.toggle("_open");
        });
      }
    });
  }
}
