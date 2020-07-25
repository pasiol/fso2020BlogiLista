const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./testHelper')
const app = require('../app')
const Blog = require('../models/blog')
const { response } = require('../app')
const { documentsInDb } = require('./testHelper')

const api = supertest(app)

beforeEach(async ()=> {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.testData)
})

describe('getting data', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.testData.length)
  })

  test('documents has id field', async () => {
    const response = await api.get('/api/blogs')
    const document = response.body[0]
    expect(document['id']).toBeDefined()
  })
})

describe('adding data', ()=> {
  test('posting a new document', async () => {
    const newBlog = new Blog(helper.testDocument)

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAfterPost = await helper.documentsInDb()
    expect(blogsAfterPost).toHaveLength(helper.testData.length + 1)
    const titles = blogsAfterPost.map(b => b.title) 
    expect(titles).toContain(helper.testDocument['title'])
  })

  test('posting a new document without likes-property', async() => {
    var newBlog = new Blog({
      title: helper.testDocument.title,
      author: helper.testDocument.author,
      url: helper.testDocument.url
    })
    console.log('newBlog', newBlog)
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAfterPost = await helper.documentsInDb()
    const addedBlog = blogsAfterPost.filter(b => b.title === newBlog['title'])[0]
    console.log('addedBlog', addedBlog)
    expect(addedBlog['likes']).toBeDefined()
    expect(addedBlog.likes).toEqual(0)
  })

  test('posting a new document without title-property', async() => {
    var newBlog = new Blog({
      author: helper.testDocument.author,
      url: helper.testDocument.url,
      likes: 0
    })
    console.log('newBlog', newBlog)
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('posting a new document without url-property', async() => {
    var newBlog = new Blog({
      title: helper.testDocument.title,
      author: helper.testDocument.author,
      likes: 0
    })
    console.log('newBlog', newBlog)
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('updating likes property', async ()=> {
    const blogs = await helper.documentsInDb()
    const randomBlog = blogs[Math.floor((Math.random() * blogs.length))]
    randomBlog.likes = randomBlog.likes + 1
    console.log('randomBlog', randomBlog)

    await api
      .put(`/api/blogs/${randomBlog.id}`)
      .send({likes: randomBlog.likes})
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const dataAfterUpdate = await helper.documentsInDb()
    const updatedBlog = dataAfterUpdate.filter(b => b.id === randomBlog.id)[0]
    console.log('updatedBlog', updatedBlog)
    expect(updatedBlog.likes).toEqual(randomBlog.likes)
  })
})

describe('deleting data', () => {

  test('deleting blog by id', async() => {
    const blogs = await helper.documentsInDb()
    const randomBlog = blogs[Math.floor((Math.random() * blogs.length))]
    console.log('randomBlog', randomBlog)

    await api
      .delete(`/api/blogs/${randomBlog.id}`)
      .expect(204)

    const blogsAfterDelete = await helper.documentsInDb()

    expect(blogsAfterDelete).toHaveLength(blogs.length - 1)
    
  })
})

afterAll(() => {
  mongoose.connection.close()
})