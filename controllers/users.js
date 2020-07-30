const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  console.log('POST user', request.body)
  const body = request.body
  if (body.password.length > 3) {
    const userNames = await User.find({username: body.username})
    if (userNames.length===0) {
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(body.password, saltRounds)
      const user = new User({
        username: body.username,
        name: body.name,
        password: passwordHash,
        blogs: null
      })
      const savedUser = await user.save()
      response.json(savedUser)
    } else {
      response.status(400).json({error: 'the username should be unique'})
    }
  } else {
    response.status(400).json({error: 'the minimum length of a password is three characters'})
  }
})

usersRouter.get('/', async (request, response) => {
  var users = await User
    .find({},{password: 0})
    .populate('blogs', { likes: 0})
  response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter