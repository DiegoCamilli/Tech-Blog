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
      if (response.redirected) {
        window.location.href = response.url
      } else {
        window.location.href = '/dashboard'
      }
    } else {
      throw new Error('Something went wrong')
    }
  } catch (error) {
    console.error('An error occurred:', error)
    const errorMessage = document.querySelector('#errorMessage')
    errorMessage.textContent = 'Something went wrong! Please try again.'
  }
})