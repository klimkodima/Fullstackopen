import React, { useState } from 'react'
import Togglable from './Toggdable'

const BlogForm =({ addBlog, newRef }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleUrlChange = event => {
    setUrl(event.target.value)
  }

  const handleAuthorChange = event => {
    setAuthor(event.target.value)
  }

  const handleTitleChange = event => {
    setTitle(event.target.value)
  }

  const handleAddBlog = event => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }
    addBlog(newBlog)
    setUrl('')
    setTitle('')
    setAuthor('')
  }

  return (
    <Togglable buttonLabel="create new blog" ref={newRef}>
      <form id="blogForm" onSubmit={handleAddBlog}>
        <h2>create new</h2>
        <div>
          title: <input  id="title" value={title} type="text" name="title" onChange={handleTitleChange}/>
        </div>
        <br/>
        <div>author: <input id="author" value={author} type="text"  name="author" onChange={handleAuthorChange}/></div>
        <br/>
        <div>url: <input id="url" value={url} type="url"  name="url" onChange={handleUrlChange}/></div>
        <br/>
        <div>
          <button id="createBlogBtn" type="submit">create</button>
        </div>
      </form>
    </Togglable>
  )
}

export default BlogForm