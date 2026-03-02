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
if (document.getElementById("heroTitle")) {

  fetch("/content/homepage.json")
    .then(res => res.json())
    .then(data => {

      document.getElementById("heroTitle").textContent = data.hero_title || "";
      document.getElementById("heroDescription").textContent = data.hero_description || "";
      document.getElementById("ourStoryTitle").textContent = data.our_story_title || "";
      document.getElementById("ourStoryText").textContent = data.our_story_text || "";
      document.getElementById("chefTitle").textContent = data.chef_title || "";
      document.getElementById("chefText").textContent = data.chef_text || "";

     // ===== HERO MEDIA (Video First, Image Fallback) =====
//const heroImage = document.getElementById("heroImage");
//const heroVideo = document.getElementById("heroVideo");
const ourStoryImage = document.getElementById("ourStoryImage");
const chefImage = document.getElementById("chefImage");

// HERO IMAGE
//if (data.hero_image && heroImage) {
//  heroImage.src = data.hero_image;
//  heroImage.style.display = "block";
//}

// HERO VIDEO (only if exists in JSON)
//if (data.hero_video && heroVideo) {
//  const source = heroVideo.querySelector("source");
//  if (source) source.src = data.hero_video;
//  heroVideo.load();
//  heroVideo.style.display = "block";
//} else if (heroVideo) {
 // heroVideo.style.display = "none";
//}

const heroImage = document.getElementById("heroImage");
const heroVideo = document.getElementById("heroVideo");

if (data.hero_video && heroVideo) {

  // Extract YouTube ID
  let videoID = "";

  if (data.hero_video.includes("youtu.be")) {
    videoID = data.hero_video.split("youtu.be/")[1]?.split("?")[0];
  } else if (data.hero_video.includes("watch?v=")) {
    videoID = data.hero_video.split("watch?v=")[1]?.split("&")[0];
  }

  if (videoID) {
    heroVideo.src =
      `https://www.youtube.com/embed/${videoID}?autoplay=1&mute=1&loop=1&playlist=${videoID}&controls=0&showinfo=0&modestbranding=1`;

    heroVideo.style.display = "block";
    if (heroImage) heroImage.style.display = "none";
  }

} else if (data.hero_image && heroImage) {

  heroImage.src = data.hero_image;
  heroImage.style.display = "block";
  if (heroVideo) heroVideo.style.display = "none";
}

      // OUR STORY IMAGE
      if (data.our_story_image && ourStoryImage) {
        ourStoryImage.src = data.our_story_image;
      }

      // CHEF IMAGE
      if (data.chef_image && chefImage) {
        chefImage.src = data.chef_image;
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

/* ================= ACTIVE NAV ================= */

const currentPath = window.location.pathname;

document.querySelectorAll(".nav-links a").forEach(link => {
  const linkPath = link.getAttribute("href");

  if (
    currentPath === "/" && linkPath.includes("index") ||
    currentPath.endsWith(linkPath)
  ) {
    link.classList.add("active");
  }

/* ================= RESERVATION ================= */

/* ================= RESERVATION SUBMIT (NETLIFY SAFE) ================= */

document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("reservationForm");
  if (!form) return;

  const nextBtn = document.getElementById("nextBtn");
  const backBtn = document.getElementById("backBtn");
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");

  /* ---------- STEP 1 → STEP 2 ---------- */

  if (nextBtn && step1 && step2) {
    nextBtn.addEventListener("click", function () {

      const party = document.getElementById("partySizeSelect").value;
      const date = document.getElementById("dateSelect").value;
      const time = document.getElementById("timeSelect").value;

      if (!party || !date || !time) {
        alert("Please complete all required fields.");
        return;
      }

      step1.classList.remove("active");
      step2.classList.add("active");
    });
  }

  if (backBtn && step1 && step2) {
    backBtn.addEventListener("click", function () {
      step2.classList.remove("active");
      step1.classList.add("active");
    });
  }

  /* ---------- FORM SUBMIT ---------- */

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const reservationData = {
      partySize: document.getElementById("partySizeSelect").value,
      date: document.getElementById("dateSelect").value,
      time: document.getElementById("timeSelect").value,
      occasion: document.getElementById("occasionSelect").value,
      name: form.querySelector('input[name="name"]').value,
      email: form.querySelector('input[name="email"]').value,
      phone: form.querySelector('input[name="phone"]').value,
      dietary: form.querySelector('input[name="dietary"]').value,
      requests: form.querySelector('textarea[name="requests"]').value
    };

    // Save for confirmation page
    localStorage.setItem("reservationData", JSON.stringify(reservationData));

    // Send to Netlify
    const formData = new FormData(form);

    fetch("/", {
      method: "POST",
      body: formData
    })
    .then(() => {
      window.location.href = "/confirmation.html";
    })
    .catch(error => {
      console.error("Submission error:", error);
    });

  });

});

/* ================= RESERVATION SUBMIT (NETLIFY SAFE) ================= */

document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("reservationForm");
  if (!form) return;

  const nextBtn = document.getElementById("nextBtn");
  const backBtn = document.getElementById("backBtn");
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");

  /* ---------- STEP 1 → STEP 2 ---------- */

  if (nextBtn && step1 && step2) {
    nextBtn.addEventListener("click", function () {

      const party = document.getElementById("partySizeSelect").value;
      const date = document.getElementById("dateSelect").value;
      const time = document.getElementById("timeSelect").value;

      if (!party || !date || !time) {
        alert("Please complete all required fields.");
        return;
      }

      step1.classList.remove("active");
      step2.classList.add("active");
    });
  }

  if (backBtn && step1 && step2) {
    backBtn.addEventListener("click", function () {
      step2.classList.remove("active");
      step1.classList.add("active");
    });
  }

  /* ---------- FORM SUBMIT ---------- */

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const reservationData = {
      partySize: document.getElementById("partySizeSelect").value,
      date: document.getElementById("dateSelect").value,
      time: document.getElementById("timeSelect").value,
      occasion: document.getElementById("occasionSelect").value,
      name: form.querySelector('input[name="name"]').value,
      email: form.querySelector('input[name="email"]').value,
      phone: form.querySelector('input[name="phone"]').value,
      dietary: form.querySelector('input[name="dietary"]').value,
      requests: form.querySelector('textarea[name="requests"]').value
    };

    // Save for confirmation page
    localStorage.setItem("reservationData", JSON.stringify(reservationData));

    // Send to Netlify
    const formData = new FormData(form);

    fetch("/", {
      method: "POST",
      body: formData
    })
    .then(() => {
      window.location.href = "/confirmation.html";
    })
    .catch(error => {
      console.error("Submission error:", error);
    });

  });

});


});