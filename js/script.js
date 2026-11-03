/* =====================================================
   SHEAC OFFICIAL WEBSITE — MAIN JAVASCRIPT FILE
   -----------------------------------------------------
   This file is loaded on EVERY page of the website.
   It only handles small interactive UI behaviour:

     1. Mobile hamburger menu (open/close)
     2. Mobile "About" / "Get Involved" accordion toggles
     3. Bank details modal (Donation & Membership pages)
     4. "Copy Details" button for bank account info
     5. Image lightbox (Gallery page)

   There is NO page routing here. Every page is a real,
   separate HTML file, so normal <a href="..."> links are
   used everywhere instead of JavaScript navigation.
   ===================================================== */

/* -----------------------------------------------------
    PAGE HERO VIDEO BACKGROUND
    ----------------------------------------------------- */
function addPageHeroVideo() {
     if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

     const scriptUrl = document.currentScript?.src;
     if (!scriptUrl) return;

     document.querySelectorAll('.page-hero').forEach((hero) => {
          const video = document.createElement('video');
          video.className = 'page-hero-video';
          video.autoplay = true;
          video.muted = true;
          video.loop = true;
          video.playsInline = true;
          video.preload = 'metadata';
          video.setAttribute('aria-hidden', 'true');

          const source = document.createElement('source');
          source.src = new URL('../videos/SHEAC_Intro_VIDEO.mp4', scriptUrl).href;
          source.type = 'video/mp4';
          video.appendChild(source);
          hero.prepend(video);
     });
}

addPageHeroVideo();

function startHomeHeroSlideshow() {
    const slides = document.querySelectorAll('.home-hero-slide');
    if (slides.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let activeIndex = 0;
    window.setInterval(() => {
        slides[activeIndex].classList.remove('is-active');
        activeIndex = (activeIndex + 1) % slides.length;
        slides[activeIndex].classList.add('is-active');
    }, 3000);
}

startHomeHeroSlideshow();

/* -----------------------------------------------------
   1. MOBILE MENU TOGGLE
   ----------------------------------------------------- */
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (!menu) return;
    menu.classList.toggle('hidden');

    const btn = document.getElementById('mobileMenuBtn');
    if (btn) {
        const isOpen = !menu.classList.contains('hidden');
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }
}

/* -----------------------------------------------------
   2. MOBILE ACCORDION (for "About" / "Get Involved"
      groups inside the mobile menu)
   ----------------------------------------------------- */
function toggleMobileAccordion(id) {
    const panel = document.getElementById(id);
    if (!panel) return;
    panel.classList.toggle('hidden');

    const icon = document.getElementById(id + '-icon');
    if (icon) {
        icon.classList.toggle('rotate-180');
    }
}

/* -----------------------------------------------------
   3. BANK DETAILS MODAL
      Used on: get-involved/donation/ and
               get-involved/membership/
   ----------------------------------------------------- */
function toggleBankDetailsModal() {
    const modal = document.getElementById('bankModal');
    if (!modal) return;
    modal.classList.toggle('hidden');
}

/* -----------------------------------------------------
   4. COPY BANK DETAILS TO CLIPBOARD
      EDIT the text below if the real bank details change.
   ----------------------------------------------------- */
function copyBankDetails() {
    const textToCopy =
        "Bank: Official SHEAC Account\n" +
        "Account No: XXXXXXXXXXXXXXXX\n" +
        "Branch: Pokhara, Nepal\n" +
        "Account Holder: Self Help Environment Awareness Camp";

    navigator.clipboard.writeText(textToCopy).then(() => {
        alert("Bank account details copied to clipboard!");
    }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert("Bank account details copied!");
    });
}

/* -----------------------------------------------------
   5. IMAGE LIGHTBOX (Gallery page)
   ----------------------------------------------------- */
function openLightbox(imgUrl, caption) {
    const modal = document.getElementById('lightboxModal');
    const img = document.getElementById('lightboxImg');
    const cap = document.getElementById('lightboxCaption');
    if (!modal || !img) return;

    img.src = imgUrl;
    if (cap) cap.innerText = caption || '';
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

/* Close lightbox when pressing the Escape key */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
        const bankModal = document.getElementById('bankModal');
        if (bankModal) bankModal.classList.add('hidden');
    }
});

/* -----------------------------------------------------
   6. MEMBERSHIP FORM (mailto-based, no backend)
   ----------------------------------------------------- */
function handleMembershipSubmit(event) {
    event.preventDefault();
    alert("Thank you! Your email app will now open so you can send your membership details to SHEAC.");
    window.location.href =
        "mailto:info@sheac.org.np?subject=SHEAC%20Membership%20Application&body=Full%20Name%3A%0ADate%20of%20Birth%3A%0AContact%20Number%3A%0AEmail%3A%0A%0A(Attach%20your%20photo%20and%20payment%20confirmation%20to%20this%20email)";
}

