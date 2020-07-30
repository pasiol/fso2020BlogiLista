const bcrypt = require('bcrypt')
const User = require('../models/user')
const fs = require('fs')

const getTestUsers = async () => {
  const testUsersRaw = fs.readFileSync('./tests/testUsers.json')
  var testUsers = await JSON.parse(testUsersRaw)
  const saltRounds = 10
  console.log(testUsers)
  for (let user of testUsers) {
    const passwordHash = await bcrypt.hash(process.env.TEST_USER_PASSWORD, saltRounds)
    user.password = passwordHash
  }
  console.log('testUsers', testUsers)
  return testUsers
}

const getUsersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  getTestUsers,
  getUsersInDb
}