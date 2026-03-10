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
  const whyItems = document.querySelectorAll('[data-lang^="why-item"]');
  whyItems.forEach((el, i) => el.textContent = t.why.items[i]);

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

  safeUpdate('[data-lang="credibility-title"]', t.credibility.title);
  const credibilityItems = document.querySelectorAll('[data-lang^="credibility-item"]');
  credibilityItems.forEach((el, i) => el.textContent = t.credibility.items[i]);

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
