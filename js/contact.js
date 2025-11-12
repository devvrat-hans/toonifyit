/* Contact Page JavaScript - toonifyit.com */
/* Handles email copying and contact form validation */

document.addEventListener('DOMContentLoaded', () => {
  // Add copy-to-clipboard functionality for email addresses
  const emailLinks = document.querySelectorAll('.contact__link[href^="mailto:"]');
  
  emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Extract email from mailto: link
      const email = link.href.replace('mailto:', '');
      
      // Copy to clipboard
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          Toast.show(`Email copied: ${email}`);
        }).catch(err => {
          // Copy failed - fail silently
        });
      }
    });
  });
  
  // Track external link clicks for analytics (optional)
  const externalLinks = document.querySelectorAll('.contact__link[target="_blank"]');
  
  externalLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (link.hostname !== window.location.hostname) {
        // External link tracking could be added here if needed
      }
    });
  });

  // Contact Form Handling
  initContactForm();
});

/**
 * Initialize contact form with validation and submission handling
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageTextarea = document.getElementById('message');
  const submitBtn = form.querySelector('.form__submit-btn');
  const submitText = form.querySelector('.form__submit-text');
  const submitLoader = form.querySelector('.form__submit-loader');
  const formResponse = document.getElementById('formResponse');

  // Real-time validation
  nameInput.addEventListener('blur', () => validateField(nameInput, 'name'));
  emailInput.addEventListener('blur', () => validateField(emailInput, 'email'));
  subjectInput.addEventListener('blur', () => validateField(subjectInput, 'subject'));
  messageTextarea.addEventListener('blur', () => validateField(messageTextarea, 'message'));

  // Clear error on input
  [nameInput, emailInput, subjectInput, messageTextarea].forEach(field => {
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) {
        clearFieldError(field);
      }
    });
  });

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    const isNameValid = validateField(nameInput, 'name');
    const isEmailValid = validateField(emailInput, 'email');
    const isSubjectValid = validateField(subjectInput, 'subject');
    const isMessageValid = validateField(messageTextarea, 'message');

    if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
      showFormResponse('Please fix the errors before submitting.', 'error');
      return;
    }

    // Disable submit button
    submitBtn.disabled = true;
    submitText.style.display = 'none';
    submitLoader.style.display = 'inline';

    // Collect form data
    const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      subject: subjectInput.value.trim(),
      message: messageTextarea.value.trim(),
    };

    // Submit form to Google Apps Script
    try {
      const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyHkfRQ7Tbc-Vkp1K2VpjpctdM-iF44BOHap2BtYxKeetOORcUHCpN_jiI3_aaMKPvm-Q/exec';
      
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Note: With 'no-cors', we can't read the response
      // So we assume success if no error is thrown
      
      // Show success message
      showFormResponse('Thank you for contacting us! We\'ll get back to you within 24-48 hours. A confirmation email has been sent to your inbox.', 'success');

      // Reset form
      form.reset();
      clearAllErrors();

    } catch (error) {
      console.error('Form submission error:', error);
      showFormResponse('Sorry, something went wrong. Please try again or email us directly at toonifyit.now@gmail.com', 'error');
    } finally {
      // Re-enable submit button
      submitBtn.disabled = false;
      submitText.style.display = 'inline';
      submitLoader.style.display = 'none';
    }
  });
}

/**
 * Validate a single form field
 */
function validateField(field, fieldName) {
  const value = field.value.trim();
  const errorElement = document.getElementById(`${fieldName}-error`);
  let errorMessage = '';

  // Name validation
  if (fieldName === 'name') {
    if (value.length === 0) {
      errorMessage = 'Name is required.';
    } else if (value.length < 2) {
      errorMessage = 'Name must be at least 2 characters.';
    } else if (value.length > 100) {
      errorMessage = 'Name must be less than 100 characters.';
    }
  }

  // Email validation
  if (fieldName === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.length === 0) {
      errorMessage = 'Email is required.';
    } else if (!emailRegex.test(value)) {
      errorMessage = 'Please enter a valid email address.';
    }
  }

  // Subject validation
  if (fieldName === 'subject') {
    if (value.length === 0) {
      errorMessage = 'Subject is required.';
    } else if (value.length < 5) {
      errorMessage = 'Subject must be at least 5 characters.';
    } else if (value.length > 200) {
      errorMessage = 'Subject must be less than 200 characters.';
    }
  }

  // Message validation
  if (fieldName === 'message') {
    if (value.length === 0) {
      errorMessage = 'Message is required.';
    } else if (value.length < 10) {
      errorMessage = 'Message must be at least 10 characters.';
    } else if (value.length > 1000) {
      errorMessage = 'Message must be less than 1000 characters.';
    }
  }

  // Show/hide error
  if (errorMessage) {
    field.classList.add('error');
    errorElement.textContent = errorMessage;
    return false;
  } else {
    field.classList.remove('error');
    errorElement.textContent = '';
    return true;
  }
}

/**
 * Clear error for a single field
 */
function clearFieldError(field) {
  const fieldName = field.id;
  const errorElement = document.getElementById(`${fieldName}-error`);
  field.classList.remove('error');
  if (errorElement) errorElement.textContent = '';
}

/**
 * Clear all form errors
 */
function clearAllErrors() {
  const fields = document.querySelectorAll('.form__input, .form__textarea');
  fields.forEach(field => clearFieldError(field));
}

/**
 * Show form response message
 */
function showFormResponse(message, type) {
  const formResponse = document.getElementById('formResponse');
  formResponse.textContent = message;
  formResponse.className = `form__response ${type}`;
  formResponse.style.display = 'block';

  // Auto-hide after 5 seconds for success messages
  if (type === 'success') {
    setTimeout(() => {
      formResponse.style.display = 'none';
    }, 5000);
  }
}
