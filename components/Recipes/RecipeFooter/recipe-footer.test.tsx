import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import RecipeFooter from './recipe-footer'

describe('RecipeFooter', () => {
  test('renders the recipe footer from the provided props', () => {
    render(<RecipeFooter isRecipesLoading={false} loadRecipesHandler={() => {}} />)
    const button = screen.getByTestId('load-more-button')
    expect(button).toBeVisible()
  })

  test('displays the loading text if the isRecipesLoading is true in the provided props', () => {
    render(<RecipeFooter isRecipesLoading={true} loadRecipesHandler={() => {}} />)
    const button = screen.getByTestId('load-more-button', { exact: true })
    expect(button.textContent).toEqual('Loading...')
  })

  test('displays the button text if the isRecipesLoading is false in the provided props', () => {
    render(<RecipeFooter isRecipesLoading={false} loadRecipesHandler={() => {}} />)
    const button = screen.getByTestId('load-more-button', { exact: true })
    expect(button.textContent).toEqual('Load More Recipes')
  })

  test('calls the recipe load handler when the button is clicked that is passed in a props', () => {
    const loadMoreRecipesFn = jest.fn()
    render(<RecipeFooter isRecipesLoading={false} loadRecipesHandler={loadMoreRecipesFn} />)
    const button = screen.getByTestId('load-more-button', { exact: true })
    fireEvent.click(button)
    expect(loadMoreRecipesFn).toHaveBeenCalled()
  })
})
