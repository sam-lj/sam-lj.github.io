const tabs     = document.querySelectorAll('.tabs__list a');
const sections = document.querySelectorAll('main section');

sections.forEach(sec => {
  sec.style.transition = '';
  sec.style.opacity = sec.classList.contains('active') ? '1' : '0';
});

// Add a background overlay for fading images
let bgOverlay = document.createElement('div');
bgOverlay.id = 'bg-fade-overlay';
bgOverlay.style.position = 'fixed';
bgOverlay.style.top = '0';
bgOverlay.style.left = '0';
bgOverlay.style.width = '100vw';
bgOverlay.style.height = '100vh';
bgOverlay.style.zIndex = '-1';
bgOverlay.style.transition = 'opacity 350ms';
bgOverlay.style.backgroundSize = 'cover';
bgOverlay.style.backgroundPosition = 'center center';
bgOverlay.style.backgroundRepeat = 'no-repeat';
bgOverlay.style.backgroundAttachment = 'fixed';
document.body.prepend(bgOverlay);

function isDesktop() {
  return window.matchMedia('(min-width: 1024px)').matches;
}

const desktopBgImages = {
  about: '/digi_cv/img/about_me.jpg',
  experience: '/digi_cv/img/experience.webp',
  skills: '/digi_cv/img/Skills.webp',
  projects: '/digi_cv/img/projects.webp',
  'link-tree': '/digi_cv/img/link_tree.jpeg'
};

function setBgForTab(tabId) {
  if (isDesktop()) {
    bgOverlay.style.backgroundImage = `url('${desktopBgImages[tabId] || desktopBgImages['about']}')`;
  } else {
    bgOverlay.style.backgroundImage = `url('/saj2378/digi_cv/img/link_tree.jpeg')`;
  }
}

// Set initial background
setBgForTab('about');
bgOverlay.style.opacity = '1';

function animateTabChange(oldSection, newSection, tabId) {
  if (isDesktop()) {
    // Desktop: animated slide/fade and background fade
    oldSection.style.transition = 'opacity 350ms, transform 350ms';
    oldSection.style.opacity = '0';
    oldSection.style.transform = 'translateY(40px)';
    bgOverlay.style.transition = 'opacity 350ms';
    bgOverlay.style.opacity = '0';
    setTimeout(() => {
      oldSection.classList.remove('active');
      newSection.classList.add('active');
      newSection.style.transition = 'none';
      newSection.style.opacity = '0';
      newSection.style.transform = 'translateY(40px)';
      setBgForTab(tabId);
      bgOverlay.style.opacity = '1';
      // Force reflow
      void newSection.offsetWidth;
      newSection.style.transition = 'opacity 350ms, transform 350ms';
      newSection.style.opacity = '1';
      newSection.style.transform = 'translateY(0)';
    }, 350);
  } else {
    // Mobile: no animation, always link_tree.jpeg
    oldSection.classList.remove('active');
    newSection.classList.add('active');
    newSection.style.opacity = '1';
    setBgForTab(tabId);
    bgOverlay.style.opacity = '1';
  }
}

tabs.forEach(tab => {
  tab.addEventListener('click', e => {
    e.preventDefault();
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const targetId = tab.getAttribute('href').slice(1);
    const newSection = Array.from(sections).find(sec => sec.id === targetId);
    const oldSection = Array.from(sections).find(sec => sec.classList.contains('active'));
    if (oldSection !== newSection) {
      animateTabChange(oldSection, newSection, targetId);
    } else {
      setBgForTab(targetId);
    }
    document.body.style.backgroundImage = '';
  });
});

// Update background on resize
window.addEventListener('resize', () => {
  const activeTab = document.querySelector('.tabs__list a.active');
  const tabId = activeTab ? activeTab.getAttribute('href').slice(1) : 'about';
  setBgForTab(tabId);
});
