// Navigate Puerto Rico — Script

(function () {
  'use strict';

  // ---- Scroll-triggered fade-in ----
  const fadeEls = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeEls.forEach((el) => observer.observe(el));

  // ---- Header shadow on scroll ----
  const header = document.querySelector('.site-header');

  function updateHeader() {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // ---- Waitlist form handling ----
  const forms = document.querySelectorAll('.waitlist-form');
  const toast = document.getElementById('toast');
  let toastTimer;

  function showToast() {
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  forms.forEach((form) => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const emailInput = form.querySelector('input[type="email"]');
      const email = emailInput.value.trim();

      if (!email) return;

      // Store in localStorage as a simple demo persistence
      const waitlist = JSON.parse(localStorage.getItem('npr_waitlist') || '[]');
      const nameInput = form.querySelector('input[type="text"]');
      const name = nameInput ? nameInput.value.trim() : '';

      waitlist.push({
        email: email,
        name: name,
        source: form.dataset.form,
        date: new Date().toISOString()
      });

      localStorage.setItem('npr_waitlist', JSON.stringify(waitlist));

      // Reset form
      form.reset();
      showToast();
    });
  });

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = header.offsetHeight + 16;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
})();
