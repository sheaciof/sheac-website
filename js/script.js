document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Hamburger Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking any navigation link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });

    // Close menu when clicking outside of the header
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove('active');
      }
    });
  }

  // 2. Navigation Active Link Auto-Highlighting
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  // 3. Gallery Lightbox Modal
  const galleryItems = document.querySelectorAll('.gallery-item img');
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (galleryItems.length > 0 && lightbox && lightboxImg) {
    galleryItems.forEach(img => {
      img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', () => {
        lightbox.style.display = 'none';
      });
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
      }
    });
  }
});
