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
  var likes = 0
  if ('likes' in request.body) {
    likes = request.body.likes
  }

  if (('title' in request.body) && ('url' in request.body) && ('user' in request.body))  {
    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: likes,
      user: request.body.user
    })
    console.log('POST blog:', blog)
    const savedBlog = await blog.save()
    const user = await User.findById(blog.user)
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

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
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
