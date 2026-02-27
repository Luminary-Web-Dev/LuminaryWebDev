/* =====================================================
   CAROUSEL SECTION
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

  const slides = document.querySelectorAll(".carousel-slide");

  if (slides.length > 0) {

    let currentSlide = 0;

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

  }

});


/* =====================================================
   RESERVATION PAGE LOGIC
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

  const nextBtn = document.getElementById("nextBtn");
  const backBtn = document.getElementById("backBtn");
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");
  const reservationForm = document.getElementById("reservationForm");

  /* ---------- STEP SWITCHING ---------- */

  if (nextBtn && backBtn && step1 && step2) {

    nextBtn.addEventListener("click", () => {

      const party = document.getElementById("partySizeSelect").value;
      const date = document.getElementById("dateSelect").value;
      const time = document.getElementById("timeSelect").value;
      const occasion = document.getElementById("occasionSelect").value;

      if (!party || !date || !time) {
        alert("Please complete all required fields.");
        return;
      }

      // Copy values into hidden fields (for Netlify)
      document.getElementById("partySizeHidden").value = party;
      document.getElementById("dateHidden").value = date;
      document.getElementById("timeHidden").value = time;
      document.getElementById("occasionHidden").value = occasion;

      // Save to localStorage (for confirmation page)
      localStorage.setItem("partySize", party);
      localStorage.setItem("date", date);
      localStorage.setItem("time", time);
      localStorage.setItem("occasion", occasion);

      step1.classList.remove("active");
      step2.classList.add("active");
    });

    backBtn.addEventListener("click", () => {
      step2.classList.remove("active");
      step1.classList.add("active");
    });

  }

  /* ---------- SAVE & SUBMIT ---------- */

  if (reservationForm) {
    reservationForm.addEventListener("submit", function (e) {

      e.preventDefault(); // stop default Netlify redirect

      const formData = new FormData(reservationForm);

      // Save email for confirmation page
      const emailInput = reservationForm.querySelector('input[name="email"]');
      if (emailInput) {
        localStorage.setItem("email", emailInput.value);
      }

      fetch("/", {
        method: "POST",
        body: formData
      })
      .then(() => {
        window.location.href = "/confirmation.html";
      })
      .catch((error) => {
        alert("There was a problem submitting the form.");
        console.error(error);
      });

    });
  }

}); // ← properly closes reservation DOMContentLoaded


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });
  }

});


/* =====================================================
   CONFIRMATION PAGE
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

  const confirmParty = document.getElementById("confirmPartySize");

  if (confirmParty) {

    const partySize = localStorage.getItem("partySize");
    const date = localStorage.getItem("date");
    const time = localStorage.getItem("time");
    const occasion = localStorage.getItem("occasion");
    const email = localStorage.getItem("email");

    if (partySize) {
      confirmParty.textContent = partySize;
    }

    if (date && time) {
      const dateTimeElement = document.getElementById("confirmDateTime");
      if (dateTimeElement) {
        dateTimeElement.textContent = date + " – " + time;
      }
    }

    const occasionElement = document.getElementById("confirmOccasion");
    if (occasion && occasionElement) {
      occasionElement.textContent = occasion;
    }

    const emailElement = document.getElementById("confirmEmail");
    if (email && emailElement) {
      emailElement.textContent = email;
    }
  }

  

/* ================= CMS LOADER ================= */

document.addEventListener("DOMContentLoaded", function () {

  const page = window.location.pathname;

  // ================= HOMEPAGE =================
  if (page.includes("index.html") || page === "/") {

    fetch("content/homepage.json")
      .then(res => res.json())
      .then(data => {

        if (document.getElementById("heroTitle")) {
          document.getElementById("heroTitle").textContent = data.hero.title;
          document.getElementById("heroDescription").textContent = data.hero.description;
        }

      })
      .catch(err => console.error("Homepage CMS error:", err));
  }









  // ================= ABOUT =================
  if (page.includes("about.html")) {

    fetch("content/about.json")
      .then(res => res.json())
      .then(data => {

        if (document.getElementById("aboutHeroTitle")) {
          document.getElementById("aboutHeroTitle").textContent = data.hero.title;
        }

      })
      .catch(err => console.error("About CMS error:", err));
  }

  // ================= EVENTS =================
  if (page.includes("events.html")) {

    fetch("content/events.json")
      .then(res => res.json())
      .then(data => {

        if (document.getElementById("eventsHeroTitle")) {
          document.getElementById("eventsHeroTitle").textContent = data.hero.title;
        }

      })
      .catch(err => console.error("Events CMS error:", err));
  }

  // ================= MENU =================
  if (page.includes("menu.html")) {

    fetch("content/menu.json")
      .then(res => res.json())
      .then(data => {

        const container = document.getElementById("menuContainer");
        if (!container) return;

        container.innerHTML = "";

        data.categories.forEach(category => {

          const section = document.createElement("div");

          section.innerHTML = `<h2>${category.name}</h2>`;

          category.items.forEach(item => {
            section.innerHTML += `
              <div class="menu-item">
                <h3>${item.name} / ${item.price}</h3>
                <p>${item.description}</p>
              </div>
            `;
          });

          container.appendChild(section);
        });

      })
      .catch(err => console.error("Menu CMS error:", err));
  }

});




});