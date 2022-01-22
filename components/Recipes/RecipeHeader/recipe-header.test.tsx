import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { enableFetchMocks, disableFetchMocks } from 'jest-fetch-mock'

import RecipeHeader from './recipe-header'

describe('RecipeHeader', () => {
  test('renders the recipe header', () => {
    render(<RecipeHeader totalRecipes={10} totalRecipesDisplayed={5} />)
    const recipeHeader = screen.getByTestId('recipe-header', { exact: true })
    expect(recipeHeader).toBeVisible()
  })

  test('displays the header with the text based on the props provided', () => {
    render(<RecipeHeader totalRecipes={10} totalRecipesDisplayed={5} />)
    const recipeHeader = screen.getByTestId('recipe-header', { exact: true })
    const headerText = recipeHeader.querySelector('h4')
    expect(headerText?.textContent).toEqual('Showing 5 recipes of 10')
  })
})
