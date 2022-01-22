import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

import RecipeCategory from './recipe-category'

describe('RecipeCategory', () => {
  test('renders the recipe category based on the props provided', () => {
    render(
      <RecipeCategory
        category="test category"
        id="1"
        recipesCount={1}
        photos={[
          {
            imageSource: 'http://some-image.net',
            imageTitle: 'Photo 1'
          }
        ]}
      />
    )

    const recipeCategory = screen.getByTestId('recipe-category', { exact: true })
    expect(recipeCategory).toBeVisible()

    const galleryPhoto = screen.getByTestId('recipe-category-gallery-photos', { exact: true })
    expect(galleryPhoto).toBeVisible()

    const footer = screen.getByTestId('recipe-category-footer', { exact: true })
    expect(footer).toBeVisible()

    const footerLink = screen.getByTestId('recipe-category-footer-link', { exact: true })
    expect(footerLink).toBeVisible()
  })

  test('renders the recipe category based on the props provided', () => {
    render(
      <RecipeCategory
        category="test category"
        id="1"
        recipesCount={1}
        photos={[
          {
            imageSource: 'http://some-image.net',
            imageTitle: 'Photo 1'
          },
          {
            imageSource: 'http://some-image.net',
            imageTitle: 'Photo 1'
          }
        ]}
      />
    )

    const galleryPhoto = screen.getByTestId('recipe-category-gallery-photos', { exact: true })
    const galleryImages = galleryPhoto.querySelectorAll('img')
    expect(galleryImages.length).toEqual(2)
  })

  test('the footer displays the recipes count that the recipe categoy has', () => {
    render(
      <RecipeCategory
        category="test category"
        id="1"
        recipesCount={1000}
        photos={[
          {
            imageSource: 'http://some-image.net',
            imageTitle: 'Photo 1'
          }
        ]}
      />
    )

    const footerText = screen.getByTestId('recipe-category-footer-text', { exact: true })
    expect(footerText.textContent).toEqual('1,000 test category')
  })

  test('the slideshow button is displayed when there are more than 1 gallery photo for the category', () => {
    render(
      <RecipeCategory
        category="test category"
        id="1"
        recipesCount={1000}
        photos={[
          {
            imageSource: 'http://some-image.net',
            imageTitle: 'Photo 1'
          },
          {
            imageSource: 'http://some-image.net',
            imageTitle: 'Photo 2'
          },
          {
            imageSource: 'http://some-image.net',
            imageTitle: 'Photo 3'
          }
        ]}
      />
    )

    const slideshowPlayingButton = screen.getByTestId('recipe-category-slideshow-pause', { exact: true })
    expect(slideshowPlayingButton).toBeVisible()

    const slideshowPausedButton = screen.queryByTestId('recipe-category-slideshow-play', { exact: true })
    expect(slideshowPausedButton).toBeNull()
  })

  test('the play slideshow button is displayed when the slideshow is in paused state', () => {
    render(
      <RecipeCategory
        category="test category"
        id="1"
        recipesCount={1000}
        photos={[
          {
            imageSource: 'http://some-image.net',
            imageTitle: 'Photo 1'
          },
          {
            imageSource: 'http://some-image.net',
            imageTitle: 'Photo 2'
          },
          {
            imageSource: 'http://some-image.net',
            imageTitle: 'Photo 3'
          }
        ]}
      />
    )

    const slideshowPlayingButton = screen.getByTestId('recipe-category-slideshow-pause', { exact: true })
    fireEvent.click(slideshowPlayingButton)

    const playButton = screen.queryByTestId('recipe-category-slideshow-pause', { exact: true })
    expect(playButton).toBeNull()

    const slideshowPausedButton = screen.queryByTestId('recipe-category-slideshow-play', { exact: true })
    expect(slideshowPausedButton).toBeVisible()
  })
})
