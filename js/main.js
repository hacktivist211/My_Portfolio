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

// Custom cursor removed — using native cursor


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


const slideTrack = document.getElementById('slide-track');
const slidePrev = document.getElementById('slide-prev');
const slideNext = document.getElementById('slide-next');
const slideProgressBar = document.getElementById('slide-progress-bar');
const slideCounter = document.getElementById('slide-counter');

if (slideTrack) {
  const CARD_WIDTH = 340 + 1.5;
  const TOTAL = slideTrack.querySelectorAll('.slide-card').length;
  let isDragging = false;
  let startX = 0;
  let scrollStart = 0;

  function updateSlideUI() {
    const maxScroll = slideTrack.scrollWidth - slideTrack.clientWidth;
    const progress = maxScroll > 0 ? (slideTrack.scrollLeft / maxScroll) * 100 : 0;
    if (slideProgressBar) slideProgressBar.style.width = Math.max(8, progress) + '%';
    const current = Math.round(slideTrack.scrollLeft / CARD_WIDTH) + 1;
    if (slideCounter) slideCounter.textContent = String(current).padStart(2, '0') + ' / ' + String(TOTAL).padStart(2, '0');
  }

  slideTrack.addEventListener('scroll', updateSlideUI, { passive: true });

  if (slidePrev) slidePrev.addEventListener('click', () => {
    slideTrack.scrollBy({ left: -CARD_WIDTH * 3, behavior: 'smooth' });
  });
  if (slideNext) slideNext.addEventListener('click', () => {
    slideTrack.scrollBy({ left: CARD_WIDTH * 3, behavior: 'smooth' });
  });

  slideTrack.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.pageX;
    scrollStart = slideTrack.scrollLeft;
    slideTrack.classList.add('dragging');
  });
  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const dx = e.pageX - startX;
    slideTrack.scrollLeft = scrollStart - dx;
  });
  window.addEventListener('mouseup', () => {
    isDragging = false;
    slideTrack.classList.remove('dragging');
  });

  slideTrack.addEventListener('touchstart', e => {
    startX = e.touches[0].pageX;
    scrollStart = slideTrack.scrollLeft;
  }, { passive: true });
  slideTrack.addEventListener('touchmove', e => {
    const dx = e.touches[0].pageX - startX;
    slideTrack.scrollLeft = scrollStart - dx;
  }, { passive: true });

  updateSlideUI();
}


const progressBars = document.querySelectorAll('.progress-bar-fill[data-width]');
const progressObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const w = entry.target.getAttribute('data-width');
      entry.target.style.width = w + '%';
      progressObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
progressBars.forEach(bar => progressObserver.observe(bar));


const terminalLines = document.querySelectorAll('.terminal-line[data-delay]');
const terminalObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      terminalLines.forEach(line => {
        const delay = parseInt(line.getAttribute('data-delay'), 10);
        setTimeout(() => line.classList.add('visible'), delay);
      });
      terminalObserver.disconnect();
    }
  });
}, { threshold: 0.2 });
if (terminalLines.length > 0) terminalObserver.observe(terminalLines[0]);


function openProjectModal(idx) {
  const p = PROJECT_DATA[idx];
  if (!p) return;

  const body = document.getElementById('project-modal-body');
  const footer = document.getElementById('project-modal-footer');
  const overlay = document.getElementById('project-modal');

  body.innerHTML = `
    <div class="project-modal-index">${p.num} / 19</div>
    <h2 class="project-modal-title">${p.title}</h2>
    <div class="project-modal-tags">
      ${p.tags.map(t => `<span class="project-modal-tag">${t}</span>`).join('')}
    </div>
    <div class="project-modal-section-label">Overview</div>
    <p class="project-modal-desc">${p.overview}</p>
    <div class="project-modal-divider"></div>
    <div class="project-modal-section-label">Key Details</div>
    <ul class="project-modal-highlights">
      ${p.highlights.map(h => `<li class="project-modal-highlight">${h}</li>`).join('')}
    </ul>
    <div class="project-modal-divider"></div>
    <div class="project-modal-section-label">In One Line</div>
    <p class="project-modal-desc"><strong>${p.what}</strong></p>
  `;

  footer.innerHTML = `
    <a href="${p.repo}" target="_blank" rel="noopener noreferrer" class="btn-primary">
      <span>View Repository</span>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7H11.5M11.5 7L7.5 3M11.5 7L7.5 11" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </a>
    <button class="btn-outline" onclick="closeProjectModal()">Close</button>
  `;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const overlay = document.getElementById('project-modal');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

const pmClose = document.getElementById('project-modal-close');
if (pmClose) pmClose.addEventListener('click', closeProjectModal);

const pmOverlay = document.getElementById('project-modal');
if (pmOverlay) {
  pmOverlay.addEventListener('click', e => {
    if (e.target === pmOverlay) closeProjectModal();
  });
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeProjectModal();
    const sm = document.getElementById('success-modal');
    if (sm) sm.classList.remove('active');
  }
});
