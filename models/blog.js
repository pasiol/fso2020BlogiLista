const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true
  },
  author: { type: String, required: false, unique: false },
  url: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true
  },
  likes: { type: Number, required: true }
})

blogSchema.plugin(uniqueValidator)

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog


