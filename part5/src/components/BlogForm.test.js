import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm/>', () => {
  test('<BlogForm /> updates parent state and calls onSubmit', () => {

    const newBlog = {
      title: 'Mary Poppendieck blog',
      author: 'Mary Poppendieck',
      url: '/mary_poppendieck/12',
    }

    const addBlog = jest.fn()

    const component = render(
      <BlogForm addBlog={addBlog} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const blogForm = component.container.querySelector('#blogForm')

    fireEvent.change(title, { target: { value:  newBlog.title } })
    fireEvent.change(author, { target: { value:  newBlog.author } })
    fireEvent.change(url, { target: { value:  newBlog.url } })
    fireEvent.submit(blogForm)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe(newBlog.title )
    expect(addBlog.mock.calls[0][0].author).toBe(newBlog.author )
    expect(addBlog.mock.calls[0][0].url).toBe(newBlog.url )

  })
})