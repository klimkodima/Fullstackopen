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
  export default Course