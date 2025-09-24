
const Header = (props) => <h1>{props.course}</h1>

const Part = (props) => (
    <p>
    {props.part.name} {props.part.exercises}
    </p>
)

const Content = (props) => {
    return (
        <div>
        { props.parts.map(part => <Part key={part.id} part={part} />) }
        </div>
    )
}

const Total = (props) => <p>Total of {props.total}</p>



const Course = (props) => {
    return (
        <>
        <Header course={props.course.name} />
        <Content parts={props.course.parts} />
        <Total total={props.course.total} />
        </>
    )

}

export default Course
