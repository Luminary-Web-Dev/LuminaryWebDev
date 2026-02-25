// Load CMS content
async function loadContent() {
  try {
    // Load hero content
    const heroRes = await fetch('/content/hero.json');
    const hero = await heroRes.json();
    const heroTitle = document.querySelector('.hero h1');
    const heroDesc = document.querySelector('.hero p');
    if (heroTitle) heroTitle.textContent = hero.title;
    if (heroDesc) heroDesc.textContent = hero.description;

    // Load Our Story (homepage)
    const storyRes = await fetch('/content/our-story.json');
    const story = await storyRes.json();
    const storyTitle = document.querySelector('.split-section.light h3');
    const storyPara = document.querySelector('.split-section.light p');
    const storyVideo = document.querySelector('.split-section.light video source');
    if (storyTitle) storyTitle.textContent = story.title;
    if (storyPara) storyPara.textContent = story.paragraph;
    if (storyVideo) storyVideo.src = story.video;

    // Load Chef Philosophy (homepage)
    const philRes = await fetch('/content/chef-philosophy.json');
    const phil = await philRes.json();
    const philTitle = document.querySelector('.split-section.darker h3');
    const philPara = document.querySelector('.split-section.darker p');
    const philVideo = document.querySelector('.split-section.darker video source');
    if (philTitle) philTitle.textContent = phil.title;
    if (philPara) philPara.textContent = phil.paragraph;
    if (philVideo) philVideo.src = phil.video;
  } catch (error) {
    console.log('Content loading skipped or failed:', error);
  }
}

// Load about page content
async function loadAboutContent() {
  try {
    const storyRes = await fetch('/content/about-story.json');
    const story = await storyRes.json();
    const chefRes = await fetch('/content/about-chef.json');
    const chef = await chefRes.json();

    const sections = document.querySelectorAll('.about-section');
    if (sections[0]) {
      const paras = sections[0].querySelectorAll('.about-text p');
      if (paras[0]) paras[0].textContent = story.paragraph1;
      if (paras[1]) paras[1].textContent = story.paragraph2;
      if (paras[2]) paras[2].textContent = story.paragraph3;
      const video = sections[0].querySelector('video source');
      if (video) video.src = story.video;
      const img = sections[0].querySelector('img');
      if (img) img.src = story.image;
    }

    if (sections[1]) {
      const paras = sections[1].querySelectorAll('.about-text p');
      if (paras[0]) paras[0].textContent = chef.paragraph1;
      if (paras[1]) paras[1].textContent = chef.paragraph2;
      if (paras[2]) paras[2].textContent = chef.paragraph3;
      const video = sections[1].querySelector('video source');
      if (video) video.src = chef.video;
      const img = sections[1].querySelector('img');
      if (img) img.src = chef.image;
    }
  } catch (error) {
    console.log('About content loading failed:', error);
  }
}

// Load events page content
async function loadEventsContent() {
  try {
    const diningRes = await fetch('/content/private-dining.json');
    const dining = await diningRes.json();
    const hostingRes = await fetch('/content/event-hosting.json');
    const hosting = await hostingRes.json();

    const sections = document.querySelectorAll('.about-section');
    if (sections[0]) {
      const paras = sections[0].querySelectorAll('.about-text p');
      if (paras[0]) paras[0].textContent = dining.paragraph1;
      if (paras[1]) paras[1].textContent = dining.paragraph2;
      if (paras[2]) paras[2].textContent = dining.paragraph3;
      const img = sections[0].querySelectorAll('img')[0];
      if (img) img.src = dining.image;
      const video = sections[0].querySelector('video source');
      if (video) video.src = dining.video;
    }

    if (sections[1]) {
      const paras = sections[1].querySelectorAll('.about-text p');
      if (paras[0]) paras[0].textContent = hosting.paragraph1;
      if (paras[1]) paras[1].textContent = hosting.paragraph2;
      if (paras[2]) paras[2].textContent = hosting.paragraph3;
      const img = sections[1].querySelectorAll('img')[0];
      if (img) img.src = hosting.image;
      const video = sections[1].querySelector('video source');
      if (video) video.src = hosting.video;
    }
  } catch (error) {
    console.log('Events content loading failed:', error);
  }
}

// Load menu content
async function loadMenuContent() {
  try {
    const categories = ['appetizers', 'signature', 'desserts', 'beverages', 'cocktails'];
    const slides = document.querySelectorAll('.carousel-slide');

    for (let i = 0; i < categories.length; i++) {
      const res = await fetch(`/content/menu-${categories[i]}.json`);
      const data = await res.json();
      
      if (slides[i]) {
        const img = slides[i].querySelector('.carousel-image');
        if (img) img.src = data.image;

        const itemsContainer = slides[i].querySelector('.carousel-items');
        if (itemsContainer && data.items) {
          itemsContainer.innerHTML = data.items.map(item => `
            <div class="carousel-item">
              <h4>${item.name} <span>/ ${item.price}</span></h4>
              <p>${item.description}</p>
            </div>
          `).join('');
        }
      }
    }
  } catch (error) {
    console.log('Menu content loading failed:', error);
  }
}

// Initialize content loading based on page
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContent);
} else {
  initContent();
}

function initContent() {
  const path = window.location.pathname;
  if (path.includes('index.html') || path === '/') {
    loadContent();
  } else if (path.includes('about.html')) {
    loadAboutContent();
  } else if (path.includes('events.html')) {
    loadEventsContent();
  } else if (path.includes('menu.html')) {
    loadMenuContent();
  }
}
