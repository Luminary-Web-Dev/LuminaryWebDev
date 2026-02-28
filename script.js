/* =====================================================
   MOBILE NAVIGATION
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("open");
      document.body.classList.toggle("nav-open");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.classList.remove("open");
        document.body.classList.remove("nav-open");
      });
    });
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

  const dateTimeElement = document.getElementById("confirmDateTime");
  if (date && time && dateTimeElement) {
    dateTimeElement.textContent = date + " – " + time;
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
   CAROUSEL INITIALIZER (REUSABLE)
===================================================== */

function initializeCarousel() {

  const slides = document.querySelectorAll(".carousel-slide");
  const dotsContainer = document.getElementById("carouselDots");

  if (!slides.length) return;

  let currentSlide = 0;

  if (dotsContainer) dotsContainer.innerHTML = "";

  slides.forEach((_, index) => {
    const dot = document.createElement("span");

    dot.addEventListener("click", () => {
      currentSlide = index;
      showSlide(currentSlide);
    });

    if (dotsContainer) dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer
    ? dotsContainer.querySelectorAll("span")
    : [];

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[index].classList.add("active");
    if (dots[index]) dots[index].classList.add("active");
  }

  window.changeSlide = function (direction) {
    currentSlide += direction;

    if (currentSlide < 0) currentSlide = slides.length - 1;
    if (currentSlide >= slides.length) currentSlide = 0;

    showSlide(currentSlide);
  };

  showSlide(currentSlide);
}


/* =====================================================
   CMS LOADER
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

  const page = window.location.pathname;

  /* ================= HOMEPAGE ================= */

  if (page === "/" || page.endsWith("index.html")) {

    fetch("/content/homepage.json")
      .then(res => res.json())
      .then(data => {

        document.getElementById("heroTitle").textContent = data.hero_title || "";
        document.getElementById("heroDescription").textContent = data.hero_description || "";
        document.getElementById("ourStoryTitle").textContent = data.our_story_title || "";
        document.getElementById("ourStoryText").textContent = data.our_story_text || "";
        document.getElementById("chefTitle").textContent = data.chef_title || "";
        document.getElementById("chefText").textContent = data.chef_text || "";

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

        if (data.our_story_image) {
          document.getElementById("ourStoryImage").src = data.our_story_image;
        }

        if (data.chef_image) {
          document.getElementById("chefImage").src = data.chef_image;
        }

      })
      .catch(err => console.error("Homepage CMS error:", err));
  }


 /* ================= EVENTS PAGE ================= */

if (page.endsWith("events.html")) {

  fetch("/content/events.json")
    .then(res => res.json())
    .then(data => {

      // HERO TITLE
      const heroTitle = document.getElementById("eventsHeroTitle");
      if (heroTitle) heroTitle.textContent = data.hero_title || "";

      // HERO IMAGE (background)
      const heroSection = document.getElementById("eventsHero");
      if (heroSection && data.hero_image) {
        heroSection.style.backgroundImage = `url(${data.hero_image})`;
        heroSection.style.backgroundSize = "cover";
        heroSection.style.backgroundPosition = "center";
      }

      // PRIVATE DINING
      const privateText = document.getElementById("privateDiningText");
      if (privateText) privateText.textContent = data.private_text || "";

      // EVENT HOSTING
      const hostingText = document.getElementById("eventHostingText");
      if (hostingText) hostingText.textContent = data.hosting_text || "";

      // RIGHT IMAGE
      const rightImage = document.getElementById("eventsRightImage");
      if (rightImage && data.events_image) {
        rightImage.src = data.events_image;
      }

    })
    .catch(err => console.error("Events CMS error:", err));
}




  /* ================= ABOUT PAGE ================= */

if (page.endsWith("about.html")) {

  fetch("/content/about.json")
    .then(res => res.json())
    .then(data => {

      /* ========= HERO ========= */

      const heroTitle = document.getElementById("aboutHeroTitle");
      const heroImage = document.getElementById("aboutHeroImage");
      const heroVideo = document.getElementById("aboutHeroVideo");
      const heroVideoSource = document.getElementById("aboutHeroVideoSource");

      if (heroTitle) heroTitle.textContent = data.hero_title || "";

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

      /* ========= STORY ========= */

      const storyTitle = document.getElementById("aboutStoryTitle");
      const storyText = document.getElementById("aboutStoryText");
      const storyImage = document.getElementById("aboutStoryImage");

      if (storyTitle) storyTitle.textContent = data.story_title || "";
      if (storyText) storyText.textContent = data.story_text || "";
      if (storyImage && data.story_image) {
        storyImage.src = data.story_image;
      }

      /* ========= SECOND STORY ========= */

      const secondaryText = document.getElementById("aboutSecondaryText");
      const secondaryImage = document.getElementById("aboutSecondaryImage");

      if (secondaryText) secondaryText.textContent = data.secondary_story_text || "";
      if (secondaryImage && data.secondary_story_image) {
        secondaryImage.src = data.secondary_story_image;
      }

      /* ========= CHEF ========= */

      const chefTitle = document.getElementById("aboutChefTitle");
      const chefText = document.getElementById("aboutChefText");
      const chefImage = document.getElementById("aboutChefImage");

      if (chefTitle) chefTitle.textContent = data.chef_title || "";
      if (chefText) chefText.textContent = data.chef_text || "";
      if (chefImage && data.chef_image) {
        chefImage.src = data.chef_image;
      }

    })
    .catch(err => console.error("About CMS error:", err));
}



  /* ================= MENU ================= */

  if (page.endsWith("menu.html")) {

    fetch("/content/menu.json")
      .then(res => res.json())
      .then(data => {

        const container = document.getElementById("menuSlidesContainer");
        if (!container) return;

        container.innerHTML = "";

        data.categories.forEach((category, index) => {

          const slide = document.createElement("div");
          slide.classList.add("carousel-slide");
          if (index === 0) slide.classList.add("active");

          slide.innerHTML = `
  <h3 class="carousel-category">${category.category_name}</h3>

  <div class="carousel-image-wrapper">
    ${category.category_image 
      ? `<img src="${category.category_image}" class="carousel-image" alt="${category.category_name}">`
      : ""
    }
  </div>

  <div class="carousel-items">
    ${category.items.map(item => `
      <div class="carousel-item">
        <h4>${item.name} <span>/ ${item.price}</span></h4>
        <p>${item.description}</p>
      </div>
    `).join("")}
  </div>


            <div class="carousel-items">
              ${category.items.map(item => `
                <div class="carousel-item">
                  <h4>${item.name} <span>/ ${item.price}</span></h4>
                  <p>${item.description}</p>
                </div>
              `).join("")}
            </div>
          `;

          container.appendChild(slide);
        });

        initializeCarousel();

      })
      .catch(err => console.error("Menu CMS error:", err));
  }

});