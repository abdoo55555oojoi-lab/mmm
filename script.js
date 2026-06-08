document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');
  let isMenuOpen = false;

  menuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
      mobileMenu.classList.add('open');
      menuIconOpen.style.display = 'none';
      menuIconClose.style.display = 'block';
    } else {
      mobileMenu.classList.remove('open');
      menuIconOpen.style.display = 'block';
      menuIconClose.style.display = 'none';
    }
  });

  // Smooth Scroll Helper (also exposed globally for inline onclick)
  window.scrollToId = (id) => {
    if (isMenuOpen) {
      isMenuOpen = false;
      mobileMenu.classList.remove('open');
      menuIconOpen.style.display = 'block';
      menuIconClose.style.display = 'none';
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Reveal Animations on Scroll
  const revealElements = document.querySelectorAll('.reveal');
  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // Cities Tabs
  const cityTabs = document.querySelectorAll('.city-tab');
  const cityContents = document.querySelectorAll('.city-content');

  cityTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const index = tab.getAttribute('data-index');
      
      // Remove active from all tabs & contents
      cityTabs.forEach(t => t.classList.remove('active'));
      cityContents.forEach(c => c.classList.remove('active'));

      // Add active to selected
      tab.classList.add('active');
      const targetContent = document.getElementById(`city-${index}`);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // Counters
  const counters = document.querySelectorAll('.counter-val');
  const counterOptions = { threshold: 0.5 };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        const suffix = el.getAttribute('data-suffix');
        animateCounter(el, target, suffix);
        observer.unobserve(el);
      }
    });
  }, counterOptions);

  counters.forEach(c => counterObserver.observe(c));

  function animateCounter(el, target, suffix) {
    let start = 0;
    const duration = 2000; // ms
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        el.innerText = target + suffix;
        clearInterval(timer);
      } else {
        el.innerText = Math.floor(start) + suffix;
      }
    }, stepTime);
  }

  // Toast System
  const toastContainer = document.getElementById('toast-container');
  window.showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerText = message;
    
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Remove after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  // Contact Form
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');

    if (!name.trim() || !email.trim()) {
      showToast('يرجى تعبئة الاسم والبريد الإلكتروني.', 'error');
      return;
    }

    showToast('تم استلام طلبك، سنتواصل معك قريباً.', 'success');
    contactForm.reset();
  });

  // Footer Year
  document.getElementById('year').innerText = new Date().getFullYear();
});
