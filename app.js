const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const persons = require('./controllers/persons')
const app = express()

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(express.json())
app.use(cors())
app.use(express.static("build"))
app.use(middleware.requestLogger)
app.use('/api/persons', persons)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler) // this has to be the last loaded middleware

module.exports = app
