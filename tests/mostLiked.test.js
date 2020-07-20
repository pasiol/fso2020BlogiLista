const listHelper = require('../utils/list_helper')

describe('favoriteBlog', () => {
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
    }
  ]

  const mostVoted = {
    title:   'Dev To',
    url:   'https://dev.to',
    likes: 4,
    id:   '5cd833e3dcd44661c140b084'
  }

  test('getting the most liked blog item', () => {
    const result = listHelper.favoriteBlog(blogList)
    expect(result).toEqual(mostVoted)
  })
})