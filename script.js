// ─── SCROLL-BASED ANIMATIONS ───
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.fade-in, .tl-item').forEach((el) => observer.observe(el));

// ─── ADD FADE-IN TO SECTION CHILDREN ───
document.querySelectorAll(
  '.achievement-card, .project-card, .skill-group, .about-text, .about-tags, .contact-card'
).forEach((el) => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ─── COUNTER ANIMATION ───
function animateCounter(el, target, suffix, isFloat) {
  const duration = 1600;
  const start = performance.now();
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = isFloat
      ? (eased * target).toFixed(1)
      : Math.round(eased * target);
    el.querySelector('.achievement-num').textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const card = entry.target;
      const raw = card.dataset.num;
      const suffix = card.dataset.suffix || '';
      const label = card.dataset.label || '';
      const isFloat = raw.includes('.');
      const target = parseFloat(raw);

      card.innerHTML = `
        <span class="achievement-num">0${suffix}</span>
        <p class="achievement-label">${label}</p>
      `;
      animateCounter(card, target, suffix, isFloat);
      counterObserver.unobserve(card);
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll('.achievement-card').forEach((el) => counterObserver.observe(el));

// ─── NAV ACTIVE HIGHLIGHT ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((a) => {
          a.style.color = a.getAttribute('href') === `#${id}` ? '#e8e8f0' : '';
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((s) => navObserver.observe(s));

// ─── SMOOTH NAV CLICK ───
navLinks.forEach((a) => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
