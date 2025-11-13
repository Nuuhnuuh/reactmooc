
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import anecdoteReducer from '../reducers/anecdoteReducer'

const AnecdoteForm = ({handleCreate}) => {

    const dispatch = useDispatch()

    return (
        <>
            <h2>create new</h2>
                <form>
                <div>
                <label> content
                    <input name='anecdote' />
                    </label>
                </div>
                <button onClick={handleCreate}>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm
