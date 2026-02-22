document.addEventListener("DOMContentLoaded", function () {

  let currentSlide = 0;
  const slides = document.querySelectorAll(".carousel-slide");

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");
  }

  window.changeSlide = function (direction) {
    currentSlide += direction;

    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }

    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }

    showSlide(currentSlide);
  };

});