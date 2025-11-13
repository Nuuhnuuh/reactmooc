import { useSelector, useDispatch } from 'react-redux'

import Anecdote from './components/Anecdote.jsx'
import AnecdoteForm from './components/AnecdoteForm.jsx'

const App = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  const addAnecdote = (content) => {
    dispatch(createAnecdote(content))
  }

  const vote = id => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <Anecdote key={anecdote.id}
        votes={anecdote.votes || 0}
        content={anecdote.content}
        handleVote={() => { vote(anecdote.id) }} />
      ))}
      <AnecdoteForm handleCreate={addAnecdote} />
    </div>
  )
}

export default App
