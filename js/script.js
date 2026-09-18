/**
 * SHEAC Official Website JavaScript
 * Pure Vanilla JS (No jQuery, React, or External JS Frameworks)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Automatic Current Year updating
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Mobile Menu / Hamburger Toggle
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const primaryNav = document.getElementById('primary-nav');
  const navMenu = primaryNav ? primaryNav.querySelector('.nav-menu') : null;

  function toggleMobileMenu() {
    if (!navMenu || !hamburgerBtn) return;
    const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
    hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');

    // Toggle hamburger icon between bars and close
    const icon = hamburgerBtn.querySelector('i');
    if (icon) {
      if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    }
  }

  function closeMobileMenu() {
    if (!navMenu || !hamburgerBtn) return;
    navMenu.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    const icon = hamburgerBtn.querySelector('i');
    if (icon) {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    }
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
  }

  // 3. Mobile Dropdown Toggle (Click handling for small screens)
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 991) {
        e.preventDefault();
        const parentDropdown = toggle.closest('.dropdown');
        if (parentDropdown) {
          const isOpen = parentDropdown.classList.contains('open');
          // Close other dropdowns
          document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
          if (!isOpen) {
            parentDropdown.classList.add('open');
            toggle.setAttribute('aria-expanded', 'true');
          } else {
            toggle.setAttribute('aria-expanded', 'false');
          }
        }
      }
    });
  });

  // Close mobile menu on selecting any link inside navigation
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 991) {
        closeMobileMenu();
      }
    });
  });

  // 4. Contact Drawer Controls
  const drawerTrigger = document.getElementById('contactDrawerTrigger');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const contactDrawer = document.getElementById('contactDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');

  function openContactDrawer() {
    if (contactDrawer && drawerOverlay) {
      contactDrawer.classList.add('active');
      drawerOverlay.classList.add('active');
      contactDrawer.setAttribute('aria-hidden', 'false');
      drawerOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
  }

  function closeContactDrawer() {
    if (contactDrawer && drawerOverlay) {
      contactDrawer.classList.remove('active');
      drawerOverlay.classList.remove('active');
      contactDrawer.setAttribute('aria-hidden', 'true');
      drawerOverlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = ''; // Restore background scrolling
    }
  }

  if (drawerTrigger) drawerTrigger.addEventListener('click', openContactDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeContactDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeContactDrawer);

  // 5. Global Keyboard Accessibility & Outside Clicks
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeContactDrawer();
      closeMobileMenu();
    }
  });

  document.addEventListener('click', (e) => {
    // Close mobile menu if clicked outside header
    if (navMenu && navMenu.classList.contains('active')) {
      const isClickInsideHeader = e.target.closest('.main-header');
      if (!isClickInsideHeader) {
        closeMobileMenu();
      }
    }
  });

  // 6. Responsive Window Resize Handling
  window.addEventListener('resize', () => {
    if (window.innerWidth > 991) {
      closeMobileMenu();
      document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
    }
  });

  // 7. Active Navigation Link Highlighting
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // 8. Hide/Show Header on Scroll
  const header = document.querySelector('.main-header');
  let lastScrollY = window.scrollY;

  if (header) {
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      // Keep header visible near top of the page
      if (currentScrollY < 100) {
        header.classList.remove('header-hidden');
      } else if (currentScrollY > lastScrollY && !navMenu?.classList.contains('active')) {
        // Scrolling down & mobile menu is closed -> Hide Header
        header.classList.add('header-hidden');
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up -> Reveal Header
        header.classList.remove('header-hidden');
      }

      lastScrollY = currentScrollY;
    });
  }
});
