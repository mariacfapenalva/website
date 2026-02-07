import { translations } from './translations.js';

let currentLang = localStorage.getItem('language') || 'nl';

function applyTranslations(lang) {
  const t = translations[lang];

  document.querySelector('[data-lang="nav-home"]').textContent = t.nav.home;
  document.querySelector('[data-lang="nav-services"]').textContent = t.nav.services;
  document.querySelector('[data-lang="nav-how-we-work"]').textContent = t.nav.howWeWork;
  document.querySelector('[data-lang="nav-about"]').textContent = t.nav.about;
  document.querySelector('[data-lang="nav-cta"]').textContent = t.nav.cta;

  document.querySelector('[data-lang="hero-title1"]').textContent = t.hero.title1;
  document.querySelector('[data-lang="hero-title2"]').textContent = t.hero.title2;
  document.querySelector('[data-lang="hero-subtitle"]').textContent = t.hero.subtitle;
  document.querySelector('[data-lang="hero-cta-text"]').textContent = t.hero.ctaText;
  document.querySelector('[data-lang="hero-quote-btn"]').textContent = t.hero.quoteBtn;
  document.querySelector('[data-lang="hero-services-btn"]').textContent = t.hero.servicesBtn;

  document.querySelector('[data-lang="why-title"]').textContent = t.why.title;
  const whyItems = document.querySelectorAll('[data-lang^="why-item"]');
  whyItems.forEach((el, i) => el.textContent = t.why.items[i]);

  document.querySelector('[data-lang="services-title"]').textContent = t.services.title;
  document.querySelector('[data-lang="services-subtitle"]').textContent = t.services.subtitle;

  document.querySelector('[data-lang="service-residential-title"]').textContent = t.services.residential.title;
  document.querySelector('[data-lang="service-residential-desc"]').textContent = t.services.residential.description;
  const residentialFeatures = document.querySelectorAll('[data-lang^="service-residential-feature"]');
  residentialFeatures.forEach((el, i) => el.textContent = t.services.residential.features[i]);

  document.querySelector('[data-lang="service-commercial-title"]').textContent = t.services.commercial.title;
  document.querySelector('[data-lang="service-commercial-desc"]').textContent = t.services.commercial.description;
  const commercialFeatures = document.querySelectorAll('[data-lang^="service-commercial-feature"]');
  commercialFeatures.forEach((el, i) => el.textContent = t.services.commercial.features[i]);

  document.querySelector('[data-lang="service-onetime-title"]').textContent = t.services.oneTime.title;
  document.querySelector('[data-lang="service-onetime-desc"]').textContent = t.services.oneTime.description;
  const onetimeFeatures = document.querySelectorAll('[data-lang^="service-onetime-feature"]');
  onetimeFeatures.forEach((el, i) => el.textContent = t.services.oneTime.features[i]);

  document.querySelector('[data-lang="service-custom-title"]').textContent = t.services.custom.title;
  document.querySelector('[data-lang="service-custom-desc"]').textContent = t.services.custom.description;
  const customFeatures = document.querySelectorAll('[data-lang^="service-custom-feature"]');
  customFeatures.forEach((el, i) => el.textContent = t.services.custom.features[i]);

  document.querySelector('[data-lang="how-title"]').textContent = t.howWeWork.title;
  document.querySelector('[data-lang="how-subtitle"]').textContent = t.howWeWork.subtitle;
  document.querySelector('[data-lang="step-1-title"]').textContent = t.howWeWork.steps[0].title;
  document.querySelector('[data-lang="step-1-desc"]').textContent = t.howWeWork.steps[0].description;
  document.querySelector('[data-lang="step-2-title"]').textContent = t.howWeWork.steps[1].title;
  document.querySelector('[data-lang="step-2-desc"]').textContent = t.howWeWork.steps[1].description;
  document.querySelector('[data-lang="step-3-title"]').textContent = t.howWeWork.steps[2].title;
  document.querySelector('[data-lang="step-3-desc"]').textContent = t.howWeWork.steps[2].description;
  document.querySelector('[data-lang="step-4-title"]').textContent = t.howWeWork.steps[3].title;
  document.querySelector('[data-lang="step-4-desc"]').textContent = t.howWeWork.steps[3].description;
  document.querySelector('[data-lang="process-tagline"]').textContent = t.howWeWork.tagline;

  document.querySelector('[data-lang="credibility-title"]').textContent = t.credibility.title;
  const credibilityItems = document.querySelectorAll('[data-lang^="credibility-item"]');
  credibilityItems.forEach((el, i) => el.textContent = t.credibility.items[i]);

  document.querySelector('[data-lang="final-cta-title"]').textContent = t.finalCta.title;
  document.querySelector('[data-lang="final-cta-subtitle"]').textContent = t.finalCta.subtitle;
  document.querySelector('[data-lang="final-cta-btn"]').textContent = t.finalCta.button;
  document.querySelector('[data-lang="final-cta-response"]').textContent = t.finalCta.response;

  document.querySelector('[data-lang="about-title"]').textContent = t.about.title;
  document.querySelector('[data-lang="about-p1"]').textContent = t.about.paragraph1;
  document.querySelector('[data-lang="about-p2"]').textContent = t.about.paragraph2;
  document.querySelector('[data-lang="about-p3"]').textContent = t.about.paragraph3;

  document.querySelector('[data-lang="footer-service-area"]').textContent = t.footer.serviceArea;
  document.querySelector('[data-lang="footer-cta"]').textContent = t.footer.cta;
  document.querySelector('[data-lang="footer-copyright"]').textContent = t.footer.copyright;
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
});

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
