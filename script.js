/**
 * Move Score - Landing Page Scripts
 * Pure Vanilla JavaScript (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll state
  const siteHeader = document.getElementById('site-header');
  
  const handleScroll = () => {
    if (window.scrollY > 20) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Navigation Drawer
  const navToggle = document.getElementById('nav-toggle');
  const navMobile = document.getElementById('nav-mobile');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (navToggle && navMobile) {
    const toggleMenu = () => {
      const isOpen = navMobile.classList.contains('open');
      navMobile.classList.toggle('open');
      navToggle.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', !isOpen);
      document.body.style.overflow = !isOpen ? 'hidden' : '';
    };

    navToggle.addEventListener('click', toggleMenu);

    // Close when clicking any mobile link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMobile.classList.contains('open')) {
          toggleMenu();
        }
      });
    });

    // Close mobile menu if clicked outside
    document.addEventListener('click', (e) => {
      if (navMobile.classList.contains('open') && 
          !navMobile.contains(e.target) && 
          !navToggle.contains(e.target)) {
        toggleMenu();
      }
    });
  }

  // 3. Scrollspy for Active Desktop Nav Links
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-desktop .nav-link');

  const highlightNavLink = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavLink, { passive: true });

  // 4. Reveal Animations on Scroll (IntersectionObserver)
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if ('IntersectionObserver' in window) {
    const appearOptions = {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, appearOptions);

    animatedElements.forEach(el => {
      appearOnScroll.observe(el);
    });
  } else {
    // Fallback if IntersectionObserver not supported
    animatedElements.forEach(el => el.classList.add('is-visible'));
  }

  // 5. Interactive Rep Counter HUD animation in Hero
  const repCounterEl = document.getElementById('rep-counter');
  if (repCounterEl) {
    let repCount = 14;
    let intervalId = null;

    const pulseCounter = () => {
      repCount = repCount >= 20 ? 12 : repCount + 1;
      repCounterEl.textContent = repCount;
      repCounterEl.style.transform = 'scale(1.2)';
      setTimeout(() => {
        repCounterEl.style.transform = 'scale(1)';
      }, 200);
    };

    // Trigger subtle counter tick every 3.8s to give dynamic living HUD feel
    intervalId = setInterval(pulseCounter, 3800);

    // Pause animation when tab is not active to save battery
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        clearInterval(intervalId);
      } else {
        intervalId = setInterval(pulseCounter, 3800);
      }
    });
  }

  console.log('Move Score - Landing Page iniciada com sucesso.');
});
