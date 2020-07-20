const listHelper = require('../utils/list_helper')

describe('most linked', () => {

  const blogList = [
    {
      title:   'Let’s Code: Test-Driven JavaScript',
      author:   'James Shore',
      url:   'http://www.letscodejavascript.com/',
      likes: 1,
      id:   '5cd7f539cef80a16395ce2ad'
    },
    {
      title:   'Dev To',
      author:   'Dev To',
      url:   'https://dev.to',
      likes: 4,
      id:   '5cd833e3dcd44661c140b084'
    },
    {
      title:   'William Vincent, mainly Django',
      author:   'William Vincent',
      url:   'https://wsvincent.com/',
      likes: 1,
      id:   '5d11c47e1e6b14134e53b8d9'
    },
    {
      title: 'Talk Python To Me',
      author: 'Michael Kennedy',
      url: 'https://talkpython.fm/',
      likes: 1
    },
    {
      title: 'Python Bytes',
      author: 'Michael Kennedy',
      url: 'https://pythonbytes.fm/',
      likes: 1
    }
  ]

  const emptyBlogList = []

  const mostLinked = { author: 'Michael Kennedy', blogs: 2 }
  const mostLinkedEmptyList = { author: null, blogs: null }

  test('founding most linked author from non empty list, one most linked', () => {
    const result = listHelper.mostBlogs(blogList)
    expect(result).toEqual(mostLinked)
  })

  test('founding most linked author from empty list', () => {
    const result = listHelper.mostBlogs(emptyBlogList)
    expect(result).toEqual(mostLinkedEmptyList)
  })
})