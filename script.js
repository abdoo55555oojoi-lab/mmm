// Professional JavaScript - Clean and Practical

document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeContactForm();
  setCurrentYear();
});

// ========================================
// Navigation
// ========================================

function initializeNavigation() {
  const menuToggle = document.getElementById('menuToggle');
  const navMobile = document.getElementById('navMobile');
  let isMenuOpen = false;

  // Toggle mobile menu
  menuToggle.addEventListener('click', function() {
    isMenuOpen = !isMenuOpen;
    navMobile.classList.toggle('open', isMenuOpen);
  });

  // Close menu when clicking a link
  document.querySelectorAll('.nav-mobile-item').forEach(item => {
    item.addEventListener('click', function() {
      isMenuOpen = false;
      navMobile.classList.remove('open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.header-container') && 
        !event.target.closest('.nav-mobile')) {
      if (isMenuOpen) {
        isMenuOpen = false;
        navMobile.classList.remove('open');
      }
    }
  });

  // Update active nav item on scroll
  window.addEventListener('scroll', function() {
    updateActiveNavItem();
  });
}

function updateActiveNavItem() {
  const sections = ['about', 'approach', 'offerings', 'cities', 'partnerships', 'contact'];
  const scrollPosition = window.scrollY + 100;

  sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        document.querySelectorAll('.nav-item, .nav-mobile-item').forEach(item => {
          item.classList.remove('active');
        });
        
        document.querySelectorAll(`.nav-item[onclick*="${sectionId}"], .nav-mobile-item[onclick*="${sectionId}"]`).forEach(item => {
          item.classList.add('active');
        });
      }
    }
  });
}

// Smooth scroll function
window.scrollToElement = function(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    const headerHeight = 80;
    const elementPosition = element.offsetTop - headerHeight;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
};

// ========================================
// Contact Form
// ========================================

function initializeContactForm() {
  const form = document.getElementById('contactForm');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = form.querySelector('input[name="name"]').value.trim();
      const email = form.querySelector('input[name="email"]').value.trim();
      const org = form.querySelector('input[name="org"]').value.trim();
      const message = form.querySelector('textarea[name="message"]').value.trim();

      // Validate
      if (!name || !email) {
        showNotification('الاسم والبريد الإلكتروني مطلوبان', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showNotification('يرجى إدخال بريد إلكتروني صحيح', 'error');
        return;
      }

      // Submit form (in real scenario, send to server)
      console.log('Form submitted:', {
        name: name,
        org: org,
        email: email,
        message: message,
        timestamp: new Date().toISOString()
      });

      showNotification('تم استلام رسالتك بنجاح. سنتواصل معك قريباً', 'success');
      form.reset();
    });
  }
}

// ========================================
// Utilities
// ========================================

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showNotification(message, type) {
  // Create notification container if it doesn't exist
  let container = document.getElementById('notificationContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'notificationContainer';
    container.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      z-index: 10000;
      max-width: 400px;
    `;
    document.body.appendChild(container);
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
    padding: 16px 20px;
    margin-bottom: 12px;
    background: ${type === 'success' ? '#4CAF50' : '#f44336'};
    color: white;
    border-radius: 4px;
    font-size: 14px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    animation: slideIn 0.3s ease-out;
  `;
  notification.textContent = message;

  container.appendChild(notification);

  // Remove after 4 seconds
  setTimeout(function() {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(function() {
      notification.remove();
    }, 300);
  }, 4000);
}

function setCurrentYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// ========================================
// CSS Animations (for notifications)
// ========================================

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  .nav-item.active {
    color: #d4af37;
    border-bottom-color: #d4af37;
  }

  .nav-mobile-item.active {
    color: #d4af37;
    background: #f5f5f5;
  }
`;
document.head.appendChild(style);

// ========================================
// Performance Optimization
// ========================================

// Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          imageObserver.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ========================================
// Analytics Helper (Optional)
// ========================================

function trackEvent(eventName, eventData = {}) {
  // This can be connected to Google Analytics or similar
  console.log('Event:', eventName, eventData);
  
  // Uncomment if using Google Analytics
  // if (typeof gtag !== 'undefined') {
  //   gtag('event', eventName, eventData);
  // }
}

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function() {
    trackEvent('button_click', {
      button_text: this.textContent.trim(),
      timestamp: new Date().toISOString()
    });
  });
});

// Track section views
document.querySelectorAll('[id^="section"]').forEach(section => {
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          trackEvent('section_view', {
            section_id: entry.target.id
          });
        }
      });
    }, { threshold: 0.5 }).observe(section);
  }
});