/* -----------------------------------------------------
   7. CLOSE MOBILE MENU WHEN A LINK IS CLICKED
      (nice UX when navigating to a new real page)
   ----------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    const activityModal = document.getElementById('activityDetailsModal');
    const activityCards = document.querySelectorAll('.activities-page article.card');

    if (activityModal) {
        const modalImage = document.getElementById('activityDetailsImage');
        const modalCategory = document.getElementById('activityDetailsCategory');
        const modalTitle = document.getElementById('activityDetailsTitle');
        const modalLocation = document.getElementById('activityDetailsLocation');
        const modalDescription = document.getElementById('activityDetailsDescription');
        const closeButton = document.getElementById('closeActivityDetails');
        let lastFocusedElement = null;

        const openActivityDetails = (card) => {
            const image = card.querySelector('img');
            const category = card.querySelector('.badge');
            const title = card.querySelector('h3');
            const location = card.querySelector('p.text-xs');
            const description = card.querySelector('p.text-gray-600.text-sm.leading-relaxed');

            if (!image || !category || !title || !location || !description) return;

            modalImage.src = image.src;
            modalImage.alt = image.alt;
            modalCategory.textContent = category.textContent.trim();
            modalTitle.textContent = title.textContent.trim();
            modalLocation.textContent = location.textContent.trim();
            modalDescription.textContent = description.textContent.trim();

            lastFocusedElement = document.activeElement;
            activityModal.classList.remove('hidden');
            activityModal.classList.add('flex');
            document.body.style.overflow = 'hidden';
            closeButton.focus();
        };

        const closeActivityDetails = () => {
            activityModal.classList.add('hidden');
            activityModal.classList.remove('flex');
            document.body.style.overflow = '';
            if (lastFocusedElement) lastFocusedElement.focus();
        };

        closeButton.addEventListener('click', closeActivityDetails);
        activityModal.addEventListener('click', (event) => {
            if (event.target === activityModal) closeActivityDetails();
        });
        activityModal.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closeActivityDetails();
        });

        activityCards.forEach((card) => {
            const description = card.querySelector('p.text-gray-600.text-sm.leading-relaxed');
            if (description) description.classList.add('hidden');

            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'activity-toggle';
            button.textContent = 'View details';
            button.addEventListener('click', (event) => {
                event.stopPropagation();
                openActivityDetails(card);
            });
            card.appendChild(button);

            card.addEventListener('click', (event) => {
                if (event.target.closest('button')) return;
                openActivityDetails(card);
            });

            card.setAttribute('tabindex', '0');
            card.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openActivityDetails(card);
                }
            });
        });
    }

    const gallerySliders = document.querySelectorAll('.gallery-slider');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    gallerySliders.forEach((slider) => {
        let pausedUntil = 0;
        const pauseTemporarily = () => {
            pausedUntil = Date.now() + 5000;
        };

        const controls = document.createElement('div');
        controls.className = 'gallery-slider-controls';

        const createControl = (direction, icon, label) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'gallery-slider-control';
            button.setAttribute('aria-label', `${label} ${slider.getAttribute('aria-label') || 'items'}`);
            button.innerHTML = `<i class="fa-solid ${icon}" aria-hidden="true"></i>`;
            button.addEventListener('click', () => {
                const firstItem = slider.firstElementChild;
                if (!firstItem) return;

                const styles = window.getComputedStyle(slider);
                const gap = parseFloat(styles.columnGap) || 0;
                const distance = firstItem.getBoundingClientRect().width + gap;
                const maxScroll = slider.scrollWidth - slider.clientWidth;
                const nextPosition = slider.scrollLeft + direction * distance;
                const targetPosition = direction > 0
                    ? (slider.scrollLeft >= maxScroll - 2 ? 0 : Math.min(nextPosition, maxScroll))
                    : (slider.scrollLeft <= 2 ? maxScroll : Math.max(nextPosition, 0));

                slider.scrollTo({
                    left: targetPosition,
                    behavior: 'smooth'
                });
                pauseTemporarily();
            });
            return button;
        };

        controls.append(
            createControl(-1, 'fa-chevron-left', 'Previous'),
            createControl(1, 'fa-chevron-right', 'Next')
        );
        slider.after(controls);

        slider.addEventListener('pointerdown', pauseTemporarily);
        slider.addEventListener('mouseenter', () => {
            pausedUntil = Number.POSITIVE_INFINITY;
        });
        slider.addEventListener('mouseleave', () => {
            pausedUntil = 0;
        });
        slider.addEventListener('focusin', () => {
            pausedUntil = Number.POSITIVE_INFINITY;
        });
        slider.addEventListener('focusout', (event) => {
            if (!slider.contains(event.relatedTarget)) pausedUntil = 0;
        });

        if (reduceMotion) return;

        window.setInterval(() => {
            if (Date.now() < pausedUntil) return;

            const maxScroll = slider.scrollWidth - slider.clientWidth;
            if (maxScroll <= 1) return;

            if (slider.scrollLeft >= maxScroll - 2) {
                slider.scrollLeft = 0;
                return;
            }

            const firstItem = slider.firstElementChild;
            if (!firstItem) return;

            const styles = window.getComputedStyle(slider);
            const gap = parseFloat(styles.columnGap) || 0;
            slider.scrollBy({
                left: firstItem.getBoundingClientRect().width + gap,
                behavior: 'smooth'
            });
        }, 3500);
    });
});

function closeActivityDetailsModal() {
    const modal = document.getElementById('activityDetailsModal');
    if (!modal || modal.classList.contains('hidden')) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
}
