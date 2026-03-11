function exitPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  preloader.style.transition = 'opacity 0.8s ease';
  preloader.style.opacity = '0';
  setTimeout(() => {
    preloader.style.visibility = 'hidden';
    preloader.style.pointerEvents = 'none';
    document.body.style.overflow = '';
  }, 800);
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(exitPreloader, 2600);
});

window.addEventListener('load', () => {
  setTimeout(exitPreloader, 2600);
});

const cursor = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .skill-pill, .project-card, .social-link').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hovering');
    cursorRing.classList.add('hovering');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hovering');
    cursorRing.classList.remove('hovering');
  });
});

document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
  cursorRing.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
  cursorRing.style.opacity = '1';
});


const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
}, { passive: true });


const hamburger = document.querySelector('.nav-hamburger');
const mobileNav = document.querySelector('.mobile-nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileNav.classList.toggle('open');
  document.body.classList.toggle('menu-open');
});

document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('open');
    document.body.classList.remove('menu-open');
  });
});


const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));


function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1600;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}

const counterEls = document.querySelectorAll('[data-target]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counterEls.forEach(el => counterObserver.observe(el));


const form = document.getElementById('contact-form');
const modal = document.getElementById('success-modal');
const closeModalBtn = document.getElementById('modal-close-btn');

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const originalContent = btn.innerHTML;
    btn.innerHTML = '<span>Transmitting...</span>';
    btn.disabled = true;

    try {
      const data = new FormData(form);
      const res = await fetch('https://formsubmit.co/ajax/chennupatiniraj@gmail.com', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });
      await res.json();
    } catch (_) {}

    modal.classList.add('active');
    form.reset();
    btn.innerHTML = originalContent;
    btn.disabled = false;
  });
}

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', () => modal.classList.remove('active'));
}

modal && modal.addEventListener('click', e => {
  if (e.target === modal) modal.classList.remove('active');
});


document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});