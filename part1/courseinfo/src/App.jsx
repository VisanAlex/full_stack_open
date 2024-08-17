const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {

  return (
    <>
          <p>
            {props.part} {props.exercises}
          </p>
    </>
  )

}

const Content = (props) => {
  const data = props.courseData;

  return (
    <>
      {Object.keys(data).map((oneKey, i) => {
        return (
          <Part key={i} part={data[oneKey].part} exercises={data[oneKey].exercises} />
        );
      })}
    </>
  );
};


const Total = (props) => {
  const data = props.courseData;
  const total = data.reduce((sum, item) => sum + item.exercises, 0);
  return (
    <>
    <p>Number of exercises {total}</p>
   </>
  )
}

const App = () => {
    const course = 'Half Stack application development';
    const courseData = [
      { part: 'Fundamentals of React', exercises: 10 },
      { part: 'Using props to pass data', exercises: 7 },
      { part: 'State of a component', exercises: 14 },
    ]

  return (
    <div>
      <Header course={course} />
      <Content courseData={courseData} />
      <Total courseData={courseData} />
    </div>
  )
}

export default App