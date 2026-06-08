// ========================================
// PREMIUM WORLD-CLASS JAVASCRIPT
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features
  initializeNavigation();
  initializeScrollAnimations();
  initializeInteractions();
  initializeCities();
  initializeContactForm();
  initializeUtilities();
});

// ========================================
// NAVIGATION MANAGEMENT
// ========================================

function initializeNavigation() {
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const header = document.getElementById('header');
  let isMenuOpen = false;

  // Mobile menu toggle
  menuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    mobileMenu.classList.toggle('open', isMenuOpen);
    menuBtn.classList.toggle('active', isMenuOpen);
  });

  // Close menu on link click
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      isMenuOpen = false;
      mobileMenu.classList.remove('open');
      menuBtn.classList.remove('active');
    });
  });

  // Header scroll effect
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    
    if (scrollTop > 100) {
      header.style.background = 'rgba(15, 25, 41, 0.95)';
    } else {
      header.style.background = 'rgba(15, 25, 41, 0.7)';
    }
    
    lastScrollTop = scrollTop;
  });

  // Smooth scroll for all nav links
  window.scrollToId = (id) => {
    isMenuOpen = false;
    mobileMenu.classList.remove('open');
    menuBtn.classList.remove('active');
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

function initializeScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal-up');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(element => {
    observer.observe(element);
  });

  // Parallax effect on hero
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg-image');
    if (heroBg) {
      heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });
}

// ========================================
// CITIES SECTION
// ========================================

function initializeCities() {
  const cityNavBtns = document.querySelectorAll('.city-nav-btn');
  const cityCards = document.querySelectorAll('.city-card');

  cityNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const city = btn.getAttribute('data-city');
      
      // Update active button
      cityNavBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Update active card
      cityCards.forEach(card => {
        card.classList.remove('active');
        if (card.getAttribute('data-city') === city) {
          card.classList.add('active');
        }
      });
    });
  });
}

// ========================================
// INTERACTIONS & EFFECTS
// ========================================

function initializeInteractions() {
  // Button hover effects
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Card hover effects
  document.querySelectorAll('.about-card, .partner-item, .story-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Cursor follower
  const cursorFollower = document.querySelector('.cursor-follower');
  if (cursorFollower) {
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animate = () => {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;

      cursorFollower.style.left = followerX + 'px';
      cursorFollower.style.top = followerY + 'px';

      requestAnimationFrame(animate);
    };

    animate();
  }
}

// ========================================
// CONTACT FORM
// ========================================

function initializeContactForm() {
  const form = document.getElementById('contactForm');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = form.querySelector('input[name="name"]').value.trim();
      const email = form.querySelector('input[name="email"]').value.trim();
      
      if (!name || !email) {
        showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showNotification('البريد الإلكتروني غير صحيح', 'error');
        return;
      }

      // Simulate form submission
      showNotification('تم استلام طلبك بنجاح! سنتواصل معك قريباً', 'success');
      form.reset();

      // Here you would typically send the data to a server
      console.log('Form data:', {
        name,
        email,
        org: form.querySelector('input[name="org"]').value,
        phone: form.querySelector('input[name="phone"]').value,
        message: form.querySelector('textarea[name="message"]').value
      });
    });
  }
}

// ========================================
// UTILITIES
// ========================================

function initializeUtilities() {
  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Performance optimization: Lazy load images
  if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src;
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================

function showNotification(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const notification = document.createElement('div');
  
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-icon">${type === 'success' ? '✓' : '!'}</span>
      <span class="notification-text">${message}</span>
    </div>
  `;

  container.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);

  // Remove after 4 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 4000);
}

// ========================================
// VALIDATION
// ========================================

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ========================================
// PERFORMANCE & OPTIMIZATION
// ========================================

// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for mousemove events
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  // Esc key to close mobile menu
  if (e.key === 'Escape') {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuBtn = document.getElementById('menu-btn');
    mobileMenu.classList.remove('open');
    menuBtn.classList.remove('active');
  }

  // Tab key navigation
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});

// ========================================
// ANALYTICS & TRACKING (Optional)
// ========================================

// Track page interactions
function trackEvent(eventName, eventData = {}) {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, eventData);
  }
  console.log(`Event tracked: ${eventName}`, eventData);
}

// Track CTA clicks
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
  btn.addEventListener('click', () => {
    trackEvent('cta_click', {
      button_text: btn.textContent.trim()
    });
  });
});

// ========================================
// DARK MODE TOGGLE (Optional)
// ========================================

function initializeDarkMode() {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

// Initialize dark mode
initializeDarkMode();
