const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const supertest = require('supertest')
const fs = require('fs')

const api = supertest(app)

const getUsersInDB = async () => {
  var users = []
  users = await User.find({})
  console.log('Getting users: ', users)
  return users
}

const getBlogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const getTestBlogs = async () => {
  const testBlogsRaw = fs.readFileSync('./tests/testBlogs.json')
  var testBlogs = await JSON.parse(testBlogsRaw)
  const users = await getUsersInDB()
  for (let blog of testBlogs) {
    blog.user = users[Math.floor((Math.random() * users.length))].id
  }
  console.log('testBlogs', testBlogs)
  return testBlogs
}

const updateUsersWithBlogs = async () => {
  const users = await getUsersInDB()
  const blogs =  await getBlogsInDB()
  for (let user of users) {
    console.log('user.id', user.id)
    const usersBlogs = blogs.filter(b => b.user.equals(user.id))
    const blogIds = usersBlogs.map(b => b.id)
    console.log('usersBlogs', blogIds)
    user.blogs = blogIds
    await user.save()
  }
} 

const getTestBlog = async () => {
  const testBlogRaw = await fs.readFileSync('./tests/testBlog.json')
  const  testBlog = await JSON.parse(testBlogRaw)
  //const users = await getUsersInDB()
  //const randomuser = users[Math.floor((Math.random() * users.length))].id
  //testBlog.user = randomuser
  testBlog.user = null
  console.log('newTestBlog', testBlog)
  return testBlog
}

const getTokenAndUserId = async() => {
  const users = await getUsersInDB()
  const randomUser = await users[Math.floor((Math.random() * users.length))]
  const usernameAndPassword = {username: randomUser.username, password: process.env.TEST_USER_PASSWORD}
  console.info('usernameAndPassword: ', usernameAndPassword)
  const response = await api
    .post('/api/login')
    .send(usernameAndPassword)
  console.info('login reponse: ', response.body)

  return {token: response.body.token, userId: randomUser.id}
}

module.exports = {
  getBlogsInDB,
  getUsersInDB,
  getTestBlogs,
  getTestBlog,
  updateUsersWithBlogs,
  getTokenAndUserId
}