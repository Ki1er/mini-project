// Select the form element
const form = document.querySelector('form');

// Add an event listener for the submit event
form.addEventListener('submit', (event) => {
  // Prevent the form from submitting
  event.preventDefault();

  // Validate the form
  if (!validateForm()) {
    return;
  }

  // Collect the form data
  const formData = new FormData(form);

  // Send the form data to the server
  fetch('submit_form.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    // Handle the response from the server
    if (data.success) {
      // Show a success message
      alert('Your payment was successful!');

      // Redirect to the order confirmation page
      window.location.href = 'order_confirmation.php';
    } else {
      // Show an error message
      alert('There was an error processing your payment. Please try again.');
    }
  })
  .catch(error => {
    // Handle the error
    console.error(error);
    alert('There was an error processing your payment. Please try again.');
  });
});

// Validate the form
function validateForm() {
  // Check if all the required fields are filled in
  const requiredFields = document.querySelectorAll('.inputBox input[required]');
  for (const field of requiredFields) {
    if (!field.value) {
      alert(`Please fill in the ${field.placeholder} field.`);
      return false;
    }
  }

  // Check if the email address is valid
  const emailField = document.querySelector('.inputBox input[type="email"]');
  if (!validateEmail(emailField.value)) {
    alert('Please enter a valid email address.');
    return false;
  }

  // Check if the credit card number is valid
  const creditCardNumberField = document.querySelector('.inputBox input[type="number"]');
  if (!validateCreditCardNumber(creditCardNumberField.value)) {
    alert('Please enter a valid credit card number.');
    return false;
  }

  // Check if the expiration date is valid
  const expirationDateField = document.querySelector('.inputBox input[type="text"]:nth-of-type(3)');
  if (!validateExpirationDate(expirationDateField.value)) {
    alert('Please enter a valid expiration date.');
    return false;
  }

  // Check if the CVV is valid
  const cvvField = document.querySelector('.inputBox input[type="text"]:nth-of-type(4)');
  if (!validateCvv(cvvField.value)) {
    alert('Please enter a valid CVV.');
    return false;
  }

  // All the fields are valid
  return true;
}

// Validate the email address
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Validate the credit card number
function validateCreditCardNumber(number) {
  const re = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
  return re.test(number);
}

// Validate the expiration date
function validateExpirationDate(date) {
  const re = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
  const match = date.match(re);
  if (!match) {
    return false;
  }
  const month = parseInt(match[1]);
  const year = parseInt(match[2]);
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  return year >= currentYear && (month > currentMonth || (month == currentMonth && year > currentYear));
}

// Validate the CVV
function validateCvv(cvv) {
  const re = /^[0-9]{3,4}$/;
  return re.test(cvv);
}