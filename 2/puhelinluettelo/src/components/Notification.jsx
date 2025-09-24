
const Notification = (props) => {
    console.log(props.text);
    return (
        <>
            <div className={props.style}>{props.text}</div>
        </>
    )
}

export default Notification
