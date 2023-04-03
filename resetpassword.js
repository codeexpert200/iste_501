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
  }, 10000);
}

function resetAnimation(element) {
  element.style.animation = "none";
  element.offsetHeight;
  element.style.animation = "";
}

function toggleLoading(visible) {
  const submitButton = document.getElementById("submit-button");
  const loadingButton = document.getElementById("loading-button");
  
  submitButton.style.display = visible ? "none" : "inline-block";
  loadingButton.style.display = visible ? "inline-block" : "none";
}


form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newPassword = document.getElementById("new-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (newPassword === "") {
    showError("Passwords cannot be null. Please enter the password");
    return;
  }

  if (newPassword !== confirmPassword) {
    showError("Passwords do not match. Please enter a matching password");
    return;
  }

  toggleLoading(true);

  const response = await fetch("https://m-d5jo.onrender.com/resetpassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, newPassword }),
  });

  toggleLoading(false);

  if (response.status === 200) {
    // Show a success message and redirect to the login page
    showError("Password Reset Successful. Please Close The Browser");
  } else {
    // Show an error message
    showError("Password Reset Failed. Please Try Again");
  }
});