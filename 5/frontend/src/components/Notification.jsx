const Notification = ({ message, error }) => {
    const style = {
        backgroundColor: 'red'
    }
    return (
        <div style={style} className='notif'>
            {message}
        </div>
    )
}

export default Notification
