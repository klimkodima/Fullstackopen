import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, deleteBlog, user }) => {

  const [showViewBtn, setShowViewBtn] = useState(false)
  const [isOwner, setIsOwner] = useState(false)

  const handleViewBtn = () => {
    showViewBtn ? setShowViewBtn(false) : setShowViewBtn(true)
    setIsOwner( blog.user.id === user.id )
  }

  const handleAddLike = async () => {
    addLike({ ...blog, likes:blog.likes + 1, user:blog.user.id })
  }

  const handleDeleteBlog = async () => {
    let confirmation = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if(confirmation) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div className='blog'>
      <div>{blog.title} {blog.author} <button id="viewBtn" onClick={handleViewBtn} data-testid='handleViewBtn'> {showViewBtn ? 'hide' :'view'}</button> </div>
      { showViewBtn ?
        (
          <>
            <div data-testid='url'>{blog.url}</div>
            <div data-testid='likes' id="likes"> likes {blog.likes} <button id='addLikeBtn' onClick={handleAddLike}> Like</button></div>
            <div>{blog.user.username}</div>
            { isOwner ? <div><button id="deleteBtn" onClick={handleDeleteBlog}> Delete</button></div> : null }
          </>
        ) : null
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog