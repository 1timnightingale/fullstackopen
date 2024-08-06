import Part from './Part'

const Course = ({ course }) => {
    const parts = course.parts

    return (
        <div>
            <h1>{course.name}</h1>
            {
                parts.map(part =>
                    <Part key={part.id} part={part} />
                )
            }

            <p><strong>Total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</strong></p>
        </div>
    )
}

export default Course

