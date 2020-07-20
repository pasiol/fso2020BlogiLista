const listHelper = require('../utils/list_helper')

describe('most likes', () => {

  const blogList = [
    {
      title:   'Let’s Code: Test-Driven JavaScript',
      author:   'James Shore',
      url:   'http://www.letscodejavascript.com/',
      likes: 8,
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
      likes: 2,
      id:   '5d11c47e1e6b14134e53b8d9'
    },
    {
      title: 'Talk Python To Me',
      author: 'Michael Kennedy',
      url: 'https://talkpython.fm/',
      likes: 3
    },
    {
      title: 'Python Bytes',
      author: 'Michael Kennedy',
      url: 'https://pythonbytes.fm/',
      likes: 5
    }
  ]

  const emptyBlogList = []

  const mostLikes = { author: 'James Shore', likes: 8 }
  const mostLikesEmptyList = { author: null, likes: null }

  test('founding most linked author from non empty list, one most linked', () => {
    const result = listHelper.mostLikes(blogList)
    expect(result).toEqual(mostLikes)
  })

  test('founding most linked author from empty list', () => {
    const result = listHelper.mostLikes(emptyBlogList)
    expect(result).toEqual(mostLikesEmptyList)
  })
})