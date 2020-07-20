const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  
  const emptyList = []
  
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const blogList = [
    {
      title:   'Let’s Code: Test-Driven JavaScript  ',
      author:   'James Shore  ',
      url:   'http://www.letscodejavascript.com/  ',
      likes: 1,
      id:   '5cd7f539cef80a16395ce2ad  '
    },
    {
      title:   'Dev To  ',
      url:   'https://dev.to  ',
      likes: 4,
      id:   '5cd833e3dcd44661c140b084  '
    },
    {
      title:   'William Vincent, mainly Django  ',
      author:   'William Vincent  ',
      url:   'https://wsvincent.com/  ',
      likes: 1,
      id:   '5d11c47e1e6b14134e53b8d9  '
    }
  ]
  
  test('when list empty', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has three members and sum of the likes is 6', () => {
    const result = listHelper.totalLikes(blogList)
    expect(result).toBe(6)
  })
})