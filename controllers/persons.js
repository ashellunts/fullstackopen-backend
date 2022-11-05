const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.put('/:id', (request, response, next) => {
    const person = {
        name: request.body.name,
        number: request.body.number,
    }

    Person.findByIdAndUpdate(
        request.params.id,
        person,
        { new: true, runValidators: true }
    )
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

personsRouter.post('/', (request, response, next) => {
    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
        .catch(error => next(error))
})

personsRouter.get('/', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

personsRouter.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        let result = `Phonebook has info for ${persons.length} people`
        result += "<br>"
        result += new Date()
        response.status(200).send(result)
    })
})

personsRouter.get('/:id', (request, response, next) => {
    Person
        .findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

personsRouter.delete('/:id', (request, response, next) => {
    const person_id = request.params.id
    Person.findByIdAndRemove(person_id).then(() => {
        response.status(204).end()
    }).catch(error => {
        next(error)
    })
})

module.exports = personsRouter
