document.querySelector('#loginForm').addEventListener('submit', async (event) => {
    event.preventDefault()
  
    const username = document.querySelector('#username').value
    const password = document.querySelector('#password').value
  
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
  
      if (response.ok) {
        window.location.href = response.redirected ? response.url : '/'
      } else {
        const error = await response.json()
        // Handle error message or unsuccessful login
        // ...
      }
    } catch (error) {
      console.error('An error occurred:', error)
      // Handle error case
      // ...
    }
  })