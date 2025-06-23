// scripts.js - Handles tab navigation and section animation for the digital CV

// Select all tab links and main sections
const tabs     = document.querySelectorAll('.tabs__list a');
const sections = document.querySelectorAll('main section');

// Set initial opacity for sections based on 'active' class
sections.forEach(sec => {
  sec.style.transition = '';
  sec.style.opacity = sec.classList.contains('active') ? '1' : '0';
});

// Helper: Detect if device is desktop (for animation)
function isDesktop() {
  return window.matchMedia('(min-width: 1024px)').matches;
}

// Helper: Get tab order for animation direction
const tabOrder = Array.from(tabs).map(tab => tab.getAttribute('href').slice(1));
let lastTabIndex = 0;
// Animation lock: prevents multiple tab animations at once (fixes rapid clicking bug)
let isTabAnimating = false;

// Animate tab change (slide effect on desktop, instant on mobile)
function animateTabChange(oldSection, newSection, tabId) {
  // Animation lock: don't allow new animation until previous finishes
  if (isTabAnimating) return;
  isTabAnimating = true;
  if (isDesktop()) {
    const newTabIndex = tabOrder.indexOf(tabId);
    const oldTabIndex = Array.from(sections).findIndex(sec => sec.classList.contains('active'));
    const direction = newTabIndex > oldTabIndex ? 1 : -1;
    // Slide right if moving to the right, left if to the left
    oldSection.style.transition = 'transform 400ms cubic-bezier(.77,0,.18,1), opacity 350ms';
    oldSection.style.opacity = '0';
    oldSection.style.transform = direction === 1 ? 'translateX(-60px)' : 'translateX(60px)';
    setTimeout(() => {
      oldSection.classList.remove('active');
      newSection.classList.add('active');
      newSection.style.transition = 'none';
      newSection.style.opacity = '0';
      newSection.style.transform = direction === 1 ? 'translateX(60px)' : 'translateX(-60px)';
      // Force reflow for transition
      void newSection.offsetWidth;
      newSection.style.transition = 'transform 400ms cubic-bezier(.77,0,.18,1), opacity 350ms';
      newSection.style.opacity = '1';
      newSection.style.transform = 'translateX(0)';
      // Unlock animation after transition
      isTabAnimating = false;
    }, 350);
  } else {
    // Mobile: no animation, just switch instantly
    oldSection.classList.remove('active');
    newSection.classList.add('active');
    newSection.style.opacity = '1';
    // Unlock animation immediately
    isTabAnimating = false;
  }
}

// Add click event listeners to all tab links
// On click: update active tab, animate section change
tabs.forEach(tab => {
  tab.addEventListener('click', e => {
    e.preventDefault();
    // Prevent tab switch if animation is running (fixes double-click bug)
    if (isTabAnimating) return;
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const targetId = tab.getAttribute('href').slice(1);
    const newSection = Array.from(sections).find(sec => sec.id === targetId);
    const oldSection = Array.from(sections).find(sec => sec.classList.contains('active'));
    if (oldSection !== newSection) {
      animateTabChange(oldSection, newSection, targetId);
    }
  });
});
// End of scripts.js
