import { translations } from './translations.js';
import { servicesData } from './services-data.js';

let currentLang = localStorage.getItem('language') || 'nl';

const pageTranslations = {
  nl: {
    backToServices: 'Terug naar Diensten',
    whatWeDo: 'Wat We Doen',
    whatIncludes: 'Wat is Inbegrepen',
    idealFor: 'Ideaal Voor',
    frequencyOptions: 'Frequentie Opties',
    readyToStart: 'Klaar om te Beginnen?',
    ctaDescription: 'Neem contact met ons op voor een gratis, vrijblijvende offerte op maat van uw behoeften.',
    requestQuote: 'Vraag een Offerte Aan'
  },
  en: {
    backToServices: 'Back to Services',
    whatWeDo: 'What We Do',
    whatIncludes: "What's Included",
    idealFor: 'Ideal For',
    frequencyOptions: 'Frequency Options',
    readyToStart: 'Ready to Get Started?',
    ctaDescription: 'Contact us for a free, no-obligation quote tailored to your needs.',
    requestQuote: 'Request a Quote'
  }
};

function getServiceFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('service') || 'residential';
}

function applyPageTranslations(lang) {
  const t = pageTranslations[lang];
  const mainT = translations[lang];

  document.querySelector('[data-lang="back-to-services"]').textContent = t.backToServices;
  document.querySelector('[data-lang="what-we-do"]').textContent = t.whatWeDo;
  document.querySelector('[data-lang="what-includes"]').textContent = t.whatIncludes;
  document.querySelector('[data-lang="ideal-for"]').textContent = t.idealFor;
  document.querySelector('[data-lang="frequency-options"]').textContent = t.frequencyOptions;
  document.querySelector('[data-lang="ready-to-start"]').textContent = t.readyToStart;
  document.querySelector('[data-lang="cta-description"]').textContent = t.ctaDescription;
  document.querySelector('[data-lang="request-quote"]').textContent = t.requestQuote;

  document.querySelector('[data-lang="nav-home"]').textContent = mainT.nav.home;
  document.querySelector('[data-lang="nav-services"]').textContent = mainT.nav.services;
  document.querySelector('[data-lang="nav-how-we-work"]').textContent = mainT.nav.howWeWork;
  document.querySelector('[data-lang="nav-about"]').textContent = mainT.nav.about;
  document.querySelector('[data-lang="nav-cta"]').textContent = mainT.nav.cta;
  document.querySelector('[data-lang="footer-service-area"]').textContent = mainT.footer.serviceArea;
  document.querySelector('[data-lang="footer-cta"]').textContent = mainT.footer.cta;
  document.querySelector('[data-lang="footer-copyright"]').textContent = mainT.footer.copyright;
}

function loadServiceContent(serviceKey, lang) {
  const service = servicesData[serviceKey];
  if (!service) return;

  const content = service[lang];

  document.getElementById('service-icon').innerHTML = service.icon;
  document.getElementById('service-title').textContent = content.title;
  document.getElementById('service-intro').textContent = content.intro;
  document.getElementById('what-we-do-content').textContent = content.whatWeDo;

  const includedList = document.getElementById('included-list');
  includedList.innerHTML = '';
  content.included.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    includedList.appendChild(li);
  });

  const idealForList = document.getElementById('ideal-for-list');
  idealForList.innerHTML = '';
  content.idealFor.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    idealForList.appendChild(li);
  });

  const frequencyGrid = document.getElementById('frequency-grid');
  frequencyGrid.innerHTML = '';
  content.frequencies.forEach(freq => {
    const div = document.createElement('div');
    div.className = 'frequency-option';
    div.innerHTML = `
      <div class="frequency-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      </div>
      <div class="frequency-label">${freq.label}</div>
    `;
    frequencyGrid.appendChild(div);
  });

  document.title = `${content.title} - Crystal Clear`;
}

function switchLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('language', currentLang);
  document.documentElement.setAttribute('lang', currentLang);

  const serviceKey = getServiceFromURL();
  loadServiceContent(serviceKey, currentLang);
  applyPageTranslations(currentLang);
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

  const serviceKey = getServiceFromURL();
  loadServiceContent(serviceKey, currentLang);
  applyPageTranslations(currentLang);
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

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.detail-section').forEach(section => {
    observer.observe(section);
  });
});
