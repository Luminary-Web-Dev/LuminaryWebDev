
/* ================= CAROUSEL SECTION ================= */

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

// ================= Reservation Page =================

const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");

const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");

nextBtn.addEventListener("click", () => {

  const party = document.getElementById("partySizeSelect").value;
  const date = document.getElementById("dateSelect").value;
  const time = document.getElementById("timeSelect").value;
  const occasion = document.getElementById("occasionSelect").value;

  if (!party || !date || !time) {
    alert("Please complete all required fields.");
    return;
  }

  // Fill hidden Netlify fields
  document.getElementById("finalPartySize").value = party;
  document.getElementById("finalDate").value = date;
  document.getElementById("finalTime").value = time;
  document.getElementById("finalOccasion").value = occasion;

  step1.classList.remove("active");
  step2.classList.add("active");
});

backBtn.addEventListener("click", () => {
  step2.classList.remove("active");
  step1.classList.add("active");
});