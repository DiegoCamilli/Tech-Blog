document.querySelector('#loginForm').addEventListener('submit', async (event) => {
  event.preventDefault()

  const username = document.querySelector('#username').value
  const password = document.querySelector('#password').value

  try {
    if (username && password) { 
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const responseData = await response.json()
        window.location.href = responseData.redirected ? responseData.url : '/'
      } else {
        const error = await response.json()
        // Display the error message
        const errorMessage = document.querySelector('#errorMessage')
        errorMessage.textContent = error.message
      }
    }
  } catch (error) {
    console.error('An error occurred:', error)
    // Display an error message
    const errorMessage = document.querySelector('#errorMessage')
    errorMessage.textContent = 'Something went wrong! Please try again.'
  }
})