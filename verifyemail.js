function displayMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
  }
  
  async function signup() {
    // Get the token from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
  
    try {
      const response = await fetch('https://m-d5jo.onrender.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
  
      if (response.status === 200) {
        // Show a success message and update the message text
        displayMessage('Sign Up Successful. Please Close The Browser');
      } else {
        // Show an error message
        displayMessage('Sign Up Failed. Please Try Again');
      }
    } catch (error) {
      console.error('Error:', error);
      displayMessage('Sign Up Failed. Please Try Again');
    }
  }  