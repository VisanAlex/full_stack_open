const Course = (props) => {
    let course = props.course;
    let totalCourses = 0;
    course.parts.map(part => totalCourses = totalCourses + part.exercises);
    return (
        <>
            <h1>{course.name}</h1>
            {course.parts.map(part => 
                <p key={part.id}>{part.name} {part.exercises}</p>
            )}
            <h4>total of {totalCourses} exercises</h4>  
        </>
    )
  }
  
  export default Course