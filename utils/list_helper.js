const _ = require('lodash')

const dummy = (blogs) => {
  if (blogs === blogs) {
    return 1
  }
}

const totalLikes = (blogs) => {
  const reducer = (sum, value) => sum + value
  const likes = blogs.map((blog) => blog.likes)
  return likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => _.maxBy(blogs, 'likes')

const mostBlogs = (blogs) => {
  const summary = _.countBy(blogs, 'author')
  var mostLinkedAuthor = {
    author: null,
    blogs: null
  }
  var mostLinkedCount=0
  for (var key in summary) {
    if (summary[key] > mostLinkedCount) {
      mostLinkedAuthor['author'] = key
      mostLinkedAuthor['blogs'] = summary[key]
      mostLinkedCount = summary[key]
    }
  }

  return mostLinkedAuthor
}

const mostLikes = (blogs) => {
  const likesGroupByAuthor = _.groupBy(blogs, 'author')
  console.log(likesGroupByAuthor)

  var mostLikesAuthor = {
    author: null,
    likes: null
  }
  var maxLikes = 0

  for (var author in likesGroupByAuthor) {
    const reducer = (sum, value) => sum + value
    const likes = likesGroupByAuthor[author].map((blog) => blog.likes)
    const likesByAuthor = likes.reduce(reducer,0)
    if (likesByAuthor>maxLikes) {
      mostLikesAuthor['author'] = author
      mostLikesAuthor['likes'] = likesByAuthor
      maxLikes = likesByAuthor
    }
  }
  return mostLikesAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes 
}