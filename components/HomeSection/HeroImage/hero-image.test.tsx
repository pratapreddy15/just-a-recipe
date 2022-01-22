import React from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

import HeroImage from './hero-image'

{
  /* <div class="spinner"></div><span style="box-sizing: border-box; display: block; overflow: hidden; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: absolute; top: 0px; left: 0px; bottom: 0px; right: 0px;"><img data-testid="hero-content-image" alt="Photo by Ethan Hunt" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" decoding="async" data-nimg="fill" style="position: absolute; top: 0px; left: 0px; bottom: 0px; right: 0px; box-sizing: border-box; padding: 0px; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%;"><noscript></noscript></span><div data-testid="hero-content-credit" class="credit">Photo by <a data-testid="hero-content-credit-link" target="_blank" href="https://some-author-url.net" rel="noreferrer">Ethan Hunt</a> on <a data-testid="hero-content-credit-link" target="_blank" href="https://unsplash.com" rel="noreferrer">Unsplash</a></div> */
}

describe('HeroImage', () => {
  const heroImageProps = {
    datasets: { a: 'b' },
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    imagePath: 'https://rakskitchen.net/wp-content/uploads/2012/03/6982065839_280e3d5a04_z.jpg',
    authorName: 'Ethan Hunt',
    authorUrl: 'https://some-author-url.net'
  }

  let stateObjectMock: { isImageLoaded: boolean; setIsImageLoaded: (value: boolean) => void } = {
    isImageLoaded: false,
    setIsImageLoaded: (value: boolean) => {
      stateObjectMock.isImageLoaded = value
    }
  }

  const mockReactState = (initialValue: boolean) => {
    const useStateMock = jest.fn().mockImplementation((doesnotmatter: boolean) => {
      stateObjectMock.isImageLoaded = initialValue
      const isImageLoaded = stateObjectMock.isImageLoaded
      const setIsImageLoaded = stateObjectMock.setIsImageLoaded
      return [isImageLoaded, setIsImageLoaded]
    })
    jest.spyOn(React, 'useState').mockImplementation(useStateMock)
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders the content on the page', async () => {
    mockReactState(false)
    render(<HeroImage {...heroImageProps} />)
    const heroContent = screen.getByTestId('hero-content', { exact: true })
    expect(heroContent).toBeVisible()

    const heroContentImage = screen.getByTestId('hero-content-image', { exact: true })
    expect(heroContentImage).toBeVisible()

    const heroContentCredit = screen.getByTestId('hero-content-credit', { exact: true })
    expect(heroContentCredit).toBeVisible()

    const heroContentCreditLinks = screen.getAllByTestId('hero-content-credit-link', { exact: true })
    expect(heroContentCreditLinks.length).toEqual(2)

    heroContentCreditLinks.forEach((link) => {
      expect(link).toBeVisible()
    })
  })

  test('displays the hero content text if the image is loaded', async () => {
    mockReactState(true)
    render(<HeroImage {...heroImageProps} />)

    const heroContentText = screen.getByTestId('hero-content-text', { exact: true })
    expect(heroContentText).toBeVisible()

    expect(heroContentText.textContent).toEqual(
      `Lorem Ipsum is simply dummy text of the printing and typesetting industry.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
    )
  })

  test("displays the spinner if the image is loading", () => {
    mockReactState(false)
    render(<HeroImage {...heroImageProps} />)

    const heroContentText = screen.queryByTestId('hero-content-text', { exact: true })
    expect(heroContentText).toBeNull()

    const spinner = screen.getByTestId('image-loader', { exact: true })
    expect(spinner).toBeVisible()
  })
})
