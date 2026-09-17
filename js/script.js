document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     1. HEADER HIDE / SHOW ON SCROLL
     ========================================================= */

  const header = document.querySelector('header');

  let lastScrollPosition = window.scrollY;

  window.addEventListener('scroll', () => {

    const currentScrollPosition = window.scrollY;

    // Always show header when at the top
    if (currentScrollPosition <= 10) {
      header.classList.remove('header-hidden');
      lastScrollPosition = currentScrollPosition;
      return;
    }

    // Scrolling down
    if (currentScrollPosition > lastScrollPosition) {
      header.classList.add('header-hidden');
    }

    // Scrolling up
    else if (currentScrollPosition < lastScrollPosition) {
      header.classList.remove('header-hidden');
    }

    lastScrollPosition = currentScrollPosition;

  }, { passive: true });


  /* =========================================================
     2. MOBILE HAMBURGER MENU
     ========================================================= */

  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {

    hamburger.addEventListener('click', (e) => {

      e.stopPropagation();

      navMenu.classList.toggle('active');

      const isOpen = navMenu.classList.contains('active');

      hamburger.setAttribute('aria-expanded', isOpen);

    });


    /* =======================================================
       3. MOBILE DROPDOWN MENUS
       ======================================================= */

    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {

      const toggle = dropdown.querySelector('.dropdown-toggle');

      if (!toggle) return;

      toggle.addEventListener('click', (e) => {

        // Only use click dropdown behavior on mobile
        if (window.innerWidth <= 768) {

          e.preventDefault();

          e.stopPropagation();

          // Close other dropdowns
          dropdowns.forEach(otherDropdown => {

            if (otherDropdown !== dropdown) {
              otherDropdown.classList.remove('open');
            }

          });

          // Toggle current dropdown
          dropdown.classList.toggle('open');

        }

      });

    });


    /* =======================================================
       4. CLOSE MOBILE MENU WHEN CLICKING A NORMAL LINK
       ======================================================= */

    document.querySelectorAll('.nav-menu a').forEach(link => {

      link.addEventListener('click', () => {

        if (
          !link.classList.contains('dropdown-toggle') ||
          window.innerWidth > 768
        ) {

          navMenu.classList.remove('active');

          hamburger.setAttribute('aria-expanded', 'false');

          // Close all dropdowns
          document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('open');
          });

        }

      });

    });


    /* =======================================================
       5. CLOSE MENU WHEN CLICKING OUTSIDE
       ======================================================= */

    document.addEventListener('click', (e) => {

      if (
        !navMenu.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {

        navMenu.classList.remove('active');

        hamburger.setAttribute('aria-expanded', 'false');

        document.querySelectorAll('.dropdown').forEach(dropdown => {
          dropdown.classList.remove('open');
        });

      }

    });

  }


  /* =========================================================
     6. NAVIGATION ACTIVE LINK
     ========================================================= */

  const currentPath =
    window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-link').forEach(link => {

    const linkPath =
      link.getAttribute('href')?.split('#')[0];

    if (linkPath === currentPath) {

      link.classList.add('active');

    }

  });


  /* =========================================================
     7. GALLERY LIGHTBOX
     ========================================================= */

  const galleryItems =
    document.querySelectorAll('.gallery-item img');

  const lightbox =
    document.getElementById('lightboxModal');

  const lightboxImg =
    document.getElementById('lightboxImg');

  const lightboxClose =
    document.querySelector('.lightbox-close');


  if (
    galleryItems.length > 0 &&
    lightbox &&
    lightboxImg
  ) {

    galleryItems.forEach(img => {

      img.addEventListener('click', () => {

        lightbox.style.display = 'flex';

        lightboxImg.src = img.src;

        lightboxImg.alt = img.alt;

      });

    });


    /* Close button */

    if (lightboxClose) {

      lightboxClose.addEventListener('click', () => {

        lightbox.style.display = 'none';

      });

    }


    /* Click outside image */

    lightbox.addEventListener('click', (e) => {

      if (e.target === lightbox) {

        lightbox.style.display = 'none';

      }

    });


    /* ESC key */

    document.addEventListener('keydown', (e) => {

      if (e.key === 'Escape') {

        lightbox.style.display = 'none';

      }

    });

  }


  /* =========================================================
     8. CLOSE MOBILE MENU WHEN RESIZING TO DESKTOP
     ========================================================= */

  window.addEventListener('resize', () => {

    if (window.innerWidth > 768) {

      if (navMenu) {
        navMenu.classList.remove('active');
      }

      if (hamburger) {
        hamburger.setAttribute('aria-expanded', 'false');
      }

      document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.classList.remove('open');
      });

    }

  });

});
