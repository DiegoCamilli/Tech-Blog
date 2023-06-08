document.querySelector('#newPostForm').addEventListener('submit', async (event) => {
    event.preventDefault()
  
    const title = document.querySelector('#title').value
    const contents = document.querySelector('#contents').value
  
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, contents }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
  
      if (response.ok) {
        window.location.href = response.redirected ? response.url : '/dashboard'
      } else {
        const error = await response.json()
        // Handle error message or unsuccessful post creation
        // ...
      }
    } catch (error) {
      console.error('An error occurred:', error)
      // Handle error case
      // ...
    }
  })