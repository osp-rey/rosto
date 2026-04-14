export default function sliders() {
  const heroSlider = document.querySelector(".s-hero__slider");

  if (heroSlider) {
    const swiper = new Swiper(heroSlider, {
      speed: 900,
      effect: "fade",
      navigation: {
        prevEl: ".s-hero .slider-arrow._prev",
        nextEl: ".s-hero .slider-arrow._next",
      },
      pagination: {
        el: ".s-hero .slider-pagination",
        clickable: true,
      },
    });
  }

  const tasksSlider = document.querySelector(".s-tasks__slider");

  if (tasksSlider) {
    const swiper = new Swiper(tasksSlider, {
      speed: 900,
      slidesPerView: 1,
      spaceBetween: 20,
      autoplay: {
        delay: 5000,
      },
      navigation: {
        prevEl: ".s-tasks .slider-arrow._prev",
        nextEl: ".s-tasks .slider-arrow._next",
      },
      pagination: {
        el: ".s-tasks .slider-pagination",
        clickable: true,
      },
      breakpoints: {
        1200: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      },
    });
  }
}
