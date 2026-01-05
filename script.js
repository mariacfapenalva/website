import { translations } from './translations.js';

let currentLang = localStorage.getItem('language') || 'nl';

function applyTranslations(lang) {
  const t = translations[lang];

  document.querySelector('[data-lang="nav-home"]').textContent = t.nav.home;
  document.querySelector('[data-lang="nav-services"]').textContent = t.nav.services;
  document.querySelector('[data-lang="nav-about"]').textContent = t.nav.about;

  document.querySelector('[data-lang="hero-title1"]').textContent = t.hero.title1;
  document.querySelector('[data-lang="hero-title2"]').textContent = t.hero.title2;
  document.querySelector('[data-lang="hero-subtitle"]').textContent = t.hero.subtitle;
  document.querySelector('[data-lang="hero-services-btn"]').textContent = t.hero.servicesBtn;

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

  document.querySelector('[data-lang="about-title"]').textContent = t.about.title;
  document.querySelector('[data-lang="about-p1"]').textContent = t.about.paragraph1;
  document.querySelector('[data-lang="about-p2"]').textContent = t.about.paragraph2;
  document.querySelector('[data-lang="about-p3"]').textContent = t.about.paragraph3;
  document.querySelector('[data-lang="about-p4"]').textContent = t.about.paragraph4;

  document.querySelector('[data-lang="stat-years"]').textContent = t.about.stats.years;
  document.querySelector('[data-lang="stat-clients"]').textContent = t.about.stats.clients;
  document.querySelector('[data-lang="stat-satisfaction"]').textContent = t.about.stats.satisfaction;

  document.querySelector('[data-lang="footer-copyright"]').textContent = t.footer.copyright;
}

function toggleLanguage() {
  currentLang = currentLang === 'nl' ? 'en' : 'nl';
  localStorage.setItem('language', currentLang);
  document.documentElement.setAttribute('lang', currentLang);
  applyTranslations(currentLang);
  updateLanguageButton();
}

function updateLanguageButton() {
  const langBtn = document.querySelector('.lang-toggle');
  langBtn.setAttribute('data-lang', currentLang);
  langBtn.setAttribute('aria-label', currentLang === 'nl' ? 'Switch to English' : 'Schakel naar Nederlands');
}

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.setAttribute('lang', currentLang);
  applyTranslations(currentLang);
  updateLanguageButton();

  const langToggle = document.querySelector('.lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', toggleLanguage);
  }
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
