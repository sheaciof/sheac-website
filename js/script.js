document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     1. HEADER HIDE / SHOW ON SCROLL
     ========================================================= */

  const header = document.querySelector("header");

  let lastScrollPosition = window.scrollY;

  if (header) {

    window.addEventListener(
      "scroll",
      () => {

        const currentScrollPosition = window.scrollY;

        /* Always show header at the top */

        if (currentScrollPosition <= 10) {

          header.classList.remove("header-hidden");

          lastScrollPosition = currentScrollPosition;

          return;
        }


        /* Scrolling down */

        if (currentScrollPosition > lastScrollPosition) {

          header.classList.add("header-hidden");

        }


        /* Scrolling up */

        else if (currentScrollPosition < lastScrollPosition) {

          header.classList.remove("header-hidden");

        }


        lastScrollPosition = currentScrollPosition;

      },
      { passive: true }
    );

  }


  /* =========================================================
     2. MOBILE NAVIGATION
     ========================================================= */

  const hamburger = document.querySelector(".hamburger");

  const navMenu = document.querySelector(".nav-menu");

  const mainNav = document.querySelector("nav");


  if (hamburger && navMenu) {

    hamburger.addEventListener("click", (event) => {

      event.stopPropagation();

      navMenu.classList.toggle("active");

      const isOpen =
        navMenu.classList.contains("active");

      hamburger.setAttribute(
        "aria-expanded",
        isOpen
      );

    });

  }


  /* =========================================================
     3. MOBILE DROPDOWN MENUS
     ========================================================= */

  const dropdowns =
    document.querySelectorAll(".dropdown");


  dropdowns.forEach((dropdown) => {

    const toggle =
      dropdown.querySelector(".dropdown-toggle");

    if (!toggle) return;


    toggle.addEventListener("click", (event) => {

      /* Only use click behavior on mobile/tablet */

      if (window.innerWidth <= 900) {

        event.preventDefault();

        event.stopPropagation();


        /* Close other dropdowns */

        dropdowns.forEach((otherDropdown) => {

          if (otherDropdown !== dropdown) {

            otherDropdown.classList.remove("open");

          }

        });


        /* Toggle selected dropdown */

        dropdown.classList.toggle("open");

      }

    });

  });


  /* =========================================================
     4. CONTACT DRAWER
     ========================================================= */

  const contactToggle =
    document.querySelector(".contact-toggle");

  const contactDrawer =
    document.querySelector(".contact-drawer");

  const contactClose =
    document.querySelector(".contact-close");

  const contactOverlay =
    document.querySelector(".contact-overlay");


  /* Open contact drawer */

  const openContactDrawer = () => {

    if (!contactDrawer) return;

    contactDrawer.classList.add("open");

    if (contactOverlay) {

      contactOverlay.classList.add("active");

    }

    if (contactToggle) {

      contactToggle.setAttribute(
        "aria-expanded",
        "true"
      );

    }

    contactDrawer.setAttribute(
      "aria-hidden",
      "false"
    );


    /* Prevent background scrolling */

    document.body.style.overflow = "hidden";

  };


  /* Close contact drawer */

  const closeContactDrawer = () => {

    if (!contactDrawer) return;

    contactDrawer.classList.remove("open");

    if (contactOverlay) {

      contactOverlay.classList.remove("active");

    }

    if (contactToggle) {

      contactToggle.setAttribute(
        "aria-expanded",
        "false"
      );

    }

    contactDrawer.setAttribute(
      "aria-hidden",
      "true"
    );


    /* Restore scrolling */

    document.body.style.overflow = "";

  };


  /* Three-line contact button */

  if (contactToggle) {

    contactToggle.addEventListener(
      "click",
      (event) => {

        event.stopPropagation();

        if (
          contactDrawer &&
          contactDrawer.classList.contains("open")
        ) {

          closeContactDrawer();

        } else {

          openContactDrawer();

        }

      }
    );

  }


  /* Close button */

  if (contactClose) {

    contactClose.addEventListener(
      "click",
      closeContactDrawer
    );

  }


  /* Click overlay to close */

  if (contactOverlay) {

    contactOverlay.addEventListener(
      "click",
      closeContactDrawer
    );

  }


  /* =========================================================
     5. ESCAPE KEY
     ========================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {

        closeContactDrawer();

        if (navMenu) {

          navMenu.classList.remove("active");

        }

        dropdowns.forEach((dropdown) => {

          dropdown.classList.remove("open");

        });

        if (hamburger) {

          hamburger.setAttribute(
            "aria-expanded",
            "false"
          );

        }

      }

    }
  );


  /* =========================================================
     6. CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
     ========================================================= */

  document.addEventListener(
    "click",
    (event) => {

      if (
        window.innerWidth <= 900 &&
        navMenu &&
        hamburger &&
        !navMenu.contains(event.target) &&
        !hamburger.contains(event.target)
      ) {

        navMenu.classList.remove("active");

        dropdowns.forEach((dropdown) => {

          dropdown.classList.remove("open");

        });

        hamburger.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }
  );


  /* =========================================================
     7. CLOSE MOBILE MENU AFTER SELECTING A LINK
     ========================================================= */

  const navLinks =
    document.querySelectorAll(
      ".nav-menu a:not(.dropdown-toggle)"
    );


  navLinks.forEach((link) => {

    link.addEventListener("click", () => {

      if (window.innerWidth <= 900) {

        if (navMenu) {

          navMenu.classList.remove("active");

        }

        dropdowns.forEach((dropdown) => {

          dropdown.classList.remove("open");

        });

        if (hamburger) {

          hamburger.setAttribute(
            "aria-expanded",
            "false"
          );

        }

      }

    });

  });


  /* =========================================================
     8. ACTIVE NAVIGATION
     ========================================================= */

  const currentPage =
    window.location.pathname
      .split("/")
      .pop() || "index.html";


  const allNavLinks =
    document.querySelectorAll(
      ".nav-menu a"
    );


  allNavLinks.forEach((link) => {

    const href =
      link.getAttribute("href");

    if (!href) return;

    const linkPage =
      href.split("/").pop();


    /*
       Home is intentionally not in
       the navigation.
    */

    if (
      linkPage === currentPage &&
      linkPage !== "index.html"
    ) {

      link.classList.add("active");

    }

  });


  /* =========================================================
     9. GALLERY LIGHTBOX
     ========================================================= */

  const galleryItems =
    document.querySelectorAll(
      ".gallery-item img"
    );

  const lightbox =
    document.getElementById(
      "lightboxModal"
    );

  const lightboxImg =
    document.getElementById(
      "lightboxImg"
    );

  const lightboxClose =
    document.querySelector(
      ".lightbox-close"
    );


  if (
    galleryItems.length > 0 &&
    lightbox &&
    lightboxImg
  ) {

    galleryItems.forEach((img) => {

      img.addEventListener(
        "click",
        () => {

          lightbox.style.display = "flex";

          lightboxImg.src = img.src;

          lightboxImg.alt = img.alt || "";

          document.body.style.overflow = "hidden";

        }
      );

    });


    /* Close button */

    if (lightboxClose) {

      lightboxClose.addEventListener(
        "click",
        () => {

          lightbox.style.display = "none";

          document.body.style.overflow = "";

        }
      );

    }


    /* Click outside image */

    lightbox.addEventListener(
      "click",
      (event) => {

        if (event.target === lightbox) {

          lightbox.style.display = "none";

          document.body.style.overflow = "";

        }

      }
    );


    /* ESC */

    document.addEventListener(
      "keydown",
      (event) => {

        if (event.key === "Escape") {

          lightbox.style.display = "none";

          document.body.style.overflow = "";

        }

      }
    );

  }


  /* =========================================================
     10. RESIZE HANDLING
     ========================================================= */

  window.addEventListener(
    "resize",
    () => {

      /*
         When returning to desktop,
         close mobile navigation and dropdowns.
      */

      if (window.innerWidth > 900) {

        if (navMenu) {

          navMenu.classList.remove("active");

        }

        if (hamburger) {

          hamburger.setAttribute(
            "aria-expanded",
            "false"
          );

        }

        dropdowns.forEach((dropdown) => {

          dropdown.classList.remove("open");

        });

      }

    }
  );

});
