/*
 *  BACKEND
 */

const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123458"
    },
    {
        id: "2",
        name: "Kimi Raikkonen",
        number: "040-1231829"
    },
    {
        id: "3",
        name: "Isaac Newton",
        number: "040-12342234"
    }
]

app.get('/info', (request, response) => {
    response.writeHead(200, "Content-Type: text/html");
    response.write(`Phonebook has ${persons.length} contacts \n ${new Date().toString()}`);
    response.end();

})

app.get('/api/persons', (request, response) => {
    response.json(persons)
    response.end();
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else
    {
        response.status(404).end();
    }
})

/*const generateId = () => {
    const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
    return String(maxId + 1)
}*/

const generateId = () => {
    return Math.floor(Math.random() * 2147483647);
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body);

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Missing fields (name, number)'
        })
    }

    const note = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    if (persons.find(p => p.name === body.name)) {
        return response.status(400).json({
            error: 'Name must be unique'
        })
    }

    persons = persons.concat(note)

    response.json(note)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
