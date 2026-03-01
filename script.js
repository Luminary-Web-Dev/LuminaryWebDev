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
   CAROUSEL INITIALIZER
===================================================== */

function initializeCarousel() {

  const slides = document.querySelectorAll(".carousel-slide");
  const dotsContainer =
  document.getElementById("carouselDots") ||
  document.getElementById("homeCarouselDots");

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
  console.log("CURRENT PATH:", page);

  /* ================= HOMEPAGE ================= */

  if (page === "/" || page.endsWith("index.html")) {

    fetch("content/homepage.json")
      .then(res => res.json())
      .then(data => {

        document.getElementById("heroTitle").textContent = data.hero_title || "";
        document.getElementById("heroDescription").textContent = data.hero_description || "";
        document.getElementById("ourStoryTitle").textContent = data.our_story_title || "";
        document.getElementById("ourStoryText").textContent = data.our_story_text || "";
        document.getElementById("chefTitle").textContent = data.chef_title || "";
        document.getElementById("chefText").textContent = data.chef_text || "";

        if (data.hero_image) {
          document.getElementById("heroImage").src = data.hero_image;
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

if (page.endsWith("events") || page.endsWith("events.html")) {
  fetch("content/events.json")
    .then(res => res.json())
    .then(data => {

      // HERO
      document.getElementById("eventsHeroTitle").textContent =
        data.hero_title || "";

      document.getElementById("eventsHeroDescription").textContent =
        data.hero_description || "";

      const heroSection = document.getElementById("eventsHero");
      if (heroSection && data.hero_image) {
        heroSection.style.backgroundImage =
          `url(${data.hero_image})`;
        heroSection.style.backgroundSize = "cover";
        heroSection.style.backgroundPosition = "center";
      }

      // PRIVATE DINING
      document.getElementById("privateDiningTitle").textContent =
        "Private Dining";

      document.getElementById("privateDiningText").textContent =
        data.private_text || "";

      // EVENT HOSTING
      document.getElementById("eventHostingTitle").textContent =
        "Event Hosting";

      document.getElementById("eventHostingText").textContent =
        data.hosting_text || "";

      // RIGHT IMAGE
      if (data.events_image) {
        document.getElementById("eventsRightImage").src =
          data.events_image;
      }

    })
    .catch(err => console.error("Events CMS error:", err));
}


  /* ================= ABOUT PAGE ================= */

  if (page.includes("about")) {

    fetch("content/about.json")
      .then(res => res.json())
      .then(data => {

        document.getElementById("aboutHeroTitle").textContent = data.hero_title || "";

        if (data.hero_image) {
          document.getElementById("aboutHeroImage").src = data.hero_image;
        }

        document.getElementById("aboutStoryTitle").textContent = data.story_title || "";
        document.getElementById("aboutStoryText").textContent = data.story_text || "";

        if (data.story_image) {
          document.getElementById("aboutStoryImage").src = data.story_image;
        }

        document.getElementById("aboutSecondaryText").textContent = data.secondary_story_text || "";

        if (data.secondary_story_image) {
          document.getElementById("aboutSecondaryImage").src = data.secondary_story_image;
        }

        document.getElementById("aboutChefTitle").textContent = data.chef_title || "";
        document.getElementById("aboutChefText").textContent = data.chef_text || "";

        if (data.chef_image) {
          document.getElementById("aboutChefImage").src = data.chef_image;
        }

      })
      .catch(err => console.error("About CMS error:", err));
  }


  /* ================= MENU ================= */

if (page.includes("menu") || page === "/" || page.endsWith("index.html")) {

  fetch("content/menu.json")
    .then(res => res.json())
    .then(data => {

      const containers = document.querySelectorAll(".menuSlidesContainer");
if (!containers.length) return;


      container.innerHTML = "";

      data.categories.forEach((category, index) => {

        const slide = document.createElement("div");
        slide.classList.add("carousel-slide");

        if (index === 0) {
          slide.classList.add("active");
        }

        slide.innerHTML = `
          <h3 class="carousel-category">
            ${category.category_name}
          </h3>

          <div class="carousel-image-wrapper">
            ${
              category.category_image
                ? `<img 
                    src="${category.category_image}" 
                    class="carousel-image" 
                    alt="${category.category_name}">
                  `
                : ""
            }
          </div>

          <div class="carousel-items">
            ${category.items.map(item => `
              <div class="carousel-item">
                <h4>
                  ${item.name}
                  <span>/ ${item.price}</span>
                </h4>
                <p>${item.description}</p>
              </div>
            `).join("")}
          </div>
        `;

        containers.forEach(container => {
    container.appendChild(slide.cloneNode(true));
    });

      });

      initializeCarousel();

    })
    .catch(err => console.error("Menu CMS error:", err));
}

/* ================= MENU ================= */

if (page.includes("menu") || page === "/" || page.endsWith("index.html")) {

  fetch("./content/menu.json")
    .then(res => res.json())
    .then(data => {

      const menuContainer = document.getElementById("menuSlidesContainer");
      const homeContainer = document.getElementById("homeMenuSlidesContainer");

      const containers = [menuContainer, homeContainer].filter(Boolean);

      if (!containers.length) return;

      containers.forEach(container => container.innerHTML = "");

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
        `;

        containers.forEach(container => {
          container.appendChild(slide.cloneNode(true));
        });

      });

      initializeCarousel();

    })
    .catch(err => console.error("Menu CMS error:", err));
}
});