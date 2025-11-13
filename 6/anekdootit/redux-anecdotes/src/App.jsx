import { useSelector, useDispatch } from 'react-redux'

import Anecdote from './components/Anecdote.jsx'
import AnecdoteForm from './components/AnecdoteForm.jsx'

import { createAnecdote, voteAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  const addAnecdote = (event) => {
    event.preventDefault()
    dispatch(createAnecdote(content))
  }

  const vote = id => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
  }

  console.log(anecdotes)

  return (
    <div>
      <h2>Anecdotes</h2>
      <>
      {anecdotes.map(anecdote => (
        <Anecdote key={anecdote.id}
        votes={anecdote.votes || 0}
        content={anecdote.content}
        handleVote={() => { vote(anecdote.id) }} />
      ))}
      </>
      <AnecdoteForm />
    </div>
  )
}

export default App
