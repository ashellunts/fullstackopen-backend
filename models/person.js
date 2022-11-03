require('dotenv').config()

const mongoose = require('mongoose')
const PhoneNumberValidator = require('./person_validation')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2
    },
    number: {
        type: String,
        required: true,
        minLength: 8,
        validate: {
            validator: function (v) {
                return PhoneNumberValidator.valid(v)
            },
            message: props => `${props.value} is not a valid phone number!`
        },
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
