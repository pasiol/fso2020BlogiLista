const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger =  require('../utils/logger')
const { response } = require('express')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', async (request, response, next) => {
  logger.info('POST request-body:', request.body)
  var likes = 0
  if ('likes' in request.body) {
    likes = request.body.likes
  }

  if (('title' in request.body) && ('url' in request.body))  {
    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: likes
    })
    logger.info('POST blog', blog)
    try {
      const savedBlog = await blog.save()
      response.json(savedBlog.toJSON())
    } catch (exception) {
      next (exception)
    }  
  } else {
    response.status(400).send()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  logger.info('DELETE request-body:', request.params)

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  logger.info('PUT request-body:', request.body)

  const updateStatement = {} 
  if ('title' in request.body) {
    updateStatement['title'] = request.body.title
  }
  if ('url' in request.body) {
    updateStatement['url'] = request.body.url
  }
  if ('likes' in request.body) {
    updateStatement['likes'] = request.body.likes
  }

  await Blog.findByIdAndUpdate(request.params.id, updateStatement, {runValidators: true})
  response.json(request.params).end()
})

module.exports = blogsRouter
