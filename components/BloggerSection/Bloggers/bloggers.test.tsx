import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Bloggers from './bloggers'

describe('Bloggers', () => {
  const getBloggersMockData = (count: number) => {
    const mockData = []
    for (let i = 0; i < count; i++) {
      mockData.push({
        title: `blogger title test ${i + 1}`,
        blogUrl: `http://some-url-${i + 1}.net`,
        highlight: `testing blogger card ${i + 1}`,
        youtubeUrl: `http://some-youtube-url-${i + 1}.net`,
        facebookUrl: `http://some-facebook-url-${i + 1}.net`,
        twitterUrl: `http://some-twitter-url-${i + 1}.net`
      })
    }
    return mockData
  }

  test('renders the bloggers section based on the props provided', () => {
    render(<Bloggers bloggers={getBloggersMockData(3)} />)
    const bloggersSection = screen.getByTestId('bloggers', { exact: true })
    expect(bloggersSection).toBeVisible()
  })

  test('display the blogger section header', () => {
    render(<Bloggers bloggers={getBloggersMockData(3)} />)
    const bloggersHeader = screen.getByTestId('bloggers-header', { exact: true })
    expect(bloggersHeader.textContent).toEqual('Credit to bloggers')
  })

  test('display the bloggers grid on the bloggers section', () => {
    render(<Bloggers bloggers={getBloggersMockData(3)} />)
    const bloggersGrid = screen.getByTestId('bloggers-grid', { exact: true })
    expect(bloggersGrid).toBeVisible()
  })

  test('display the blogger cards on the bloggers section based on the props provided', () => {
    render(<Bloggers bloggers={getBloggersMockData(3)} />)
    const bloggerCards = screen.getAllByTestId('blogger-card', { exact: true })
    expect(bloggerCards.length).toEqual(3)
  })

  test('display the top 100 food bloggers on the bloggers section', () => {
    render(<Bloggers bloggers={getBloggersMockData(3)} />)
    const bloggerTopFoodBlogsLink = screen.getByTestId('bloggers-top-food-blogs-link', { exact: true })
    expect(bloggerTopFoodBlogsLink).toBeVisible()
    expect(bloggerTopFoodBlogsLink.getAttribute('href')).toEqual(
      'https://blog.feedspot.com/indian_food_blogs/?_src=search'
    )
  })
})
