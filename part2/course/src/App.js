import React from 'react'

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  const Header = ({name}) => {
    return (
      <div>
        <h1>{name}</h1>
      </div>
    )
  }

  const Part = ({name,exercises}) => {
    return (
      <div>
        <p>
          {name} {exercises}
        </p>
      </div>
    )
  }

  const Content = ({parts}) => {
    return (
      <ul>
      {parts.map(part => 
        <Part key={part.id} name={part.name} exercises={part.exercises}/>
      )}
    </ul>
    )
  }

  const Course = ({course}) => {
    return (
      <>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total  parts={course.parts}/>
      </>
    )
  }

  const Total = ({parts}) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
    <h4>total of {total} exercises</h4>
    )
  }
  return (
    <ul>
     {courses.map(course => <Course key={course.id} course={course}/>)}
    </ul>
  )
}
export default App