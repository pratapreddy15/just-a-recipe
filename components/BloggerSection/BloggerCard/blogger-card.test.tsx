import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import BloggerCard from './blogger-card'

describe('BloggerCard', () => {
  const bloggerMockData = {
    title: 'blogger title test',
    url: 'http://some-url.net',
    content: 'testing blogger card',
    youtubeUrl: 'http://some-youtube-url.net',
    facebookUrl: 'http://some-facebook-url.net',
    twitterUrl: 'http://some-twitter-url.net'
  }

  beforeEach(() => {
    render(
      <BloggerCard
        bloggerTitle={bloggerMockData.title}
        blogUrl={bloggerMockData.url}
        highlight={bloggerMockData.content}
        youtubeUrl={bloggerMockData.youtubeUrl}
        facebookUrl={bloggerMockData.facebookUrl}
        twitterUrl={bloggerMockData.twitterUrl}
      />
    )
  })

  test('renders the blogger card based on the props provided', () => {
    // blogger-card
    const bloggerCard = screen.getByTestId('blogger-card', { exact: true })
    expect(bloggerCard).toBeVisible()
    // blogger-card-title
    const bloggerCardTitle = screen.getByTestId('blogger-card-title', { exact: true })
    expect(bloggerCardTitle).toBeVisible()
    // blogger-card-title-link
    const bloggerCardTitleLink = screen.getByTestId('blogger-card-title-link', { exact: true })
    expect(bloggerCardTitleLink).toBeVisible()
    // blogger-card-socialmedias
    const bloggerCardSocialMedias = screen.getByTestId('blogger-card-socialmedias', { exact: true })
    expect(bloggerCardSocialMedias).toBeVisible()
    // blogger-card-youtube
    const bloggerCardYoutube = screen.getByTestId('blogger-card-youtube', { exact: true })
    expect(bloggerCardYoutube).toBeVisible()
    // blogger-card-youtube-link
    const bloggerCardYoutubeLink = screen.getByTestId('blogger-card-youtube-link', { exact: true })
    expect(bloggerCardYoutubeLink).toBeVisible()
    // blogger-card-facebook
    const bloggerCardFacebook = screen.getByTestId('blogger-card-facebook', { exact: true })
    expect(bloggerCardFacebook).toBeVisible()
    // blogger-card-facebook-link
    const bloggerCardFacebookLink = screen.getByTestId('blogger-card-facebook-link', { exact: true })
    expect(bloggerCardFacebookLink).toBeVisible()
    // blogger-card-twitter
    const bloggerCardTwitter = screen.getByTestId('blogger-card-twitter', { exact: true })
    expect(bloggerCardTwitter).toBeVisible()
    // blogger-card-twitter-link
    const bloggerCardTwitterLink = screen.getByTestId('blogger-card-twitter-link', { exact: true })
    expect(bloggerCardTwitterLink).toBeVisible()
  })

  test('blogger card title link is displayed based on the props provided', () => {
    const bloggerCardTitle = screen.getByTestId('blogger-card-title-link', { exact: true })
    expect(bloggerCardTitle.textContent).toEqual(bloggerMockData.title)
    expect(bloggerCardTitle.getAttribute('href')).toEqual(bloggerMockData.url)
  })

  test('blogger youtube link is displayed based on the props provided', () => {
    const bloggerCardYoutubeLink = screen.getByTestId('blogger-card-youtube-link', { exact: true })
    expect(bloggerCardYoutubeLink.getAttribute('href')).toEqual(bloggerMockData.youtubeUrl)
  })

  test('blogger facebook link is displayed based on the props provided', () => {
    const bloggerCardFacebookLink = screen.getByTestId('blogger-card-facebook-link', { exact: true })
    expect(bloggerCardFacebookLink.getAttribute('href')).toEqual(bloggerMockData.facebookUrl)
  })

  test('blogger twitter link is displayed based on the props provided', () => {
    const bloggerCardTwitterLink = screen.getByTestId('blogger-card-twitter-link', { exact: true })
    expect(bloggerCardTwitterLink.getAttribute('href')).toEqual(bloggerMockData.twitterUrl)
  })
})
