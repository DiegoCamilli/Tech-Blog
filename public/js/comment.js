const addCommentHandler = async (event) => {
  event.preventDefault()

  const postId = document.querySelector('#post-id').value
  const commentText = document.querySelector('#comment-text').value.trim()

  if (commentText) {
    // Send a POST request to add the comment
    const response = await fetch(`/post/${postId}/comment`, {
      method: 'POST',
      body: JSON.stringify({ comment: commentText }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      document.location.reload()
    } else {
      alert('Failed to add comment')
    }
  }
}

// Event listener
document.querySelector('.new-post-form').addEventListener('submit', addCommentHandler)