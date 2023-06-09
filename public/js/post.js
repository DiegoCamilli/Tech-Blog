const inquirer = require('inquirer')
const fetch = require('node-fetch')

// Function to prompt the user for post details
async function createPost() {
  const questions = [
    {
      type: 'input',
      name: 'title',
      message: 'Post title:'
    },
    {
      type: 'input',
      name: 'contents',
      message: 'Post contents:'
    }
  ]

  try {
    const answers = await inquirer.prompt(questions)

    const { title, contents } = answers

    const response = await fetch('/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, contents })
    })

    if (response.ok) {
      console.log('Post successful')
    } else {
      const errorMessage = await response.json()
      console.log(`Failed to create post: ${errorMessage.message}`)
    }
  } catch (error) {
    console.error('Something went wrong', error)
  }
}

createPost()