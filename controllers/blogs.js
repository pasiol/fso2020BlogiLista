const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger =  require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', {username: 1, name: 1, id: 1})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken || !decodedToken.id) {
    return response.status(401).json({error: 'token missing or invalid'})
  }
  var likes = 0
  if ('likes' in request.body) {
    likes = request.body.likes
  }

  if (('title' in request.body) && ('url' in request.body))  {
    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: likes,
      user: decodedToken.id
      //user: request.body.user
    })
    console.log('POST blog:', blog)
    const savedBlog = await blog.save()
    const user = await User.findById(decodedToken.id)
    console.log('User:', user)
    user.blogs = await user.blogs.concat(savedBlog.id)
    console.log('user.blogs', user.blogs)
    await user.save()
    response.json(savedBlog.toJSON())  
  } else {
    response.status(400).send()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  logger.info('DELETE request-body:', request.params)
  if (request.token !== null) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    console.info('decodedToken:', decodedToken, decodedToken.id)
    if (!decodedToken || !decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'})
    }
    const blog = await Blog.find({_id: mongoose.Types.ObjectId(request.params.id), user: decodedToken.id}, {id: 1})
    console.info('blog', blog)
    if (blog.length===1) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      response.status(400).send()
    }
  } else {
    return response.status(401).json({error: 'token missing or invalid'})
  }
})

blogsRouter.put('/:id', async (request, response) => {
  // TODO: test that document is already in db
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
