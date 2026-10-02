// ================================
// Luca Dal Zilio, Speaker Site
// ================================

/* ---------- Language (EN / IT) ----------
   English is written in the HTML. Italian comes from translations.js
   (window.LDZ_IT), keyed by the data-i18n attribute of each element.
   The choice is remembered in localStorage and can be forced with ?lang=it */
(() => {
  const dict = window.LDZ_IT || {};
  const enHtml = new Map();
  const enCap = new Map();
  const meta = document.querySelector('meta[name="description"]');
  const metaEn = meta ? meta.content : '';

  const apply = (lang) => {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      if (!enHtml.has(el)) enHtml.set(el, el.innerHTML);
      const it = dict[el.dataset.i18n];
      el.innerHTML = (lang === 'it' && it !== undefined) ? it : enHtml.get(el);
    });
    document.querySelectorAll('[data-i18n-cap]').forEach(el => {
      if (!enCap.has(el)) enCap.set(el, el.getAttribute('data-caption'));
      const it = dict[el.dataset.i18nCap];
      el.setAttribute('data-caption', (lang === 'it' && it !== undefined) ? it : enCap.get(el));
    });
    if (meta) meta.content = (lang === 'it' && dict['meta.description']) ? dict['meta.description'] : metaEn;
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang-switch button').forEach(b => {
      const on = b.dataset.lang === lang;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    try { localStorage.setItem('ldz-lang', lang); } catch (e) {}
  };

  const initial = () => {
    const q = new URLSearchParams(location.search).get('lang');
    if (q === 'it' || q === 'en') return q;
    try {
      const s = localStorage.getItem('ldz-lang');
      if (s === 'it' || s === 'en') return s;
    } catch (e) {}
    return /^it\b/i.test(navigator.language || '') ? 'it' : 'en';
  };

  apply(initial());
  document.querySelectorAll('.lang-switch button').forEach(b => {
    b.addEventListener('click', () => apply(b.dataset.lang));
  });
})();

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Sticky nav on scroll ---------- */
  const nav = document.querySelector('.site-nav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile-safe smooth anchor scroll ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const y = target.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    });
  });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => io.observe(el));

  /* ---------- Hero parallax ---------- */
  const heroMedia = document.querySelector('.hero-media img');
  if (heroMedia) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          if (y < window.innerHeight) {
            heroMedia.style.transform = `translateY(${y * 0.18}px) scale(1.02)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---------- Masonry-style gallery via row-span ---------- */
  const grid = document.querySelector('.gallery-grid');
  if (grid) {
    const rowHeight = 10;
    const rowGap = parseInt(getComputedStyle(grid).getPropertyValue('gap')) || 20;

    const resizeItem = (item) => {
      const img = item.querySelector('img');
      if (!img || !img.complete || !img.naturalHeight) return;
      const itemWidth = item.getBoundingClientRect().width;
      const scaledHeight = (img.naturalHeight / img.naturalWidth) * itemWidth;
      const span = Math.ceil((scaledHeight + rowGap) / (rowHeight + rowGap));
      item.style.gridRowEnd = `span ${span}`;
    };

    const resizeAll = () => grid.querySelectorAll('.gallery-item').forEach(resizeItem);

    grid.querySelectorAll('img').forEach(img => {
      if (img.complete) resizeItem(img.closest('.gallery-item'));
      else img.addEventListener('load', () => resizeItem(img.closest('.gallery-item')));
    });

    window.addEventListener('resize', () => {
      clearTimeout(window.__galleryResizeTO);
      window.__galleryResizeTO = setTimeout(resizeAll, 150);
    });

    setTimeout(resizeAll, 300);
  }

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
  const lbImg = lightbox.querySelector('img');
  const lbCap = lightbox.querySelector('.lb-cap');
  const lbClose = lightbox.querySelector('.lb-close');

  document.querySelectorAll('[data-lightbox]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const img = trigger.querySelector('img');
      lbImg.src = img.getAttribute('data-full') || img.src;
      lbImg.alt = img.alt || '';
      lbCap.textContent = trigger.getAttribute('data-caption') || img.alt || '';
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };
  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
  }

  /* ---------- Book carousel ---------- */
  const carousel = document.getElementById('bookCarousel');
  if (carousel) {
    const slides = Array.from(carousel.querySelectorAll('.book-track img'));
    const dotsWrap = carousel.querySelector('.book-dots');
    let idx = 0;
    slides.forEach((_, i) => {
      const d = document.createElement('span');
      if (i === 0) d.classList.add('is-active');
      dotsWrap.appendChild(d);
    });
    const dots = Array.from(dotsWrap.children);
    const show = (n) => {
      idx = (n + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('is-active', i === idx));
      dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
    };
    carousel.querySelector('.prev').addEventListener('click', () => show(idx - 1));
    carousel.querySelector('.next').addEventListener('click', () => show(idx + 1));
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
    let x0 = null;
    carousel.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) show(dx < 0 ? idx + 1 : idx - 1);
      x0 = null;
    });
  }

  /* ---------- Email modal ---------- */
  const emailModal = document.getElementById('emailModal');
  const emailForm = document.getElementById('emailForm');
  const emailClose = document.getElementById('emailModalClose');
  if (emailModal) {

  const openEmailModal = (e) => {
    if (e) e.preventDefault();
    emailModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closeEmailModal = () => {
    emailModal.classList.remove('open');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.js-email-trigger').forEach(trigger => {
    trigger.addEventListener('click', openEmailModal);
  });
  emailClose.addEventListener('click', closeEmailModal);
  emailModal.addEventListener('click', (e) => { if (e.target === emailModal) closeEmailModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeEmailModal(); });

  emailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = emailForm.name.value.trim();
    const email = emailForm.email.value.trim();
    const message = emailForm.message.value.trim();
    const subject = 'Speaking inquiry from ' + name;
    const body = message + '\n\n— ' + name + ' (' + email + ')';
    const mailto = 'mailto:dalzilio.luca@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    window.location.href = mailto;
    closeEmailModal();
    emailForm.reset();
  });
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
