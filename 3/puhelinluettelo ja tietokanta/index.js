/*
 *  BACKEND
 */

require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
const fs = require('fs')
const path = require('path')
const cors = require('cors')

const PORT = process.env.PORT

const app = express()

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id'
        })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error);
}

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

app.get('/info', (request, response, next) => {

    Person.estimatedDocumentCount().then(count => {
        response.writeHead(200, "Content-Type: text/html");
        response.write(`Phonebook has ${count} contacts \n ${new Date().toString()}`);
        response.end();
    })
    .catch (err => next(err))


})

app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(persons => {
        response.json(persons)
        response.end()
    }).catch(err => next(err))
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findById(id).then(person => {
        if (person) {
            response.json(person);
        } else {
            response.status(404).end();
        }
    }).catch(err => next(err))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    console.log(body);

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Missing fields (name, number)'
        })
    }

    Person.find({ name: body.name })
    .then((person) => {
        if (person)
        {
            const newPerson = new Person({
                name: body.name,
                number: body.number
            })

            newPerson.save().then(savedPerson => {
                response.json(person);
            })
            .catch (err => next(err))
        }
        else
        {
            console.log(`person: ${person}`);
            response.status(400).json({ error: 'a new person should have a unique name'})
        }
    })
    .catch(err => next(err))


})

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body

    Person.findById(request.params.id)
    .then(person => {
        if (!person)
            return response.status(404).end();

        person.name = name;
        person.number = number;

        return person.save().then(updatedPerson => {
            response.json(updatedPerson)
        })

    })
    .catch (err => next(err))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch (error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(errorHandler);
app.use(unknownEndpoint)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
