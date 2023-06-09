document.querySelector('#signupForm').addEventListener('submit', async (event) => {
  event.preventDefault()

  const username = document.querySelector('#username').value
  const email = document.querySelector('#email').value
  const password = document.querySelector('#password').value

  try {
    if (username && email && password) {
      const response = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const responseData = await response.json()
        window.location.href = responseData.redirected ? responseData.url : '/'
      } else {
        const error = await response.json()
        // Display err msg
        const errorMessage = document.querySelector('#errorMessage')
        errorMessage.textContent = error.message
      }
    }
  } catch (error) {
    console.error('An error occurred:', error)
    // Display err msg
    const errorMessage = document.querySelector('#errorMessage')
    errorMessage.textContent = 'An error occurred. Please try again later.'
  }
})