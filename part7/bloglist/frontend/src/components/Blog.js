import React from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { vote, deleteBlog, addComment } from '../reducers/blogReducer'
import { useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'
import { Header, Button, List, Form } from 'semantic-ui-react'

const Blog = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [comment, commentReset] = useField()
  const  blogs = useSelector(state => state.blogs)
  const  user = useSelector(state => state.user)
  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  if (!blog) {
    return null
  }

  const addLike = async () => {
    let { id, ...rest } = { ...blog, likes:blog.likes + 1, user:blog.user.id }
    dispatch(vote(id, rest))
    dispatch(setNotification(`a updated blog ${blog.title} by ${blog.author}`, 'success'))
  }

  const handleDeleteBlog = async () => {
    let confirmation = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if(confirmation) {
      dispatch(deleteBlog(blog.id))
      dispatch(setNotification('blog deleted successfully', 'success'))
      navigate('/')
    }
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    const newComment = {
      comment:comment.value
    }
    dispatch(addComment(blog.id, newComment))
    dispatch(setNotification('comment was added successfuly', 'success'))
    commentReset()

  }

  return (
    <div>
      <Header as='h3'>{blog.title} {blog.author} </Header>
      <List>
        <List.Item>
          <List.Icon name='mail' />
          <List.Content>
            <a data-testid='url' href={blog.url}>{blog.url}</a>
          </List.Content>
        </List.Item>
        <div data-testid='likes' id="likes"><b>{blog.likes}</b> likes <Button as='h1' id='addLikeBtn' onClick={addLike}> Like</Button></div>
        <div>added by <b>{blog.user.name}</b></div>
        { blog.user.id === user.id ? <div><button id="deleteBtn" onClick={handleDeleteBlog}> Delete</button></div> : null }
      </List>
      <Header as='h3'>comments</Header>
      <Form id="commentForm" onSubmit={handleAddComment}>
        <Form.Field inline>
          <Form.TextArea id="author" {...comment} placeholder='Text'/>
          <br/>
          <Button type="submit">add comment</Button>
        </Form.Field>
      </Form>
      {blog.comments && <List>
        {blog.comments
          .map(comment => <li key={comment}>{comment}</li>)}
      </List> }
    </div>
  )
}

export default Blog