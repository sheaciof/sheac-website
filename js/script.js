```javascript id="h7m2qx"
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
  const mainNav = document.querySelector(".main-nav");


  /*
     The new index.html uses the contact-toggle as the
     three-line button, so there may be no .hamburger.
     We support both to keep the site flexible.
  */

  const mobileMenuButton =
    hamburger || document.querySelector(".mobile-menu-toggle");


  if (mobileMenuButton && navMenu) {

    mobileMenuButton.addEventListener("click", (event) => {

      event.stopPropagation();

      navMenu.classList.toggle("active");

      if (mainNav) {
        mainNav.classList.toggle("active");
      }

      const isOpen =
        navMenu.classList.contains("active");

      mobileMenuButton.setAttribute(
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

      /*
         Desktop:
         CSS handles dropdowns with hover.

         Mobile/tablet:
         JavaScript handles dropdowns with click.
      */

      if (window.innerWidth <= 900) {

        event.preventDefault();

        event.stopPropagation();


        /* Close other dropdowns */

        dropdowns.forEach((otherDropdown) => {

          if (otherDropdown !== dropdown) {

            otherDropdown.classList.remove("open");

          }

        });


        /* Toggle current dropdown */

        dropdown.classList.toggle("open");

      }

    });

  });



  /* =========================================================
     4. CLOSE MOBILE NAVIGATION AFTER NORMAL LINK
     ========================================================= */

  document
    .querySelectorAll(".nav-menu a")
    .forEach((link) => {

      link.addEventListener("click", () => {

        /*
           Dropdown buttons stay open on mobile.
           Normal links close the menu.
        */

        if (
          !link.classList.contains("dropdown-toggle") ||
          window.innerWidth > 900
        ) {

          if (navMenu) {

            navMenu.classList.remove("active");

          }

          if (mainNav) {

            mainNav.classList.remove("active");

          }

          if (mobileMenuButton) {

            mobileMenuButton.setAttribute(
              "aria-expanded",
              "false"
            );

          }


          dropdowns.forEach((dropdown) => {

            dropdown.classList.remove("open");

          });

        }

      });

    });



  /* =========================================================
     5. CONTACT DRAWER
     ========================================================= */

  const contactToggle =
    document.querySelector(".contact-toggle");

  const contactDrawer =
    document.querySelector(".contact-drawer");

  const contactClose =
    document.querySelector(".contact-close");

  const contactOverlay =
    document.querySelector(".contact-overlay");


  /*
     Open contact drawer
  */

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


  /*
     Close contact drawer
  */

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


  /*
     Three-line button
  */

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


  /*
     Close button
  */

  if (contactClose) {

    contactClose.addEventListener(
      "click",
      closeContactDrawer
    );

  }


  /*
     Click dark overlay to close
  */

  if (contactOverlay) {

    contactOverlay.addEventListener(
      "click",
      closeContactDrawer
    );

  }



  /* =========================================================
     6. CLOSE CONTACT DRAWER WITH ESC
     ========================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {

        closeContactDrawer();

      }

    }
  );



  /* =========================================================
     7. CLOSE MENUS WHEN CLICKING OUTSIDE
     ========================================================= */

  document.addEventListener(
    "click",
    (event) => {

      /*
         Close mobile navigation if clicked outside
      */

      if (
        mainNav &&
        navMenu &&
        mobileMenuButton &&
        !mainNav.contains(event.target) &&
        !mobileMenuButton.contains(event.target)
      ) {

        if (window.innerWidth <= 900) {

          navMenu.classList.remove("active");

          mainNav.classList.remove("active");

          mobileMenuButton.setAttribute(
            "aria-expanded",
            "false"
          );


          dropdowns.forEach((dropdown) => {

            dropdown.classList.remove("open");

          });

        }

      }

    }
  );



  /* =========================================================
     8. ACTIVE NAVIGATION
     ========================================================= */

  const currentPath =
    window.location.pathname.split("/").pop() ||
    "index.html";


  document
    .querySelectorAll(".nav-link")
    .forEach((link) => {

      const href =
        link.getAttribute("href");

      if (!href) return;


      const linkPath =
        href.split("#")[0];


      /*
         Do not mark Home because Home is intentionally
         removed from the navigation.
      */

      if (
        linkPath === currentPath &&
        linkPath !== "index.html"
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

          lightboxImg.alt = img.alt;

        }
      );

    });


    /* Close button */

    if (lightboxClose) {

      lightboxClose.addEventListener(
        "click",
        () => {

          lightbox.style.display = "none";

        }
      );

    }


    /* Click outside image */

    lightbox.addEventListener(
      "click",
      (event) => {

        if (event.target === lightbox) {

          lightbox.style.display = "none";

        }

      }
    );


    /* ESC */

    document.addEventListener(
      "keydown",
      (event) => {

        if (event.key === "Escape") {

          lightbox.style.display = "none";

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
         When moving back to desktop,
         close mobile navigation.
      */

      if (window.innerWidth > 900) {

        if (navMenu) {

          navMenu.classList.remove("active");

        }

        if (mainNav) {

          mainNav.classList.remove("active");

        }

        if (mobileMenuButton) {

          mobileMenuButton.setAttribute(
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
```
