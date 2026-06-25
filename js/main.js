document.addEventListener('DOMContentLoaded', () => {
  // 1. Page Loader
  const loader = document.querySelector('.page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('loaded');
      }, 300);
    });
    // Fallback if loading takes too long
    setTimeout(() => {
      loader.classList.add('loaded');
    }, 2000);
  }

  // 2. Mobile Menu Navigation
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isExpanded = navLinks.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isExpanded);
      menuToggle.innerHTML = isExpanded ? '&#x2715;' : '&#x2630;'; // Change burger to X
    });

    // Close menu when clicking link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '&#x2630;';
      });
    });
  }

  // 3. Highlight Active Navigation Link based on current page
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // 4. Header Scroll State
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 5. Scroll Reveal Intersection Observer
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Reveal only once
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // 6. Spline Viewer Loading Overlay Management
  const splineViewers = document.querySelectorAll('spline-viewer');
  splineViewers.forEach(viewer => {
    // Some browsers do not trigger load if cached, check if shadow exists
    const checkShadow = setInterval(() => {
      if (viewer.shadowRoot && viewer.shadowRoot.querySelector('canvas')) {
        hideSplineLoader(viewer);
        clearInterval(checkShadow);
      }
    }, 100);

    viewer.addEventListener('load', () => {
      hideSplineLoader(viewer);
      clearInterval(checkShadow);
    });

    // Fallback if spline fails to load in 8 seconds
    setTimeout(() => {
      hideSplineLoader(viewer);
      clearInterval(checkShadow);
    }, 8000);
  });

  function hideSplineLoader(viewer) {
    const parent = viewer.parentElement;
    if (parent) {
      const loaderEl = parent.querySelector('.spline-loading');
      if (loaderEl) {
        loaderEl.style.opacity = '0';
        setTimeout(() => {
          loaderEl.remove();
        }, 500);
      }
    }
  }
});
