import React, { useState, useEffect, useRef } from 'react'
import Blog  from './Blog'
import BlogForm  from './BlogForm'
import blogsService from '../servises/blogs'

const Blogs = ({ user, handleLogOut, setNewMessageClass, setNewMessage }) => {

  const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()

  useEffect( async () => {
    const data = await  blogsService.getAll()
    setBlogs(data)
  }, [])

  const addBlog = async newBlog => {
    try {
      const blog = await blogsService.create(newBlog)
      const newBlogs = blogs.concat(blog)
      setBlogs(newBlogs)
      blogFormRef.current.toggleVisibility()
      setNewMessageClass('success')
      setNewMessage (`a new blog ${blog.title} by ${blog.author}`)
    } catch (error) {
      setNewMessageClass('error')
      setNewMessage (error.response.data.error)
    }
    setTimeout(() => {
      setNewMessage(null)
    }, 5000)
  }

  const addLike = async (newBlog) => {
    try {
      let { id, ...rest } = newBlog
      const updatedBlog = await blogsService.update(id, rest)
      const newBlogs = blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
      setBlogs(newBlogs)
      setNewMessageClass('success')
      setNewMessage (`a updated blog ${updatedBlog.title} by ${updatedBlog.author}`)

    } catch (error) {
      setNewMessageClass('error')
      setNewMessage (error.response.data.error)
    }
    setTimeout(() => {
      setNewMessage(null)
    }, 5000)
  }

  const deleteBlog = async (id) => {
    try {
      await blogsService.deleteBlog(id)

      let newBlogs = blogs.filter(n => n.id !== id)
      setBlogs(newBlogs)
      setNewMessageClass('success')
      setNewMessage('Blog deleted successfuly')

    } catch (error) {
      setNewMessageClass('error')
      setNewMessage (error.response.data.error)
    }
    setTimeout(() => {
      setNewMessage(null)
    }, 5000)
  }

  return (
    <>
      <p>{user.name} logged in<button id="logOutBtn" onClick ={handleLogOut}>logout</button></p>
      <BlogForm addBlog={addBlog} newRef={blogFormRef}/>
      <ul id="blogs">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => <Blog key={blog.id} blog={blog} user={user} addLike={addLike} deleteBlog={deleteBlog}/>)}
      </ul>
    </>
  )
}
export default Blogs