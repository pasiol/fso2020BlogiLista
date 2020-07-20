const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger =  require('../utils/logger')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response, next) => {
  logger.info('POST request-body:', request.body)
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  })

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch((error)=> {
      next(error)
    })
})

module.exports = blogsRouter
