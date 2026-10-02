/**
 * FRIENDS SYNDICATE CLEARING PVT. LTD. (FSCPL)
 * Clean, lightweight front-end logic (Zero backend, direct WhatsApp & Phone dispatch)
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initHeaderScroll();
  initStatsCounter();
});

/* ==========================================================================
   1. Clean Mobile Navigation (Pure toggle, zero DOM injection)
   ========================================================================== */
function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const closeBtn = document.getElementById('mobileCloseBtn');
  const mobileNav = document.getElementById('mobileNav');
  const mobileOverlay = document.getElementById('mobileOverlay');

  if (!toggleBtn || !mobileNav) return;

  function openMenu() {
    mobileNav.classList.add('mobile-open');
    if (mobileOverlay) mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileNav.classList.remove('mobile-open');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openMenu();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMenu();
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMenu);
  }

  // Close when clicking any link inside mobile navigation
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close with Esc key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('mobile-open')) {
      closeMenu();
    }
  });

  // Close menu if viewport expanded past mobile/tablet breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 991 && mobileNav.classList.contains('mobile-open')) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   2. Sticky Header Scroll Effect
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.header, .site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   3. Stats Counter Animation (20+ Years, 53 Trucks, 125+ Countries, etc.)
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-num[data-target]');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        animateValue(el, 0, target, 1400);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  statNumbers.forEach(num => observer.observe(num));
}

function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const suffix = element.getAttribute('data-suffix') || '';
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easeOutQuad = 1 - (1 - progress) * (1 - progress);
    const current = Math.floor(easeOutQuad * (end - start) + start);
    element.innerHTML = `${current}<span class="stat-plus">${suffix}</span>`;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.innerHTML = `${end}<span class="stat-plus">${suffix}</span>`;
    }
  };
  window.requestAnimationFrame(step);
}
