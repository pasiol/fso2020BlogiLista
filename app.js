
const config = require('./utils/config')
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const middleware = require('./utils/middleware')


const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    logger.info('connected db succesfully')
  })
  .catch((error) => {
    logger.error('connecting to db failed: ', error.message)
  })

app.use(express.json())
app.use(middleware.requestLogger)

app.set('json spaces', 4)
app.use(express.static('build'))

app.use('/api/blogs', blogsRouter)

module.exports = app