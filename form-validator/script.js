// Constants elements definition
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password_confirm = document.getElementById('password_confirm');

/**
 * Show input error message
 * 
 * @param {Object} input
 * @param {string} message 
 * @return {void}
 */
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

/**
 * Show success outline
 * @param {Object} input - HTMLInputElement
 */
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

/**
 * Check email is valid
 * @param {Object} input - Email input (HTMLInputElement)
 */
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

/**
 * Check required fields
 * @param {array} inputArr - Array of inputs (HTMLInputElement)
 */
function checkRequired(inputArr) {
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

/**
 * Check input length
 * @param {Object} input - HTMLInputElement
 * @param {number} min - Minimum value allowed in the input
 * @param {number} max - Maximum value allowed in the input
 */
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

/**
 * Check passwords match
 * @param {Object} input1 - Password input (HTMLInputElement)
 * @param {Object} input2 - Password confirmation input (HTMLInputElement)
 */
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}

/**
 * Returns input field name with initial letter in uppercase
 * @param {Object} input - HTMLInputElement
 * @returns {string} Input field name with initial letter in uppercase
 */
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listener
form.addEventListener('submit', function(e) {
  e.preventDefault();

  checkRequired([username, email, password, password_confirm]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password_confirm);
});