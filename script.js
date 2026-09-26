import { translations } from './translations.js';

let currentLang = localStorage.getItem('language') || 'nl';

function applyTranslations(lang) {
  const t = translations[lang];

  const safeUpdate = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.textContent = value;
  };

  safeUpdate('[data-lang="nav-home"]', t.nav.home);
  safeUpdate('[data-lang="nav-services"]', t.nav.services);
  safeUpdate('[data-lang="nav-how-we-work"]', t.nav.howWeWork);
  safeUpdate('[data-lang="nav-about"]', t.nav.about);
  safeUpdate('[data-lang="nav-cta"]', t.nav.cta);

  safeUpdate('[data-lang="hero-title1"]', t.hero.title1);
  safeUpdate('[data-lang="hero-title2"]', t.hero.title2);
  safeUpdate('[data-lang="hero-subtitle"]', t.hero.subtitle);
  safeUpdate('[data-lang="hero-quote-btn"]', t.hero.quoteBtn);
  safeUpdate('[data-lang="hero-services-btn"]', t.hero.servicesBtn);

  safeUpdate('[data-lang="why-title"]', t.why.title);

  safeUpdate('[data-lang="services-title"]', t.services.title);
  safeUpdate('[data-lang="services-subtitle"]', t.services.subtitle);

  safeUpdate('[data-lang="service-residential-title"]', t.services.residential.title);
  safeUpdate('[data-lang="service-residential-desc"]', t.services.residential.description);
  const residentialFeatures = document.querySelectorAll('[data-lang^="service-residential-feature"]');
  residentialFeatures.forEach((el, i) => el.textContent = t.services.residential.features[i]);

  safeUpdate('[data-lang="service-commercial-title"]', t.services.commercial.title);
  safeUpdate('[data-lang="service-commercial-desc"]', t.services.commercial.description);
  const commercialFeatures = document.querySelectorAll('[data-lang^="service-commercial-feature"]');
  commercialFeatures.forEach((el, i) => el.textContent = t.services.commercial.features[i]);

  safeUpdate('[data-lang="service-onetime-title"]', t.services.oneTime.title);
  safeUpdate('[data-lang="service-onetime-desc"]', t.services.oneTime.description);
  const onetimeFeatures = document.querySelectorAll('[data-lang^="service-onetime-feature"]');
  onetimeFeatures.forEach((el, i) => el.textContent = t.services.oneTime.features[i]);

  safeUpdate('[data-lang="service-custom-title"]', t.services.custom.title);
  safeUpdate('[data-lang="service-custom-desc"]', t.services.custom.description);
  const customFeatures = document.querySelectorAll('[data-lang^="service-custom-feature"]');
  customFeatures.forEach((el, i) => el.textContent = t.services.custom.features[i]);

  safeUpdate('[data-lang="service-decluttering-title"]', t.services.decluttering.title);
  safeUpdate('[data-lang="service-decluttering-desc"]', t.services.decluttering.description);
  const declutteringFeatures = document.querySelectorAll('[data-lang^="service-decluttering-feature"]');
  declutteringFeatures.forEach((el, i) => el.textContent = t.services.decluttering.features[i]);

  safeUpdate('[data-lang="how-title"]', t.howWeWork.title);
  safeUpdate('[data-lang="how-subtitle"]', t.howWeWork.subtitle);
  safeUpdate('[data-lang="step-1-title"]', t.howWeWork.steps[0].title);
  safeUpdate('[data-lang="step-1-desc"]', t.howWeWork.steps[0].description);
  safeUpdate('[data-lang="step-2-title"]', t.howWeWork.steps[1].title);
  safeUpdate('[data-lang="step-2-desc"]', t.howWeWork.steps[1].description);
  safeUpdate('[data-lang="step-3-title"]', t.howWeWork.steps[2].title);
  safeUpdate('[data-lang="step-3-desc"]', t.howWeWork.steps[2].description);
  safeUpdate('[data-lang="step-4-title"]', t.howWeWork.steps[3].title);
  safeUpdate('[data-lang="step-4-desc"]', t.howWeWork.steps[3].description);

  safeUpdate('[data-lang="final-cta-title"]', t.finalCta.title);
  safeUpdate('[data-lang="final-cta-subtitle"]', t.finalCta.subtitle);
  safeUpdate('[data-lang="final-cta-btn"]', t.finalCta.button);
  safeUpdate('[data-lang="final-cta-response"]', t.finalCta.response);

  safeUpdate('[data-lang="about-title"]', t.about.title);
  safeUpdate('[data-lang="about-p1"]', t.about.paragraph1);
  safeUpdate('[data-lang="about-p2"]', t.about.paragraph2);
  safeUpdate('[data-lang="about-p3"]', t.about.paragraph3);

  safeUpdate('[data-lang="footer-service-area"]', t.footer.serviceArea);
  safeUpdate('[data-lang="footer-cta"]', t.footer.cta);
  safeUpdate('[data-lang="footer-copyright"]', t.footer.copyright);

  // Generic keys: data-i18n="path.to.value" (numeric segments index into arrays)
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const value = lookup(t, el.getAttribute('data-i18n'));
    if (typeof value === 'string') el.textContent = value;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const value = lookup(t, el.getAttribute('data-i18n-placeholder'));
    if (typeof value === 'string') el.setAttribute('placeholder', value);
  });

  updateQuoteLinks();
}

