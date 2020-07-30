const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')

loginRouter.post('/', async (request, response) => {
  logger.info('login request', request.body)
  const user = await User.findOne({ username: request.body.username })
  if (user!==null) {
    const match = await bcrypt.compare(request.body.password, user.password)

    if (match) {
      const userForToken = {
        username: user.username,
        id: user._id,
      }
    
      const token = jwt.sign(userForToken, process.env.SECRET)
    
      response
        .status(200)
        .send({ token, username: user.username, name: user.name })
    } else {
      return response.status(401).json({
        error: 'invalid username or password'
      })
    }
  } else {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }
})

module.exports = loginRouter