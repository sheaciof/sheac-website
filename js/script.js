// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }
});

// Function to copy text to clipboard (e.g., Bank details)
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("Copied to clipboard: " + text);
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}
