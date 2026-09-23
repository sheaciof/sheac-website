/* ==========================================================================
   SHEAC OFFICIAL WEBSITE - SHARED JAVASCRIPT
   Organization: Self Help Environment Awareness Camp (SHEAC)
   Website: sheac.org.np
   Theme: Think Globally, Act Locally

   This file contains JavaScript used across all SHEAC website pages.

   IMPORTANT:
   - Keep this file in: /js/script.js
   - All HTML pages should load this file.
   - Do not place page-specific JavaScript here unless necessary.
   ========================================================================== */


/* ==========================================================================
   01. WAIT FOR DOCUMENT TO LOAD
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ----------------------------------------------------------------------
       All shared functions are initialized here.
       ---------------------------------------------------------------------- */

    initializeMobileMenu();
    initializeDropdowns();
    initializeScrollEffects();
    initializeModals();
    initializeGalleryLightbox();
    initializeSmoothScroll();
    initializeCurrentYear();
    initializeBackToTop();
    initializeForms();

});


/* ==========================================================================
   02. MOBILE MENU
   ========================================================================== */

/*
   Mobile navigation:

   On mobile:
   - The hamburger button opens the navigation.
   - Clicking the button again closes it.
   - Clicking a navigation link closes the menu.

   Required HTML classes:
   .mobile-menu-button
   .mobile-nav
   .mobile-nav-link
*/

function initializeMobileMenu() {

    const menuButton = document.querySelector(".mobile-menu-button");
    const mobileNav = document.querySelector(".mobile-nav");

    if (!menuButton || !mobileNav) {
        return;
    }

    menuButton.addEventListener("click", function () {

        const isOpen = mobileNav.classList.toggle("active");

        menuButton.classList.toggle("active", isOpen);

        menuButton.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        /*
           Prevent background page scrolling
           while mobile navigation is open.
        */
        document.body.classList.toggle("menu-open", isOpen);

    });


    /* ----------------------------------------------------------------------
       Close mobile menu when a link is clicked
       ---------------------------------------------------------------------- */

    const mobileLinks = mobileNav.querySelectorAll("a");

    mobileLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            mobileNav.classList.remove("active");
            menuButton.classList.remove("active");

            menuButton.setAttribute("aria-expanded", "false");

            document.body.classList.remove("menu-open");

        });

    });


    /* ----------------------------------------------------------------------
       Close mobile menu when clicking outside it
       ---------------------------------------------------------------------- */

    document.addEventListener("click", function (event) {

        const clickedInsideMenu =
            mobileNav.contains(event.target);

        const clickedButton =
            menuButton.contains(event.target);

        if (
            mobileNav.classList.contains("active") &&
            !clickedInsideMenu &&
            !clickedButton
        ) {

            mobileNav.classList.remove("active");
            menuButton.classList.remove("active");

            menuButton.setAttribute("aria-expanded", "false");

            document.body.classList.remove("menu-open");

        }

    });

}


/* ==========================================================================
   03. DESKTOP / MOBILE DROPDOWN MENUS
   ========================================================================== */

/*
   Dropdown navigation is controlled mainly by CSS.

   JavaScript adds keyboard and mobile support.

   Required HTML classes:
   .nav-dropdown
   .nav-dropdown-toggle
*/

function initializeDropdowns() {

    const dropdowns =
        document.querySelectorAll(".nav-dropdown");

    if (!dropdowns.length) {
        return;
    }

    dropdowns.forEach(function (dropdown) {

        const toggle =
            dropdown.querySelector(".nav-dropdown-toggle");

        if (!toggle) {
            return;
        }


        /* ------------------------------------------------------------------
           Mobile dropdown click
           ------------------------------------------------------------------ */

        toggle.addEventListener("click", function (event) {

            /*
               Only use click behavior for smaller screens.
            */

            if (window.innerWidth <= 900) {

                event.preventDefault();

                dropdowns.forEach(function (otherDropdown) {

                    if (otherDropdown !== dropdown) {

                        otherDropdown.classList.remove("active");

                    }

                });

                dropdown.classList.toggle("active");

            }

        });


        /* ------------------------------------------------------------------
           Keyboard accessibility
           ------------------------------------------------------------------ */

        toggle.addEventListener("keydown", function (event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                if (window.innerWidth <= 900) {

                    event.preventDefault();

                    dropdown.classList.toggle("active");

                }

            }

        });

    });


    /* ----------------------------------------------------------------------
       Reset dropdowns when resizing to desktop
       ---------------------------------------------------------------------- */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 900) {

            dropdowns.forEach(function (dropdown) {

                dropdown.classList.remove("active");

            });

        }

    });

}


