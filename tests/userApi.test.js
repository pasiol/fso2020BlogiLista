const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./testHelperUser')
const helperBlog = require('./testHelper')
const app = require('../app')
const User = require('../models/user')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async ()=> {
  await User.deleteMany({})
  const testUsers = await helper.getTestUsers()
  await User.insertMany(testUsers)
  await Blog.deleteMany({})
  const blogs = await helperBlog.getTestBlogs()
  await Blog.insertMany(blogs)
  await helperBlog.updateUsersWithBlogs()
})

describe('getting data', () => {

  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all users are returned', async () => {
    const response = await api.get('/api/users')
    const testUsers = await helper.getTestUsers()
    expect(response.body).toHaveLength(testUsers.length)
  })

  test('documents has id field', async () => {
    const response = await api.get('/api/users')
    console.log('Response', response.body)
    const firstUser = response.body[0]
    expect(firstUser['id']).toBeDefined()
  })
})

describe('adding data', ()=> {
  test('user: password length is 2 characters', async () => {
    const newUser = {
      username: 'Matti Möttönen',
      name: 'Matti Möttönen',
      password: 'ab',
      blogs: null
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    console.log('post response:', response.body)
    expect(response.body.error).toContain('the minimum length of a password is three characters')
  })

  test('user: username already exists', async () => {
    const users = await helper.getUsersInDb()
    const randomUser = users[Math.floor((Math.random() * users.length))]

    const newUser = {
      username: randomUser.username,
      name: randomUser.name,
      password: 'secret',
      blogs: null
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(response.body.error).toContain('the username should be unique')
  })
})

afterAll(() => {
  mongoose.connection.close()
})