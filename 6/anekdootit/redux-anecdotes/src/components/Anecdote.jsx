
const Anecdote = ({handleVote, content, votes}) => {

    return (
        <>
        <div>{content}</div>
          <div>
            has {votes}
            <button onClick={handleVote}>vote</button>
          </div>
          </>
    )
}

export default Anecdote
