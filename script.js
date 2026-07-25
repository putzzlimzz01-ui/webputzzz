// ================================
//  THEME TOGGLE
// ================================
const themeBtn = document.getElementById('themeBtn');
const html = document.documentElement;

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  themeBtn.textContent = theme === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('theme', theme);
}

themeBtn.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

// ================================
//  HAMBURGER MENU
// ================================
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when link tapped
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ================================
//  NAVBAR SCROLL EFFECT
// ================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);

  // Active nav link
  const sections = document.querySelectorAll('section[id]');
  sections.forEach(sec => {
    const top = sec.offsetTop - 90;
    const bot = top + sec.offsetHeight;
    const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
    if (link) {
      link.classList.toggle('active', window.scrollY >= top && window.scrollY < bot);
    }
  });

  // Scroll-to-top button
  scrollTopBtn.classList.toggle('show', window.scrollY > 400);
});

// ================================
//  SCROLL TO TOP
// ================================
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.title = 'Kembali ke atas';
document.body.appendChild(scrollTopBtn);
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ================================
//  TYPING ANIMATION
// ================================
const words = [
  'Web Developer 🌐',
  'UI/UX Designer 🎨',
  'Creative Thinker 💡',
  'Problem Solver ⚙️',
  'Lifelong Learner 📚'
];

const typingEl = document.getElementById('typingText');
let wordIndex  = 0;
let charIndex  = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typingEl.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === currentWord.length) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    delay = 400;
  }

  setTimeout(typeEffect, delay);
}

typeEffect();

// ================================
//  SCROLL ANIMATIONS
// ================================
function addFadeIn() {
  const targets = [
    '.skill-card', '.porto-card',
    '.about-text', '.about-image-wrap',
    '.contact-info', '.contact-form',
    '.section-header'
  ];
  targets.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('fade-in');
      el.style.transitionDelay = `${i * 0.1}s`;
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}
addFadeIn();

// ================================
//  SKILL BAR ANIMATION
// ================================
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.getAttribute('data-width') + '%';
      });
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);

// ================================
//  PORTFOLIO FILTER
// ================================
const filterBtns = document.querySelectorAll('.filter-btn');
const portCards  = document.querySelectorAll('.porto-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Active state
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    portCards.forEach(card => {
      const cat = card.getAttribute('data-cat');
      const show = filter === 'all' || cat === filter;
      card.classList.toggle('hidden', !show);

      // Re-trigger animation
      if (show) {
        card.style.animation = 'none';
        requestAnimationFrame(() => {
          card.style.animation = '';
        });
      }
    });
  });
});

// ================================
//  CONTACT FORM
// ================================
const contactForm = document.getElementById('contactForm');
const formNote    = document.getElementById('formNote');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Mengirim... ⏳';
  submitBtn.disabled = true;

  // Simulate send
  setTimeout(() => {
    formNote.textContent = '✅ Pesan terkirim! Terima kasih, saya akan segera membalas.';
    formNote.style.color = 'var(--green)';
    contactForm.reset();
    submitBtn.textContent = 'Kirim Pesan 🚀';
    submitBtn.disabled = false;

    setTimeout(() => { formNote.textContent = ''; }, 5000);
  }, 1500);
});

// ================================
//  SMOOTH ANCHOR SCROLL
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.offsetTop - 68;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ================================
//  CURSOR GLOW (Desktop only)
// ================================
if (window.matchMedia('(hover:hover)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position:fixed; width:300px; height:300px;
    border-radius:50%; pointer-events:none;
    background:radial-gradient(circle, rgba(124,111,247,0.08) 0%, transparent 70%);
    transform:translate(-50%,-50%); z-index:0;
    transition: left 0.1s, top 0.1s;
  `;
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}

console.log('🚀 Website berhasil dimuat!');
console.log('💡 Edit file HTML untuk mengubah konten.');
