import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Recipe from './recipe'

describe('Recipe', () => {
  const recipeMockData = {
    id: '1',
    categoryId: 'rice',
    name: `rice dish 1`,
    url: 'https://some-url',
    imageSource: 'https://some-image-url.net'
  }

  test('renders recipe card from the provided props', () => {
    render(<Recipe {...recipeMockData} />)
    const card = screen.getByTestId('recipe-card', { exact: true })
    expect(card).toBeVisible()
  })

  test('renders the link to the actual recipe on the recipe card from the provided props', () => {
    render(<Recipe {...recipeMockData} />)
    const card = screen.getByTestId('recipe-card', { exact: true })
    const link = card.querySelector("[data-testid='recipe-card-link']")
    expect(link?.textContent).toEqual(recipeMockData.name)
  })
})
