export default function decisionsGallery() {
  const galleries = document.querySelectorAll(".s-decisions__gallery");

  if (galleries.length) {
    galleries.forEach((gal) => {
      const img = gal.querySelector(".s-decisions__gallery-img");

      window.addEventListener("resize", handlerResize);
      handlerResize();

      function handlerResize() {
        if (window.matchMedia("(min-width: 1200px)").matches) {
          gal.style.height = img.clientHeight + "px";
        }
      }
    });
  }
}
