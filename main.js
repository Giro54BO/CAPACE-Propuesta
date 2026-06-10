/* ============================================================
   NAV — shadow via IntersectionObserver on sentinel element
   ============================================================ */
const nav = document.querySelector('.nav');
const sentinel = document.getElementById('nav-sentinel');

if (nav && sentinel) {
  new IntersectionObserver(
    ([entry]) => nav.classList.toggle('is-scrolled', !entry.isIntersecting),
    { threshold: 0 }
  ).observe(sentinel);
}

/* ============================================================
   HAMBURGER — mobile menu toggle
   ============================================================ */
const hamburger = document.querySelector('.nav__hamburger');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    const next = !isOpen;

    hamburger.setAttribute('aria-expanded', String(next));
    mobileMenu.classList.toggle('is-open', next);
    mobileMenu.setAttribute('aria-hidden', String(!next));
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('is-open');
      mobileMenu.setAttribute('aria-hidden', 'true');
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('is-open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      hamburger.focus();
    }
  });
}

/* ============================================================
   ACTIVE NAV LINK — highlights current section in view
   ============================================================ */
const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');
const pageSections = document.querySelectorAll('main section[id], footer[id]');

if (navLinks.length && pageSections.length) {
  const markActive = (id) => {
    navLinks.forEach(link => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
    });
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) markActive(entry.target.id);
    });
  }, {
    threshold: 0.1,
    rootMargin: `-88px 0px -20% 0px`,
  });

  pageSections.forEach(s => sectionObserver.observe(s));
}

/* ============================================================
   MOTION — gate all animation behind prefers-reduced-motion
   ============================================================ */
const prefersMotion = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

/* ============================================================
   STATS COUNT-UP
   Animates numbers from 0 to their final value on scroll-in.
   ============================================================ */
if (prefersMotion) {
  const statsNumbers = document.querySelectorAll('.stats__number');

  if (statsNumbers.length) {
    const easeOut = t => 1 - Math.pow(1 - t, 3);

    const animateCount = el => {
      const raw = el.textContent.trim();
      const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
      const suffix = raw.replace(/[0-9.]/g, '');
      const duration = 1000;
      const start = performance.now();

      const tick = now => {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(easeOut(progress) * num) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    statsNumbers.forEach(el => statsObserver.observe(el));
  }
}

/* ============================================================
   SCROLL REVEALS
   JS adds .reveal to [data-reveal] elements so no-JS users
   see all content by default. IntersectionObserver triggers
   .is-visible when the element enters the viewport.
   ============================================================ */
const revealTargets = document.querySelectorAll('[data-reveal]');

if (prefersMotion && revealTargets.length) {
  revealTargets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -32px 0px',
  });

  revealTargets.forEach(el => observer.observe(el));
}
