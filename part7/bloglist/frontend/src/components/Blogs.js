import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import BlogForm  from './BlogForm'
import { useDispatch, useSelector  } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'

const Blogs = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const  blogsStore = useSelector(state => state.blogs)

  return (
    <div>
      <BlogForm />
      <div id="blogs">
        {blogsStore
          .sort((a, b) => b.likes - a.likes)
          .map(blog => <p key={blog.id} className='blog'>
            <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link></p>)}
      </div>
    </div>
  )
}
export default Blogs