import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

import Search from './search'
import * as searchEventHandlers from './search-event-handlers'

describe('Search', () => {
  const recipeCategories = [
    {
      id: '1',
      name: 'Item 1'
    },
    {
      id: '2',
      name: 'Item 2'
    },
    {
      id: '3',
      name: 'Item 3'
    }
  ]

  const mockSearchRecipesFn = (recipesCountToReturn: number) => {
    const recipesMock = []
    for (let i = 0; i < recipesCountToReturn; i++) {
      recipesMock.push({
        id: (i + 1).toString(),
        categoryId: 'rice',
        name: `rice dish ${(i + 1).toString()}`,
        url: 'https://some-url',
        imageSource: 'https://some-image-url.net'
      })
    }
    jest.spyOn(searchEventHandlers, 'searchRecipes').mockResolvedValue({
      count: 1,
      recipes: recipesMock
    })
  }

  test('renders the text box and picklist to search for the recipes', () => {
    const { getAllByTestId } = render(<Search recipeCategories={recipeCategories} />)
    const formControls = getAllByTestId('search-form-control', { exact: true })
    expect(formControls[0].querySelector('label')?.textContent).toEqual('Recipe name that contains')
    expect(formControls[1].querySelector('label')?.textContent).toEqual('Recipe category')
  })

  test('renders the search and clear buttons on the search page', () => {
    const { getByTestId } = render(<Search recipeCategories={recipeCategories} />)

    const submitButton = getByTestId('search-form-submit-button')
    const resetButton = getByTestId('search-form-reset-button')
    expect(submitButton).toBeVisible()
    expect(resetButton).toBeVisible()
  })

  test('the searchRecipes function is called with the form data (no recipe category selected)', async () => {
    mockSearchRecipesFn(2)

    render(<Search recipeCategories={recipeCategories} />)

    fireEvent.input(screen.getByLabelText(/Recipe name that contains/i), { target: { value: 'rice' } })
    fireEvent.submit(screen.getByTestId('search-form-submit-button', { exact: true }))

    await waitFor(() => {
      expect(searchEventHandlers.searchRecipes).toHaveBeenCalledWith('rice', [])
    })
  })

  test('the searchRecipes function is called with the form data (some recipe categories selected)', async () => {
    mockSearchRecipesFn(2)

    render(<Search recipeCategories={recipeCategories} />)

    fireEvent.input(screen.getByLabelText(/Recipe name that contains/i), { target: { value: 'rice' } })
    fireEvent.click(screen.getByTestId('picklist-toggler', { exact: true }))
    const picklistOptions = screen.getAllByTestId('checkbox-label', { exact: true })
    picklistOptions[0].click()
    picklistOptions[1].click()
    fireEvent.submit(screen.getByTestId('search-form-submit-button'))

    await waitFor(() => {
      expect(searchEventHandlers.searchRecipes).toHaveBeenCalledWith('rice', ['Item 1', 'Item 2'])
    })
  })

  test('the recipe header is showing the recipes count when searching for recipes', async () => {
    mockSearchRecipesFn(2)

    render(<Search recipeCategories={recipeCategories} />)

    fireEvent.input(screen.getByLabelText(/Recipe name that contains/i), { target: { value: 'rice' } })
    fireEvent.submit(screen.getByTestId('search-form-submit-button', { exact: true }))
    await waitFor(() => {
      expect(searchEventHandlers.searchRecipes).toHaveBeenCalled()
    })

    const recipeHeader = screen.getByTestId('recipe-header', { exact: true })
    expect(recipeHeader.textContent).toEqual('Showing 2 recipes of 2')
  })

  test('the searched recipes are displayed in search result when searching for recipes', async () => {
    mockSearchRecipesFn(2)

    render(<Search recipeCategories={recipeCategories} />)

    fireEvent.input(screen.getByLabelText(/Recipe name that contains/i), { target: { value: 'rice' } })
    fireEvent.submit(screen.getByTestId('search-form-submit-button', { exact: true }))
    await waitFor(() => {
      expect(searchEventHandlers.searchRecipes).toHaveBeenCalled()
    })

    const searchResult = screen.getByTestId('search-result', { exact: true })
    const recipeCards = searchResult.querySelectorAll("[data-testid='recipe-card']")
    expect(recipeCards.length).toEqual(2)

    const link1 = recipeCards[0].querySelector("[data-testid='recipe-card-link']")
    const link2 = recipeCards[1].querySelector("[data-testid='recipe-card-link']")

    expect(link1).toBeVisible()
    expect(link2).toBeVisible()

    expect(link1?.textContent).toEqual('rice dish 1')
    expect(link2?.textContent).toEqual('rice dish 2')
  })

  test('load more recipes button is not displayed when the search result is <= 10', async () => {
    mockSearchRecipesFn(10)

    render(<Search recipeCategories={recipeCategories} />)

    fireEvent.input(screen.getByLabelText(/Recipe name that contains/i), { target: { value: 'rice' } })
    fireEvent.submit(screen.getByTestId('search-form-submit-button', { exact: true }))
    await waitFor(() => {
      expect(searchEventHandlers.searchRecipes).toHaveBeenCalled()
    })

    const recipeFooter = screen.queryByTestId('recipe-footer', { exact: true })
    expect(recipeFooter).toBeNull()
  })

  test('load more recipes button is not displayed when the search result is > 10', async () => {
    mockSearchRecipesFn(11)

    render(<Search recipeCategories={recipeCategories} />)

    fireEvent.input(screen.getByLabelText(/Recipe name that contains/i), { target: { value: 'rice' } })
    fireEvent.submit(screen.getByTestId('search-form-submit-button', { exact: true }))
    await waitFor(() => {
      expect(searchEventHandlers.searchRecipes).toHaveBeenCalled()
    })

    const recipeFooter = screen.queryByTestId('recipe-footer', { exact: true })
    expect(recipeFooter).toBeVisible()
  })
})
