import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog/>', () => {
  let component, blog, user
  const mockHandler = jest.fn()
  const addLikeHandler = jest.fn()

  beforeEach(() => {
    user = {
      id:2
    }

    blog = {
      title: 'Mary Poppendieck blog 12',
      likes:2,
      url:'http\\react.org',
      author:'dima',
      user:{
        id:2
      }
    }

    component = render(
      <Blog blog={blog} user={user} handleView={mockHandler} addLike={addLikeHandler}/>
    )
  })

  test('renders its title, author and not renders url, likes', () => {
    expect(component.container).toHaveTextContent('Mary Poppendieck blog 12')
    expect(component.container).toHaveTextContent('dima')
    expect(component.container).not.toHaveTextContent('http\\react.org')
    expect(component.container).not.toHaveTextContent('likes')
  })

  test('renders its renders url, likes when view button pressed', () => {
    component.debug()
    // const button = component.container.querySelector('button')
    const button = screen.getByTestId('handleViewBtn')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('http\\react.org')
    expect(component.container).toHaveTextContent('likes 2')
    console.log(prettyDOM(button))
  })

  test('if the like button is clicked twice, the event handler the component received as props is called twice', () => {
    const handleViewBtn = screen.getByTestId('handleViewBtn')
    fireEvent.click(handleViewBtn)
    const addLikeBtn = component.container.querySelector('#addLikeBtn')
    fireEvent.click(addLikeBtn)
    fireEvent.click(addLikeBtn)

    expect(addLikeHandler.mock.calls).toHaveLength(2)
  })
})