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

  const sectNavSliders = document.querySelectorAll(".sect-nav");

  if (sectNavSliders.length) {
    sectNavSliders.forEach((nav) => {
      const swiper = new Swiper(nav, {
        speed: 900,
        slidesPerView: "auto",
        spaceBetween: 25,
        breakpoints: {
          992: {
            slidesPerView: "auto",
            spaceBetween: 50,
          },
          768: {
            slidesPerView: "auto",
            spaceBetween: 30,
          },
        },
      });
    });
  }

  const casesSliders = document.querySelectorAll(".s-cases__slider");

  if (casesSliders.length) {
    const arrows = Array.from(
      document.querySelectorAll(".s-cases .slider-arrows"),
    );

    casesSliders.forEach((slider, index) => {
      const swiper = new Swiper(slider, {
        speed: 900,
        slidesPerView: "auto",
        spaceBetween: 20,
        autoplay: {
          delay: 5500,
        },
        navigation: {
          prevEl: arrows[index].querySelector(".slider-arrow._prev"),
          nextEl: arrows[index].querySelector(".slider-arrow._next"),
        },
        pagination: {
          el: slider.nextElementSibling,
          clickable: true,
        },
        breakpoints: {
          1366: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        },
      });
    });
  }

  const partnersSlider = document.querySelector(".slider-partners");

  if (partnersSlider) {
    const swiper = new Swiper(partnersSlider, {
      slidesPerView: "auto",
      spaceBetween: 30,
      speed: 12000,
      watchOverflow: true,
      loop: true,
      allowTouchMove: false,
      watchSlidesProgress: true,
      centeredSlides: true,
      a11y: false,
      autoplay: {
        delay: 0,
      },
      breakpoints: {
        1200: {
          slidesPerView: "auto",
          spaceBetween: 65,
        },
        768: {
          slidesPerView: "auto",
          spaceBetween: 40,
        },
      },
    });
  }

  const blogSlider = document.querySelector(".s-blog__slider");

  if (blogSlider) {
    const swiper = new Swiper(blogSlider, {
      speed: 900,
      slidesPerView: "auto",
      spaceBetween: 20,
      autoplay: {
        delay: 5000,
      },
      navigation: {
        prevEl: ".s-blog .slider-arrow._prev",
        nextEl: ".s-blog .slider-arrow._next",
      },
      pagination: {
        el: ".s-blog .slider-pagination",
        clickable: true,
      },
    });
  }

  const tariffsSlider = document.querySelector(".s-tariffs__slider");

  if (tariffsSlider) {
    const swiper = new Swiper(tariffsSlider, {
      speed: 900,
      slidesPerView: "auto",
      spaceBetween: 20,
      autoplay: {
        delay: 5000,
      },
      navigation: {
        prevEl: ".s-tariffs .slider-arrow._prev",
        nextEl: ".s-tariffs .slider-arrow._next",
      },
      pagination: {
        el: ".s-tariffs .slider-pagination",
        clickable: true,
      },
      breakpoints: {
        1540: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
    });
  }

  const recSlider = document.querySelector(".s-rec__slider");

  if (recSlider) {
    const swiper = new Swiper(recSlider, {
      speed: 900,
      slidesPerView: "auto",
      spaceBetween: 20,
      autoplay: {
        delay: 5500,
      },
      navigation: {
        prevEl: ".s-rec .slider-arrow._prev",
        nextEl: ".s-rec .slider-arrow._next",
      },
      pagination: {
        el: ".s-rec .slider-pagination",
        clickable: true,
      },
      breakpoints: {
        1540: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      },
    });
  }

  const gallerySlider = document.querySelector(".s-gallery__slider");

  if (gallerySlider) {
    const swiper = new Swiper(gallerySlider, {
      speed: 900,
      slidesPerView: "auto",
      spaceBetween: 20,
      autoplay: {
        delay: 5500,
      },
      navigation: {
        prevEl: ".s-gallery .slider-arrow._prev",
        nextEl: ".s-gallery .slider-arrow._next",
      },
      pagination: {
        el: ".s-gallery .slider-pagination",
        clickable: true,
      },
    });
  }

  const previewSlider = document.querySelector(".s-preview__slider");

  if (previewSlider) {
    const swiper = new Swiper(previewSlider, {
      speed: 900,
      slidesPerView: "auto",
      spaceBetween: 20,
      autoplay: {
        delay: 5000,
      },
      navigation: {
        prevEl: ".s-preview .slider-arrow._prev",
        nextEl: ".s-preview .slider-arrow._next",
      },
      pagination: {
        el: ".s-preview .slider-pagination",
        clickable: true,
      },
      breakpoints: {
        992: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
    });
  }

  const teamSlider = document.querySelector(".s-team__slider");

  if (teamSlider) {
    const swiper = new Swiper(teamSlider, {
      speed: 900,
      slidesPerView: 1,
      spaceBetween: 20,
      autoplay: {
        delay: 5500,
      },
      navigation: {
        prevEl: ".s-team .slider-arrow._prev",
        nextEl: ".s-team .slider-arrow._next",
      },
      scrollbar: {
        el: ".s-team .slider-scrollbar",
        draggable: true,
      },
      breakpoints: {
        1365: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      },
    });
  }
}
