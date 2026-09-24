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
});
