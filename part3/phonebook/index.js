require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

const Person = require('./models/person')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
morgan.token('data', (request) => (request.body.name ? JSON.stringify(request.body) : '-'))
app.use(morgan(':method :url :status :total-time[3] ms :data'))

app.get('/api/persons', (require, response) => {
  Person.find({}).then((persons) => response.json(persons))
})

app.get('/info', (request, response) => {
  Person.find({}).then((persons) => {
    const personsCount = persons.length
    const date = new Date()
    response.end(`Phonebook has info for ${personsCount} people ${date}`)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  const { id } = request.params

  Person.findById(id).then((person) => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const { id } = request.params

  Person.findByIdAndRemove(id)
    .then((person) => {
      if (person) {
        response.status(204).end()
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const { body } = request

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then((p) => response.json(p))
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { body } = request

  Person.findByIdAndUpdate(body.id, body, { new: true, runValidators: true, context: 'query' })
    .then((person) => {
      if (person) {
        response.status(201).end()
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

const unknowEndPoint = (request, response) => {
  response.status(404).send({ error: 'unknow end-point' })
}

app.use(unknowEndPoint)

const errorHandler = (error, request, response) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformated id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  if (error.code === 11000) {
    return response.status(409).json({ error: 'Duplication record' })
  }
  return response.status(500).json({ error: 'Some error heppen' })
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
