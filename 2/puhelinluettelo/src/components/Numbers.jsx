
const Number = (props) => {
    return (
        <>
            <li>{props.name} {props.number}</li>
            <button id={props.id} onClick={props.handleRemove}>delete</button>
        </>
    )
}

const Numbers = (props) => {
  return (
    <>
    <h2>Numbers</h2>
    { props.contacts.map(person => <Number handleRemove={props.handleRemove} key={person.name} id={person.id} name={person.name} number={person.number}/>) }
    </>
  )
}

export default Numbers
