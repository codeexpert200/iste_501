function getPasswordStrength(value) {
  let strength = 0;
  let passwordStrength = "";

  if (value.length >= 8) {
    strength++;
  }
  if (value.match(/[A-Z]+/)) {
    strength++;
  }
  if (value.match(/[0-9]+/)) {
    strength++;
  }
  if (value.match(/[^A-Za-z0-9]/)) {
    strength++;
  }

  switch (strength) {
    case 1:
      passwordStrength = "Your password is very weak";
      break;
    case 2:
      passwordStrength = "Your password is weak";
      break;
    case 3:
      passwordStrength = "Your password is strong";
      break;
    case 4:
      passwordStrength = "Your password is very strong";
      break;
    default:
      passwordStrength = "";
  }

  return { strength: strength / 4, text: passwordStrength };
}

function showError(message) {
  const errorMessage = document.getElementById("error-message");
  errorMessage.textContent = message;
  resetAnimation(errorMessage);
  errorMessage.classList.add("fadeIn");
  setTimeout(() => {
    errorMessage.classList.remove("fadeOut");
    errorMessage.textContent = "";
  }, 5000);
}

  // Handle the form submission
  function showError2(message) {
    const errorMessage = document.getElementById("error-message");
    errorMessage.style.color = "green";
    errorMessage.textContent = message;
    resetAnimation(errorMessage);
    errorMessage.classList.add("fadeIn");
    setTimeout(() => {
      errorMessage.classList.remove("fadeOut");
      errorMessage.textContent = "";
      document.getElementsByTagName('label').style.display = 'none';
      document.getElementsByTagName('button').style.display = 'none';
      document.getElementsByTagName('progress').style.display = 'none';
      document.getElementsByTagName('div').style.display = 'none';
      document.getElementsByTagName('input').style.display = 'none';
      document.getElementsByTagName('p').style.display = 'none';
      document.getElementsByTagName('span').style.display = 'none';
      document.querySelector('h1').textContent = message;
    }, 5000);
  }

function resetAnimation(element) {
  element.style.animation = "none";
  element.offsetHeight;
  element.style.animation = "";
}

document.addEventListener('DOMContentLoaded', () => {
  // Get the token from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  // Set the token as a hidden input value
  document.getElementById('token').value = token;

  // Password strength indicator
    const newPasswordInput = document.getElementById("new-password");
    newPasswordInput.addEventListener("input", (e) => {
    const newPassword = e.target.value;
    const { strength, text } = getPasswordStrength(newPassword);
    const strengthBar = document.getElementById("password-strength-bar");
    const strengthText = document.getElementById("password-strength-text");
  
    strengthBar.value = strength * 100;
    strengthText.textContent = text;
  
    if (strength === 1) {
      strengthBar.style.backgroundColor = "red";
    } else if (strength === 2 / 4) {
      strengthBar.style.backgroundColor = "orange";
    } else if (strength === 3 / 4) {
      strengthBar.style.backgroundColor = "yellow";
    } else if (strength === 4 / 4) {
      strengthBar.style.backgroundColor = "green";
    } else {
      strengthBar.style.backgroundColor = "";
    }
  });
  
  // Handle the form submission
  const form = document.getElementById('reset-password-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    // Get the Reset Password button and the loader
    const resetPasswordButton = e.target.querySelector('button[type="submit"]');
    const resetPasswordButtonText = resetPasswordButton.querySelector('span');
    const loader = resetPasswordButton.querySelector('.loader');
  
    // Show the loader and disable the button
    loader.style.display = 'inline-block';
    resetPasswordButton.disabled = true;
    resetPasswordButtonText.style.display = 'none';
  
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById('confirm-password').value;
  
    if (newPassword === "") {
      showError("Passwords cannot be null. Please enter the password");
  
      // Hide the loader and re-enable the button
      loader.style.display = 'none';
      resetPasswordButton.disabled = false;
      resetPasswordButtonText.style.display = 'inline';
      return;
    }
  
    if (newPassword !== confirmPassword) {
      showError("Passwords do not match. Please enter a matching password");
  
      // Hide the loader and re-enable the button
      loader.style.display = 'none';
      resetPasswordButton.disabled = false;
      resetPasswordButtonText.style.display = 'inline';
      return;
    }
  
    const response = await fetch('https://m-d5jo.onrender.com/resetpassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, newPassword }),
    });
  
    // Hide the loader and re-enable the button
    loader.style.display = 'none';
    resetPasswordButton.disabled = false;
    resetPasswordButtonText.style.display = 'inline';
  
    if (response.status === 200) {
      // Show a success message, hide the form, and update the h1 text
      showError2("Password Reset Successful. Please Close The Browser");
    } else {
      // Show an error message
      showError("Password Reset Failed. Please Try Again");
    }
  });  
});