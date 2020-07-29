const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true
  },
  name: {
    type: String,
    required: true,
    unique: false,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: false}]
  
})
userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  }}
)

// vaihtoehtoinen toteutustapa, jolloin näkymää ei tarvitse määritellä routerissa lainkaan

/*userSchema.virtual('blogs', {
  ref: 'Blog',
  localField: '_id',
  foreignField: 'user',
  justOne: false}
)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash,
    //delete returnedObject.blogs.likes
    returnedObject.blogs = returnedObject.blogs ? returnedObject.blogs.map(( {likes, user, ...blog} ) => blog) : null
  },  virtuals: true}
)*/

const User = mongoose.model('User', userSchema)

module.exports = User