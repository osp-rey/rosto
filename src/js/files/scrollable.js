class Scrollable {
  constructor(selector, options) {
    let defaultOptions = {
      wheelScrolling: false,
    };

    this.container = null;

    if (typeof selector === "string") {
      this.container = document.querySelector(selector);
    } else {
      this.container = selector;
    }
    this.options = Object.assign(defaultOptions, options);

    if (!this.container) {
      return;
    }

    this.container.classList.add("_scrollable");

    this.container.style = "cursor: grab";

    this.isDragging = false;
    this.startX = null;
    this.scrollLeft = null;

    this.events();
  }

  events() {
    if (this.container) {
      this.container.addEventListener("mousedown", (e) => {
        this.isDragging = true;

        this.startX = e.pageX - this.container.offsetLeft;
        this.scrollLeft = this.container.scrollLeft;
        this.container.classList.add("_pressed");

        this.container.style = "cursor: grabbing";
      });

      this.container.addEventListener("mouseup", (e) => {
        this.isDragging = false;

        this.container.classList.remove("_pressed");

        this.container.style = "cursor: grab";
      });

      this.container.addEventListener("mousemove", (e) => {
        if (!this.isDragging) return;

        const x = e.pageX - this.container.offsetLeft;
        const walkX = (x - this.startX) * 1;
        this.container.scrollLeft = this.scrollLeft - walkX;
      });

      this.container.addEventListener("mouseleave", (e) => {
        if (this.isDragging) {
          this.isDragging = false;
        }
        this.container.style = "cursor: grab";
      });

      if (this.options.wheelScrolling) {
        this.container.addEventListener("mousewheel", (e) => {
          e.preventDefault();
          this.container.scrollLeft += e.deltaY;
        });
      }
    }
  }
}

export default function scrollable() {
  new Scrollable(".s-comparison__table", {});
}
