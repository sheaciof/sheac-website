/* ==========================================================================
   SHEAC OFFICIAL WEBSITE
   Shared JavaScript
   Organization: Self Help Environment Awareness Camp (SHEAC)
   Location: Pokhara, Kaski, Nepal

   This file controls:
   1. Mobile navigation
   2. Desktop dropdown menus
   3. Sticky header behavior
   4. Back-to-top button
   5. Smooth scrolling
   6. Gallery lightbox
   7. Current-page navigation state
   8. Basic accessibility behavior
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ======================================================================
       1. MOBILE MENU
       ====================================================================== */

    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const menuIcon = document.getElementById("menuIcon");

    if (mobileMenuBtn && mobileMenu) {

        mobileMenuBtn.addEventListener("click", function () {

            const isOpen =
                mobileMenu.classList.contains("mobile-menu-open");

            if (isOpen) {

                mobileMenu.classList.remove("mobile-menu-open");

                mobileMenuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                mobileMenuBtn.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                if (menuIcon) {
                    menuIcon.classList.remove("fa-xmark");
                    menuIcon.classList.add("fa-bars");
                }

            } else {

                mobileMenu.classList.add("mobile-menu-open");

                mobileMenuBtn.setAttribute(
                    "aria-expanded",
                    "true"
                );

                mobileMenuBtn.setAttribute(
                    "aria-label",
                    "Close navigation menu"
                );

                if (menuIcon) {
                    menuIcon.classList.remove("fa-bars");
                    menuIcon.classList.add("fa-xmark");
                }

            }

        });


        /* ---------------------------------------------------------------
           Close mobile menu after clicking a link
           --------------------------------------------------------------- */

        const mobileLinks =
            mobileMenu.querySelectorAll("a");

        mobileLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                mobileMenu.classList.remove(
                    "mobile-menu-open"
                );

                mobileMenuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                mobileMenuBtn.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                if (menuIcon) {

                    menuIcon.classList.remove("fa-xmark");

                    menuIcon.classList.add("fa-bars");

                }

            });

        });

    }


    /* ======================================================================
       2. DESKTOP DROPDOWN MENUS
       ====================================================================== */

    const dropdowns =
        document.querySelectorAll(".nav-dropdown");


    dropdowns.forEach(function (dropdown) {

        const button =
            dropdown.querySelector(".nav-dropdown-button");

        const menu =
            dropdown.querySelector(".dropdown-menu");


        if (!button || !menu) {
            return;
        }


        /* ---------------------------------------------------------------
           Keyboard accessibility
           --------------------------------------------------------------- */

        button.addEventListener("click", function (event) {

            event.preventDefault();

            const currentlyOpen =
                dropdown.classList.contains("dropdown-open");


            /* Close every other dropdown */

            dropdowns.forEach(function (otherDropdown) {

                if (otherDropdown !== dropdown) {

                    otherDropdown.classList.remove(
                        "dropdown-open"
                    );

                }

            });


            /* Toggle current dropdown */

            if (currentlyOpen) {

                dropdown.classList.remove(
                    "dropdown-open"
                );

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );

            } else {

                dropdown.classList.add(
                    "dropdown-open"
                );

                button.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });


        /* ---------------------------------------------------------------
           Keyboard support
           --------------------------------------------------------------- */

        button.addEventListener("keydown", function (event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                button.click();

            }

        });

    });


    /* ======================================================================
       3. CLOSE DROPDOWNS WHEN CLICKING OUTSIDE
       ====================================================================== */

    document.addEventListener("click", function (event) {

        const clickedInsideDropdown =
            event.target.closest(".nav-dropdown");

        if (!clickedInsideDropdown) {

            dropdowns.forEach(function (dropdown) {

                dropdown.classList.remove(
                    "dropdown-open"
                );

                const button =
                    dropdown.querySelector(
                        ".nav-dropdown-button"
                    );

                if (button) {

                    button.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            });

        }

    });


    /* ======================================================================
       4. CLOSE MENUS WITH ESCAPE KEY
       ====================================================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key !== "Escape") {
            return;
        }


        /* Close desktop dropdowns */

        dropdowns.forEach(function (dropdown) {

            dropdown.classList.remove(
                "dropdown-open"
            );

            const button =
                dropdown.querySelector(
                    ".nav-dropdown-button"
                );

            if (button) {

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });


        /* Close mobile menu */

        if (
            mobileMenu &&
            mobileMenu.classList.contains(
                "mobile-menu-open"
            )
        ) {

            mobileMenu.classList.remove(
                "mobile-menu-open"
            );

            if (mobileMenuBtn) {

                mobileMenuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

            if (menuIcon) {

                menuIcon.classList.remove(
                    "fa-xmark"
                );

                menuIcon.classList.add(
                    "fa-bars"
                );

            }

        }

    });


    /* ======================================================================
       5. STICKY HEADER
       ====================================================================== */

    const siteHeader =
        document.querySelector(".site-header");

    if (siteHeader) {

        const headerScrollPoint = 20;


        function updateHeader() {

            if (window.scrollY > headerScrollPoint) {

                siteHeader.classList.add(
                    "header-scrolled"
                );

            } else {

                siteHeader.classList.remove(
                    "header-scrolled"
                );

            }

        }


        updateHeader();

        window.addEventListener(
            "scroll",
            updateHeader,
            { passive: true }
        );

    }


    /* ======================================================================
       6. BACK TO TOP BUTTON
       ====================================================================== */

    const backToTop =
        document.getElementById("backToTop");


    if (backToTop) {

        function updateBackToTop() {

            if (window.scrollY > 500) {

                backToTop.classList.add(
                    "back-to-top-visible"
                );

            } else {

                backToTop.classList.remove(
                    "back-to-top-visible"
                );

            }

        }


        updateBackToTop();


        window.addEventListener(
            "scroll",
            updateBackToTop,
            { passive: true }
        );


        backToTop.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* ======================================================================
       7. SMOOTH INTERNAL LINK SCROLLING
       ====================================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(targetId);


            if (!target) {
                return;
            }


            event.preventDefault();


            const header =
                document.querySelector(
                    ".site-header"
                );


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                20;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });


    /* ======================================================================
       8. CURRENT PAGE NAVIGATION
       ====================================================================== */

    const currentPath =
        window.location.pathname
            .replace(/\/+$/, "");


    const navigationLinks =
        document.querySelectorAll(
            ".main-nav a, .mobile-menu a"
        );


    navigationLinks.forEach(function (link) {

        const linkUrl =
            new URL(
                link.href,
                window.location.origin
            );


        let linkPath =
            linkUrl.pathname
                .replace(/\/+$/, "");


        /*
         * Homepage
         */

        if (
            currentPath === "" &&
            linkPath === ""
        ) {

            link.classList.add(
                "current-page"
            );

            return;

        }


        /*
         * Other pages
         */

        if (
            linkPath &&
            currentPath &&
            currentPath === linkPath
        ) {

            link.classList.add(
                "current-page"
            );

        }

    });


    /* ======================================================================
       9. GALLERY LIGHTBOX
       ====================================================================== */

    const galleryItems =
        document.querySelectorAll(
            "[data-lightbox]"
        );


    if (galleryItems.length > 0) {

        createLightbox();

    }


    function createLightbox() {

        /*
         * Create the lightbox only once.
         */

        let lightbox =
            document.getElementById(
                "sheacLightbox"
            );


        if (!lightbox) {

            lightbox =
                document.createElement("div");

            lightbox.id =
                "sheacLightbox";

            lightbox.className =
                "lightbox";

            lightbox.setAttribute(
                "aria-hidden",
                "true"
            );


            lightbox.innerHTML = `

                <div class="lightbox-backdrop"></div>

                <div class="lightbox-content"
                     role="dialog"
                     aria-modal="true"
                     aria-label="Image preview">

                    <button
                        type="button"
                        class="lightbox-close"
                        aria-label="Close image">

                        <i class="fa-solid fa-xmark"></i>

                    </button>

                    <button
                        type="button"
                        class="lightbox-prev"
                        aria-label="Previous image">

                        <i class="fa-solid fa-chevron-left"></i>

                    </button>

                    <img
                        class="lightbox-image"
                        src=""
                        alt="">

                    <button
                        type="button"
                        class="lightbox-next"
                        aria-label="Next image">

                        <i class="fa-solid fa-chevron-right"></i>

                    </button>

                    <div class="lightbox-caption"></div>

                </div>
            `;


            document.body.appendChild(
                lightbox
            );

        }


        const lightboxImage =
            lightbox.querySelector(
                ".lightbox-image"
            );

        const lightboxCaption =
            lightbox.querySelector(
                ".lightbox-caption"
            );

        const closeButton =
            lightbox.querySelector(
                ".lightbox-close"
            );

        const previousButton =
            lightbox.querySelector(
                ".lightbox-prev"
            );

        const nextButton =
            lightbox.querySelector(
                ".lightbox-next"
            );

        const backdrop =
            lightbox.querySelector(
                ".lightbox-backdrop"
            );


        let currentIndex = 0;


        /*
         * Open image
         */

        function openLightbox(index) {

            if (
                index < 0 ||
                index >= galleryItems.length
            ) {

                return;

            }


            currentIndex = index;


            const item =
                galleryItems[currentIndex];


            const imageSource =
                item.getAttribute(
                    "data-lightbox"
                );


            const caption =
                item.getAttribute(
                    "data-caption"
                ) ||
                item.querySelector("img")?.alt ||
                "";


            lightboxImage.src =
                imageSource;

            lightboxImage.alt =
                caption;

            lightboxCaption.textContent =
                caption;


            lightbox.classList.add(
                "lightbox-open"
            );


            lightbox.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.classList.add(
                "lightbox-active"
            );


            updateLightboxControls();


            closeButton.focus();

        }


        /*
         * Close image
         */

        function closeLightbox() {

            lightbox.classList.remove(
                "lightbox-open"
            );


            lightbox.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body.classList.remove(
                "lightbox-active"
            );


            lightboxImage.src = "";

        }


        /*
         * Previous image
         */

        function showPrevious() {

            if (galleryItems.length === 0) {
                return;
            }


            currentIndex =
                (
                    currentIndex -
                    1 +
                    galleryItems.length
                ) %
                galleryItems.length;


            openLightbox(
                currentIndex
            );

        }


        /*
         * Next image
         */

        function showNext() {

            if (galleryItems.length === 0) {
                return;
            }


            currentIndex =
                (
                    currentIndex +
                    1
                ) %
                galleryItems.length;


            openLightbox(
                currentIndex
            );

        }


        /*
         * Hide navigation buttons when only
         * one gallery item exists.
         */

        function updateLightboxControls() {

            const multiple =
                galleryItems.length > 1;


            previousButton.style.display =
                multiple
                    ? ""
                    : "none";


            nextButton.style.display =
                multiple
                    ? ""
                    : "none";

        }


        /*
         * Gallery item events
         */

        galleryItems.forEach(
            function (item, index) {

                item.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        openLightbox(index);

                    }
                );

                /*
                 * Keyboard accessibility
                 */

                item.addEventListener(
                    "keydown",
                    function (event) {

                        if (
                            event.key === "Enter" ||
                            event.key === " "
                        ) {

                            event.preventDefault();

                            openLightbox(index);

                        }

                    }
                );

                /*
                 * Make non-button elements
                 * keyboard accessible.
                 */

                if (
                    !item.hasAttribute(
                        "tabindex"
                    )
                ) {

                    item.setAttribute(
                        "tabindex",
                        "0"
                    );

                }

            }
        );


        closeButton.addEventListener(
            "click",
            closeLightbox
        );


        backdrop.addEventListener(
            "click",
            closeLightbox
        );


        previousButton.addEventListener(
            "click",
            showPrevious
        );


        nextButton.addEventListener(
            "click",
            showNext
        );


        /*
         * Keyboard controls
         */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    !lightbox.classList.contains(
                        "lightbox-open"
                    )
                ) {

                    return;

                }


                if (event.key === "Escape") {

                    closeLightbox();

                }


                if (event.key === "ArrowLeft") {

                    showPrevious();

                }


                if (event.key === "ArrowRight") {

                    showNext();

                }

            }
        );

    }


    /* ======================================================================
       10. IMAGE ERROR HANDLING
       ====================================================================== */

    const images =
        document.querySelectorAll("img");


    images.forEach(function (image) {

        image.addEventListener(
            "error",
            function () {

                /*
                 * Keep broken images from producing
                 * an ugly browser icon.
                 */

                image.classList.add(
                    "image-error"
                );

            }
        );

    });


    /* ======================================================================
       11. EXTERNAL LINKS
       ====================================================================== */

    const allLinks =
        document.querySelectorAll("a");


    allLinks.forEach(function (link) {

        const href =
            link.getAttribute("href");


        if (!href) {
            return;
        }


        /*
         * Automatically add safe attributes
         * to external links.
         */

        if (
            href.startsWith("http://") ||
            href.startsWith("https://")
        ) {

            const linkUrl =
                new URL(href);


            if (
                linkUrl.hostname !==
                window.location.hostname
            ) {

                link.setAttribute(
                    "target",
                    "_blank"
                );

                link.setAttribute(
                    "rel",
                    "noopener noreferrer"
                );

            }

        }

    });


    /* ======================================================================
       12. MOBILE RESIZE HANDLING
       ====================================================================== */

    window.addEventListener(
        "resize",
        function () {

            /*
             * If the screen becomes desktop-sized,
             * close the mobile menu.
             */

            if (
                window.innerWidth > 900 &&
                mobileMenu &&
                mobileMenu.classList.contains(
                    "mobile-menu-open"
                )
            ) {

                mobileMenu.classList.remove(
                    "mobile-menu-open"
                );


                if (mobileMenuBtn) {

                    mobileMenuBtn.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }


                if (menuIcon) {

                    menuIcon.classList.remove(
                        "fa-xmark"
                    );

                    menuIcon.classList.add(
                        "fa-bars"
                    );

                }

            }

        }
    );


    /* ======================================================================
       13. PREVENT FLASH OF HIDDEN LIGHTBOX
       ====================================================================== */

    const existingLightbox =
        document.getElementById(
            "sheacLightbox"
        );


    if (existingLightbox) {

        existingLightbox.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    /* ======================================================================
       14. PAGE READY
       ====================================================================== */

    document.documentElement.classList.add(
        "js-ready"
    );

});
