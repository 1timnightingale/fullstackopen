const Header = (props) => {
  return (
    <>
      <h1> {props.course}</h1>
    </>
  )
}


const Part = (props) => {

  return (
    <>
      <p>
        {props.name} {props.exercises}
      </p>
    </>
  )
}


const Parts = (props) => {
  console.log(props.parts)

  const partList = props.parts.map((part, index) =>
    <p key={index}>{part.name} {part.exercises}</p>

  )

  return (
    < div >
      {partList}
    </div >
  )
}


const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.total}</p>
    </>
  )
}


const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const sum = course.parts.map(part => part.exercises).reduce((a, b) => a + b)
  console.log(sum)

  return (
    <div>
      <Header course={course.name} />
      <Parts parts={course.parts} />
      <Total total={sum} />

    </div>)
}

export default App
