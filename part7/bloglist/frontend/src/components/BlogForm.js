import React, { useRef } from 'react'
import Togglable from './Toggdable'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'
import { Header, Form } from 'semantic-ui-react'

const BlogForm =() => {

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const [ title, titleReset ] = useField()
  const [ author, authorReset ] = useField()
  const [ url, urlReset ]  = useField()

  const addBlog = event => {
    event.preventDefault()
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value
    }
    dispatch(createBlog(newBlog))
    blogFormRef.current.toggleVisibility()
    dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author}`, 'success'))
    titleReset()
    authorReset()
    urlReset()
  }

  return (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <Header as='h2'>create new</Header>
      <Form id="blogForm" onSubmit={addBlog}>
        <Form.Input required inline label='Title' placeholder=' enter title' id="title" {...title}/>
        <Form.Input  required inline label='Author' placeholder='enter author' id="author" {...author}/>
        <Form.Input  required inline label='Url' placeholder='enter url' type='url' id="url" {...url}/>
        <Form.Button id="createBlogBtn" type="submit">create</Form.Button>
      </Form>
    </Togglable>
  )
}

export default BlogForm