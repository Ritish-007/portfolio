document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Retrieve form values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !subject || !message) {
        alert('Please fill out all fields.');
        return;
      }

      // Simulate API submit
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `Sending... <span class="spinner" style="width: 14px; height: 14px; border-width: 1px; display: inline-block; margin-left: 0.5rem;"></span>`;

      setTimeout(() => {
        // Success response
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        formSuccess.classList.remove('hidden');
        contactForm.reset();

        // Fade success message out after 5 seconds
        setTimeout(() => {
          formSuccess.style.opacity = '0';
          setTimeout(() => {
            formSuccess.classList.add('hidden');
            formSuccess.style.opacity = '1';
          }, 500);
        }, 5000);

      }, 1500);
    });
  }
});