/* ==========================================================================
   04. HEADER SCROLL EFFECT
   ========================================================================== */

/*
   When the visitor scrolls down:
   - Header receives the "scrolled" class.
   - CSS can add shadow/background effects.

   Required HTML class:
   .site-header
*/

function initializeScrollEffects() {

    const header =
        document.querySelector(".site-header");

    if (!header) {
        return;
    }


    function updateHeader() {

        if (window.scrollY > 20) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /*
       Run once when the page loads.
    */

    updateHeader();

}


/* ==========================================================================
   05. MODALS
   ========================================================================== */

/*
   This section supports simple popup/modal windows.

   Example:

   Button:
   <button data-modal-target="#exampleModal">
       Read More
   </button>

   Modal:
   <div id="exampleModal" class="modal">
       ...
   </div>

   Close button:
   <button class="modal-close">
       Close
   </button>
*/

function initializeModals() {

    const modalButtons =
        document.querySelectorAll("[data-modal-target]");

    const modalCloseButtons =
        document.querySelectorAll(".modal-close");


    /* ----------------------------------------------------------------------
       Open modal
       ---------------------------------------------------------------------- */

    modalButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const targetSelector =
                button.getAttribute("data-modal-target");

            const modal =
                document.querySelector(targetSelector);

            if (!modal) {
                return;
            }

            modal.classList.add("active");

            document.body.classList.add("modal-open");

        });

    });


    /* ----------------------------------------------------------------------
       Close modal buttons
       ---------------------------------------------------------------------- */

    modalCloseButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const modal =
                button.closest(".modal");

            if (!modal) {
                return;
            }

            closeModal(modal);

        });

    });


    /* ----------------------------------------------------------------------
       Close modal by clicking background
       ---------------------------------------------------------------------- */

    const modals =
        document.querySelectorAll(".modal");

    modals.forEach(function (modal) {

        modal.addEventListener("click", function (event) {

            if (event.target === modal) {

                closeModal(modal);

            }

        });

    });


    /* ----------------------------------------------------------------------
       Close modal with Escape key
       ---------------------------------------------------------------------- */

    document.addEventListener("keydown", function (event) {

        if (event.key !== "Escape") {
            return;
        }

        const activeModal =
            document.querySelector(".modal.active");

        if (activeModal) {

            closeModal(activeModal);

        }

    });

}


/* --------------------------------------------------------------------------
   Modal closing function
   -------------------------------------------------------------------------- */

function closeModal(modal) {

    modal.classList.remove("active");

    document.body.classList.remove("modal-open");

}


/* ==========================================================================
   06. GALLERY LIGHTBOX
   ========================================================================== */

/*
   This creates a larger image view when a gallery image is clicked.

   Recommended HTML:

   <a
       href="images/example.jpg"
       class="gallery-item"
       data-lightbox="gallery"
   >
       <img src="images/example.jpg" alt="Example">
   </a>

   The script creates the lightbox automatically.
*/

