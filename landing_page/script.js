// ─── MOBILE NAV TOGGLE ───
function toggleNav() {
  document.getElementById('mobile-nav').classList.toggle('open');
}

// ─── SCROLL REVEAL ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ─── STAT COUNTER ANIMATION ───
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const text = el.textContent.replace(/[^0-9]/g, '');
    const target = parseInt(text);
    if (!target) return;
    let current = 0;
    const step = target / 60;
    const suffix = el.querySelector('.stat-suffix')?.outerHTML || '';
    const prefix = el.textContent.includes('+') ? '+' : '';
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.innerHTML = Math.floor(current).toLocaleString() + prefix + suffix;
      if (current >= target) clearInterval(timer);
    }, 20);
  });
}

const statsSection = document.getElementById('stats');
const statsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    animateCounters();
    statsObserver.disconnect();
  }
}, { threshold: 0.3 });
statsObserver.observe(statsSection);

// ─── STICKY NAV SHADOW ───
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.style.boxShadow = window.scrollY > 50 ? '0 4px 24px rgba(0,0,0,0.2)' : 'none';
});
