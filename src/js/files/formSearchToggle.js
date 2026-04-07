export default function formSearchToggle() {
  const forms = document.querySelectorAll(".form-search");

  if (forms.length) {
    forms.forEach(form => {
      const btn = form.querySelector(".form-search-toggle");

      btn.addEventListener("click", (e) => {
        if (!form.classList.contains("_open")) {
          e.preventDefault();
          form.classList.add("_open")
        }
      })
    })
  }
}