function initializeGalleryLightbox() {

    const galleryItems =
        document.querySelectorAll(
            "[data-lightbox='gallery']"
        );

    if (!galleryItems.length) {
        return;
    }


    /* ----------------------------------------------------------------------
       Create lightbox
       ---------------------------------------------------------------------- */

    const lightbox =
        document.createElement("div");

    lightbox.className = "lightbox";

    lightbox.innerHTML = `
        <div class="lightbox-overlay"></div>

        <button
            class="lightbox-close"
            type="button"
            aria-label="Close image"
        >
            &times;
        </button>

        <div class="lightbox-content">

            <img
                class="lightbox-image"
                src=""
                alt=""
            >

            <div class="lightbox-caption"></div>

        </div>
    `;

    document.body.appendChild(lightbox);


    const lightboxImage =
        lightbox.querySelector(".lightbox-image");

    const lightboxCaption =
        lightbox.querySelector(".lightbox-caption");

    const closeButton =
        lightbox.querySelector(".lightbox-close");

    const overlay =
        lightbox.querySelector(".lightbox-overlay");


    /* ----------------------------------------------------------------------
       Open image
       ---------------------------------------------------------------------- */

    galleryItems.forEach(function (item) {

        item.addEventListener("click", function (event) {

            event.preventDefault();

            const image =
                item.querySelector("img");

            const imageURL =
                item.getAttribute("href") ||
                (image ? image.src : "");

            const imageAlt =
                image
                    ? image.getAttribute("alt") || ""
                    : "";

            if (!imageURL) {
                return;
            }

            lightboxImage.src = imageURL;

            lightboxImage.alt = imageAlt;

            lightboxCaption.textContent = imageAlt;

            lightbox.classList.add("active");

            document.body.classList.add("lightbox-open");

        });

    });


    /* ----------------------------------------------------------------------
       Close lightbox
       ---------------------------------------------------------------------- */

    function closeLightbox() {

        lightbox.classList.remove("active");

        document.body.classList.remove("lightbox-open");

        lightboxImage.src = "";

        lightboxImage.alt = "";

        lightboxCaption.textContent = "";

    }


    closeButton.addEventListener(
        "click",
        closeLightbox
    );

    overlay.addEventListener(
        "click",
        closeLightbox
    );


    /* ----------------------------------------------------------------------
       Escape key
       ---------------------------------------------------------------------- */

    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            lightbox.classList.contains("active")
        ) {

            closeLightbox();

        }

    });

}


/* ==========================================================================
   07. SMOOTH SCROLL
   ========================================================================== */

/*
   Links such as:

   <a href="#mission">Mission</a>

   will smoothly scroll to the relevant section.
*/

function initializeSmoothScroll() {

    const links =
        document.querySelectorAll(
            "a[href^='#']"
        );

    links.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetID =
                link.getAttribute("href");

            if (
                !targetID ||
                targetID === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetID);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

}


/* ==========================================================================
   08. CURRENT YEAR
   ========================================================================== */

/*
   Add this anywhere in HTML:

   <span class="current-year"></span>

   JavaScript automatically inserts the current year.

   Example:
   © <span class="current-year"></span> SHEAC
*/

function initializeCurrentYear() {

    const yearElements =
        document.querySelectorAll(
            ".current-year"
        );

    if (!yearElements.length) {
        return;
    }

    const currentYear =
        new Date().getFullYear();

    yearElements.forEach(function (element) {

        element.textContent = currentYear;

    });

}


/* ==========================================================================
   09. BACK TO TOP BUTTON
   ========================================================================== */

/*
   If a page contains:

   <button id="backToTop">
       ↑
   </button>

   the button will:
   - appear after scrolling
   - scroll the visitor back to the top
*/

function initializeBackToTop() {

    const backToTop =
        document.getElementById("backToTop");

    if (!backToTop) {
        return;
    }


    /* ----------------------------------------------------------------------
       Show / hide button
       ---------------------------------------------------------------------- */

    function updateBackToTop() {

        if (window.scrollY > 400) {

            backToTop.classList.add("visible");

        } else {

            backToTop.classList.remove("visible");

        }

    }


    window.addEventListener(
        "scroll",
        updateBackToTop,
        { passive: true }
    );


    /* ----------------------------------------------------------------------
       Scroll to top
       ---------------------------------------------------------------------- */

    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    updateBackToTop();

}


