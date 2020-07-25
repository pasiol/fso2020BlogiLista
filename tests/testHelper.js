const Blog = require('../models/blog')
const fs = require('fs')

let testDataRaw = fs.readFileSync('./tests/testData.json')
let testData = JSON.parse(testDataRaw)

const testDocumentRaw = fs.readFileSync('./tests/testDocument.json')
const testDocument = JSON.parse(testDocumentRaw)

const documentsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  testData,
  testDocument,
  documentsInDb
}