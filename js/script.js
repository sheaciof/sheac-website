/* ==========================================================================
   SHEAC OFFICIAL WEBSITE — INTERACTIVE CONTROLLER
   Self Help Environment Awareness Camp (SHEAC) | Pokhara, Kaski, Nepal
   File: js/script.js
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // 1. DYNAMIC YEAR IN FOOTER
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. MOBILE MENU TOGGLE
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      const isExpanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";
      mobileMenuBtn.setAttribute("aria-expanded", !isExpanded);
      mobileMenu.classList.toggle("hidden");
    });
  }

  // 3. LIGHTBOX GALLERY
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (lightboxModal && lightboxImg && galleryItems.length > 0) {
    galleryItems.forEach((item) => {
      item.addEventListener("click", () => {
        const img = item.querySelector("img");
        const caption = item.getAttribute("data-caption") || img.alt;

        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        if (lightboxCaption) {
          lightboxCaption.textContent = caption;
        }

        lightboxModal.classList.remove("hidden");
        lightboxModal.classList.add("flex");
        document.body.style.overflow = "hidden";
      });
    });

    const closeLightbox = () => {
      lightboxModal.classList.add("hidden");
      lightboxModal.classList.remove("flex");
      document.body.style.overflow = "auto";
    };

    if (lightboxClose) {
      lightboxClose.addEventListener("click", closeLightbox);
    }

    lightboxModal.addEventListener("click", (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !lightboxModal.classList.contains("hidden")) {
        closeLightbox();
      }
    });
  }

  // 4. DIRECTORY FILTERING (Executive, Founding, Alumni)
  const filterButtons = document.querySelectorAll(".filter-btn");
  const directoryCards = document.querySelectorAll(".person-card");

  if (filterButtons.length > 0 && directoryCards.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.getAttribute("data-category");

        filterButtons.forEach((btn) => {
          btn.classList.remove("bg-green-800", "text-white");
          btn.classList.add("bg-white", "text-gray-700");
        });

        button.classList.remove("bg-white", "text-gray-700");
        button.classList.add("bg-green-800", "text-white");

        directoryCards.forEach((card) => {
          const cardCategory = card.getAttribute("data-category");
          if (category === "all" || cardCategory === category) {
            card.style.display = "flex";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  // 5. ACCORDION / FAQ TOGGLES
  const accordionHeaders = document.querySelectorAll(".accordion-header");
  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      const icon = header.querySelector(".accordion-icon");

      if (content) {
        content.classList.toggle("hidden");
        if (icon) {
          icon.classList.toggle("rotate-180");
        }
      }
    });
  });
});