function lookup(obj, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}

/* =========================
   QUOTE FORM
========================= */

const CONTACT_EMAIL = 'info@crystalclear.nl';
const WHATSAPP_NUMBER = '31623497876';

function getQuoteData() {
  const form = document.getElementById('quote-form');
  if (!form) return null;
  const get = name => (form.elements[name] ? form.elements[name].value.trim() : '');
  return {
    name: get('name'),
    company: get('company'),
    email: get('email'),
    phone: get('phone'),
    service: get('service'),
    message: get('message')
  };
}

function buildQuoteMessage(data) {
  const q = translations[currentLang].quote;
  const lines = [q.greeting, ''];
  ['name', 'company', 'email', 'phone', 'service', 'message'].forEach(key => {
    if (data[key]) lines.push(`${q.fields[key]}: ${data[key]}`);
  });
  return lines.join('\n');
}

function updateQuoteLinks() {
  const data = getQuoteData();
  if (!data) return;
  const subject = encodeURIComponent(translations[currentLang].quote.subject);
  const body = encodeURIComponent(buildQuoteMessage(data));
  const gmail = document.getElementById('quote-gmail');
  const outlook = document.getElementById('quote-outlook');
  if (gmail) gmail.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}&su=${subject}&body=${body}`;
  if (outlook) outlook.href = `https://outlook.live.com/mail/0/deeplink/compose?to=${CONTACT_EMAIL}&subject=${subject}&body=${body}`;
}

function openQuoteModal() {
  const modal = document.getElementById('quote-modal');
  if (!modal) return;
  modal.hidden = false;
  requestAnimationFrame(() => modal.classList.add('open'));
  document.body.style.overflow = 'hidden';
  const firstInput = modal.querySelector('input');
  if (firstInput) setTimeout(() => firstInput.focus(), 150);
}

function closeQuoteModal() {
  const modal = document.getElementById('quote-modal');
  if (!modal || modal.hidden) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { modal.hidden = true; }, 250);
}