/* ==========================================================================
   10. FORM HANDLING
   ========================================================================== */

/*
   SHEAC uses direct email/contact methods.

   This section does NOT send form data anywhere automatically.

   It only provides basic front-end validation for forms that are actually
   present on a page.

   IMPORTANT:
   For Volunteer, Membership and Collaboration pages, we can use mailto:
   links or direct email buttons according to the final page design.
*/

function initializeForms() {

    const forms =
        document.querySelectorAll(
            ".sheac-form"
        );

    if (!forms.length) {
        return;
    }


    forms.forEach(function (form) {

        form.addEventListener("submit", function (event) {

            /*
               HTML5 validation handles most fields.

               If the form has invalid fields, prevent submission.
            */

            if (!form.checkValidity()) {

                event.preventDefault();

                form.classList.add("form-error");

                form.reportValidity();

                return;

            }

            form.classList.remove("form-error");

        });

    });

}


/* ==========================================================================
   11. EXTERNAL LINKS
   ========================================================================== */

/*
   External links can optionally open in a new tab.

   Add:

   class="external-link"

   to a link if required.
*/

document.addEventListener("DOMContentLoaded", function () {

    const externalLinks =
        document.querySelectorAll(
            "a.external-link"
        );

    externalLinks.forEach(function (link) {

        link.setAttribute(
            "target",
            "_blank"
        );

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });

});


/* ==========================================================================
   12. ACTIVE NAVIGATION LINK
   ========================================================================== */

/*
   Automatically adds "active" to the navigation link corresponding
   to the current page.

   Example:

   /about/
   → About becomes active

   /projects/
   → Projects becomes active
*/

function initializeActiveNavigation() {

    const currentPath =
        window.location.pathname
            .replace(/\/+$/, "")
            .toLowerCase();

    const navLinks =
        document.querySelectorAll(
            ".desktop-nav a, .mobile-nav a"
        );

    navLinks.forEach(function (link) {

        const linkURL =
            new URL(
                link.href,
                window.location.origin
            );

        let linkPath =
            linkURL.pathname
                .replace(/\/+$/, "")
                .toLowerCase();


        /*
           Homepage handling
        */

        if (
            linkPath === "" ||
            linkPath === "/index.html"
        ) {

            linkPath = "";

        }


        if (
            linkPath === currentPath &&
            linkPath !== ""
        ) {

            link.classList.add("active");

        }

    });

}


/* ==========================================================================
   13. INITIALIZE ACTIVE NAVIGATION
   ========================================================================== */

document.addEventListener(
    "DOMContentLoaded",
    initializeActiveNavigation
);


/* ==========================================================================
   14. IMAGE ERROR HANDLING
   ========================================================================== */

/*
   If an image is missing, this prevents a broken-image icon from making
   the page look unfinished.

   IMPORTANT:
   This does NOT replace the image with a fake SHEAC image.
   It simply adds a class so CSS can style the missing image area.
*/

document.addEventListener("DOMContentLoaded", function () {

    const images =
        document.querySelectorAll("img");

    images.forEach(function (image) {

        image.addEventListener("error", function () {

            image.classList.add("image-error");

        });

    });

});


/* ==========================================================================
   15. ACCESSIBILITY
   ========================================================================== */

/*
   Make keyboard users aware when interactive elements receive focus.
*/

document.addEventListener("keydown", function (event) {

    if (event.key === "Tab") {

        document.body.classList.add("keyboard-navigation");

    }

});


document.addEventListener("mousedown", function () {

    document.body.classList.remove(
        "keyboard-navigation"
    );

});


/* ==========================================================================
   16. PAGE LOADED
   ========================================================================== */

/*
   Small class that can be used by CSS for page-load effects.
*/

window.addEventListener("load", function () {

    document.body.classList.add("page-loaded");

});


/* ==========================================================================
   END OF SHEAC SHARED JAVASCRIPT
   ========================================================================== */
