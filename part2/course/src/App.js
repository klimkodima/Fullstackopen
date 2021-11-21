import React from 'react'

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
  }
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
      </>
    )
  }




  return <Course course={course} />
}
export default App