function initQuoteForm() {
  const form = document.getElementById('quote-form');
  if (!form) return;
  const error = form.querySelector('.quote-form-error');

  document.querySelectorAll('[data-open-quote]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopImmediatePropagation();
      openQuoteModal();
    });
  });
  document.querySelectorAll('[data-close-quote]').forEach(btn => btn.addEventListener('click', closeQuoteModal));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeQuoteModal(); });

  form.addEventListener('input', updateQuoteLinks);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const q = translations[currentLang].quote;
    const data = getQuoteData();
    let problem = '';
    if (!data.name) problem = q.errorName;
    else if (!data.email && !data.phone) problem = q.errorContact;
    error.textContent = problem;
    error.hidden = !problem;
    if (problem) return;

    const message = buildQuoteMessage(data);
    const via = e.submitter ? e.submitter.value : 'email';
    if (via === 'whatsapp') {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    } else {
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(q.subject)}&body=${encodeURIComponent(message)}`;
      form.querySelector('.quote-fallback').classList.add('highlight');
    }
  });

  const copyBtn = form.querySelector('.quote-copy');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(copyBtn.dataset.copy);
        copyBtn.textContent = translations[currentLang].quote.copied;
        setTimeout(() => { copyBtn.textContent = translations[currentLang].quote.copy; }, 2000);
      } catch (err) {
        window.prompt(CONTACT_EMAIL, CONTACT_EMAIL);
      }
    });
  }

  if (window.location.hash === '#quote-form') openQuoteModal();
}

/* =========================
   DYNAMIC EFFECTS
========================= */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  if (reduceMotion || !target) { el.textContent = target; return; }
  const duration = 1400;
  const start = performance.now();
  const tick = now => {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3)));
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function initReveal() {
  const targets = document.querySelectorAll(
    '.section-eyebrow, .section-title, .section-subtitle, .service-card-link, .why-showcase, .step-card, .benefit-card, .final-cta-content, .contact-card, .about-image, .about-text'
  );
  if (reduceMotion || !('IntersectionObserver' in window)) return;

  targets.forEach(el => {
    const siblings = Array.from(el.parentElement.children).filter(c => c.classList.contains(el.classList[0]));
    el.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(el), 6) * 90}ms`);
    el.classList.add('reveal');
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  targets.forEach(el => observer.observe(el));
}

function initWhyShowcase() {
  const showcase = document.querySelector('.why-showcase');
  if (!showcase) return;
  const tabs = showcase.querySelectorAll('.why-tab');
  const panels = showcase.querySelectorAll('.why-panel');
  let current = 0;

  const activate = index => {
    current = index;
    tabs.forEach((tab, i) => {
      tab.classList.toggle('active', i === index);
      tab.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });
    panels.forEach((panel, i) => panel.classList.toggle('active', i === index));
    panels[index].querySelectorAll('[data-count]').forEach(animateCount);
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      showcase.classList.add('user-controlled');
      activate(i);
    });
    // Auto-advance when the progress bar animation of the active tab completes
    tab.querySelector('.why-tab-progress span').addEventListener('animationend', () => {
      if (tab.classList.contains('active')) activate((current + 1) % tabs.length);
    });
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        showcase.classList.toggle('in-view', entry.isIntersecting);
        if (entry.isIntersecting && !showcase.dataset.counted) {
          showcase.dataset.counted = 'true';
          panels[current].querySelectorAll('[data-count]').forEach(animateCount);
        }
      });
    }, { threshold: 0.3 });
    observer.observe(showcase);
  }
}

function initScrollEffects() {
  const navbar = document.querySelector('.navbar');
  const progress = document.querySelector('.scroll-progress');
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.nav-menu .nav-link'));
  let ticking = false;

  const update = () => {
    const scrollY = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (navbar) navbar.classList.toggle('scrolled', scrollY > 20);
    if (progress) progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;

    let activeId = '';
    sections.forEach(section => {
      if (section.offsetTop - 120 <= scrollY) activeId = section.id;
    });
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`));
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
  update();
}

function initCardTilt() {
  if (reduceMotion || !window.matchMedia('(hover: hover)').matches) return;
  document.querySelectorAll('.service-card-link, .benefit-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty('--tilt-x', `${(-y * 6).toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${(x * 6).toFixed(2)}deg`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    });
  });
}

function switchLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('language', currentLang);
  document.documentElement.setAttribute('lang', currentLang);
  applyTranslations(currentLang);
  updateLanguageButtons();
}

function updateLanguageButtons() {
  const flags = document.querySelectorAll('.lang-flag');
  flags.forEach(flag => {
    const flagLang = flag.getAttribute('data-lang');
    if (flagLang === currentLang) {
      flag.classList.add('active');
    } else {
      flag.classList.remove('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.setAttribute('lang', currentLang);
  applyTranslations(currentLang);
  updateLanguageButtons();
  initQuoteForm();
  initReveal();
  initWhyShowcase();
  initScrollEffects();
  initCardTilt();

  const langFlags = document.querySelectorAll('.lang-flag');
  langFlags.forEach(flag => {
    flag.addEventListener('click', () => {
      const lang = flag.getAttribute('data-lang');
      switchLanguage(lang);
    });
  });

  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
});
