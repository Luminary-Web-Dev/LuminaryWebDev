/* =====================================================
   CAROUSEL SECTION
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

  const slides = document.querySelectorAll(".carousel-slide");
  const dotsContainer = document.getElementById("carouselDots");

  if (!slides.length || !dotsContainer) return;

  let currentSlide = 0;

  // Create dots safely
  slides.forEach((_, index) => {
    const dot = document.createElement("span");

    dot.addEventListener("click", () => {
      currentSlide = index;
      showSlide(currentSlide);
    });

    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll("span");

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");
  }

  window.changeSlide = function (direction) {
    currentSlide += direction;

    if (currentSlide < 0) currentSlide = slides.length - 1;
    if (currentSlide >= slides.length) currentSlide = 0;

    showSlide(currentSlide);
  };

  showSlide(currentSlide);
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

      document.getElementById("partySizeHidden").value = party;
      document.getElementById("dateHidden").value = date;
      document.getElementById("timeHidden").value = time;
      document.getElementById("occasionHidden").value = occasion;

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

  if (reservationForm) {
    reservationForm.addEventListener("submit", function (e) {

      e.preventDefault();

      const formData = new FormData(reservationForm);

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
});


/* =====================================================
   MOBILE NAVIGATION (RESTORED FULL VERSION)
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (!hamburger || !navLinks) return;

  // Toggle nav
  hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("open");
    document.body.classList.toggle("nav-open");
  });

  // Close nav when clicking any link
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("open");
      document.body.classList.remove("nav-open");
    });
  });

});


/* =====================================================
   CONFIRMATION PAGE
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

  const confirmParty = document.getElementById("confirmPartySize");
  if (!confirmParty) return;

  const partySize = localStorage.getItem("partySize");
  const date = localStorage.getItem("date");
  const time = localStorage.getItem("time");
  const occasion = localStorage.getItem("occasion");
  const email = localStorage.getItem("email");

  if (partySize) confirmParty.textContent = partySize;

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
});


/* =====================================================
   CMS LOADER
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

  const page = window.location.pathname;

  if (page === "/" || page.endsWith("index.html")) {

    fetch("/content/homepage.json")
      .then(res => res.json())
      .then(data => {

        // TEXT
        document.getElementById("heroTitle").textContent = data.hero_title || "";
        document.getElementById("heroDescription").textContent = data.hero_description || "";
        document.getElementById("ourStoryTitle").textContent = data.our_story_title || "";
        document.getElementById("ourStoryText").textContent = data.our_story_text || "";
        document.getElementById("chefTitle").textContent = data.chef_title || "";
        document.getElementById("chefText").textContent = data.chef_text || "";

        // HERO MEDIA (Video > Image > Dark)
        const heroImage = document.getElementById("heroImage");
        const heroVideo = document.getElementById("heroVideo");
        const heroVideoSource = document.getElementById("heroVideoSource");

        if (heroImage && heroVideo && heroVideoSource) {

          heroImage.style.display = "none";
          heroVideo.style.display = "none";

          if (data.hero_video) {
            heroVideoSource.src = data.hero_video;
            heroVideo.load();
            heroVideo.style.display = "block";
          }
          else if (data.hero_image) {
            heroImage.src = data.hero_image;
            heroImage.style.display = "block";
          }
        }

        // SECTION IMAGES
        if (data.our_story_image) {
          document.getElementById("ourStoryImage").src = data.our_story_image;
        }

        if (data.chef_image) {
          document.getElementById("chefImage").src = data.chef_image;
        }

      })
      .catch(err => console.error("Homepage CMS error:", err));
  }


 // ================= EVENTS PAGE =================
if (page.endsWith("events.html")) {

  fetch("/content/events.json")
    .then(res => res.json())
    .then(data => {

      /* ================= HERO ================= */

      const heroSection = document.getElementById("eventsHero");
      const heroTitle = document.getElementById("eventsHeroTitle");
      const heroDesc = document.getElementById("eventsHeroDescription");

      if (heroTitle) heroTitle.textContent = data.hero.title;
      if (heroDesc) heroDesc.textContent = data.hero.description;

      if (heroSection) {
        heroSection.style.background = "var(--deep)";

        if (data.hero.image) {
          heroSection.style.backgroundImage = `url(${data.hero.image})`;
          heroSection.style.backgroundSize = "cover";
          heroSection.style.backgroundPosition = "center";
        }

        if (data.hero.video) {
          heroSection.innerHTML += `
            <video autoplay muted loop playsinline class="hero-bg">
              <source src="${data.hero.video}" type="video/mp4">
            </video>
          `;
        }
      }

      /* ================= PRIVATE DINING ================= */

      const privateTitle = document.getElementById("privateDiningTitle");
      const privateText = document.getElementById("privateDiningText");
      const privateBtn = document.getElementById("privateDiningBtn");

      if (privateTitle) privateTitle.textContent = data.private_dining.title;

      if (privateText) {
        privateText.innerHTML = `
          <p>${data.private_dining.paragraph1}</p>
          <p>${data.private_dining.paragraph2}</p>
          <p>${data.private_dining.paragraph3}</p>
        `;
      }

      if (privateBtn) {
        privateBtn.textContent = data.private_dining.button_text;
        privateBtn.href = data.private_dining.button_link;
      }

      /* ================= EVENT HOSTING ================= */

      const hostingTitle = document.getElementById("eventHostingTitle");
      const hostingText = document.getElementById("eventHostingText");
      const hostingBtn = document.getElementById("eventHostingBtn");

      if (hostingTitle) hostingTitle.textContent = data.event_hosting.title;

      if (hostingText) {
        hostingText.innerHTML = `
          <p>${data.event_hosting.paragraph1}</p>
          <p>${data.event_hosting.paragraph2}</p>
          <p>${data.event_hosting.paragraph3}</p>
        `;
      }

      if (hostingBtn) {
        hostingBtn.textContent = data.event_hosting.button_text;
        hostingBtn.href = data.event_hosting.button_link;
      }

      /* ================= RIGHT IMAGE ================= */

      const rightImage = document.getElementById("eventsRightImage");
      if (rightImage && data.private_dining.image) {
        rightImage.src = data.private_dining.image;
      }

    })
    .catch(err => console.error("Events CMS error:", err));
}
});