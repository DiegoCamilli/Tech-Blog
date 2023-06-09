const homepageHandler = () => {
  window.location.href = '/'
}

const navigationLinkHandler = () => {
  alert('Please sign up or sign in to access this feature.')
}

const logoutHandler = async () => {
  try {
    const response = await fetch('/api/logout', {
      method: 'POST',
    })

    if (response.ok) {
      window.location.href = '/'
    } else {
      const error = await response.json()
      const errorMessage = document.querySelector('#errorMessage')
      errorMessage.textContent = error.message || 'Logout failed. Please try again.'
    }
  } catch (error) {
    console.error('An error occurred:', error)
    const errorMessage = document.querySelector('#errorMessage')
    errorMessage.textContent = 'An error occurred. Please try again later.'
  }
}

document.querySelector('#homepageLink').addEventListener('click', homepageHandler)

document.querySelectorAll('.navigationLink').forEach((link) => {
  link.addEventListener('click', navigationLinkHandler)
})

document.querySelector('#logoutLink').addEventListener('click', logoutHandler)