import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { enableFetchMocks, disableFetchMocks } from 'jest-fetch-mock'

import Recipes from './recipes'
import { RecipeDetail } from '../../types/recipe'

describe('Recipes', () => {
  const getRecipesMockData = (count: number, startIndex: number = 0) => {
    const max = startIndex + count
    const recipesMock = []
    for (let i = startIndex; i < max; i++) {
      recipesMock.push({
        id: (i + 1).toString(),
        categoryId: 'rice',
        name: `rice dish ${(i + 1).toString()}`,
        url: 'https://some-url',
        imageSource: 'https://some-image-url.net'
      })
    }
    return recipesMock
  }

  beforeEach(() => {
    enableFetchMocks()
    render(<Recipes totalRecipes={2} recipes={getRecipesMockData(2)} />)
  })

  afterEach(() => {
    disableFetchMocks()
  })

  const mockFetchAPI = (responseMock: { recipes: RecipeDetail[]; done: boolean }) => {
    fetchMock.mockResponse(JSON.stringify({ done: responseMock.done, recipes: responseMock.recipes }))
  }

  test('renders the recipe header', () => {
    const recipeHeader = screen.getByTestId('recipe-header', { exact: true })
    expect(recipeHeader).toBeVisible()
    expect(recipeHeader.textContent).toEqual('Showing 2 recipes of 2')
  })

  test('renders the recipe footer', () => {
    const recipeFooter = screen.getByTestId('recipe-footer', { exact: true })
    expect(recipeFooter).toBeVisible()
  })

  test('renders the recipe cards for the recipes in the props', () => {
    const recipeCards = screen.getAllByTestId('recipe-card', { exact: true })
    expect(recipeCards.length).toEqual(2)

    const link1 = recipeCards[0].querySelector("[data-testid='recipe-card-link']")
    const link2 = recipeCards[1].querySelector("[data-testid='recipe-card-link']")

    expect(link1?.textContent).toEqual('rice dish 1')
    expect(link2?.textContent).toEqual('rice dish 2')
  })

  test('fetch and load more recipes when load more recipes button is clicked', async () => {
    const loadedRecipesMock = getRecipesMockData(5, 2)
    mockFetchAPI({ recipes: loadedRecipesMock, done: false })
    const loadMoreButton = screen.getByTestId('load-more-button', { exact: true })
    fireEvent.click(loadMoreButton)

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled()
    })

    const recipeCards = screen.getAllByTestId('recipe-card', { exact: true })
    expect(recipeCards.length).toEqual(7)

    for (let i = 0; i < recipeCards.length; i++) {
      const link = recipeCards[i].querySelector("[data-testid='recipe-card-link']")
      expect(link?.textContent).toEqual(`rice dish ${i + 1}`)
    }
  })

  test('load more recipes button is displayed when the done is false in api response', async () => {
    const loadedRecipesMock = getRecipesMockData(5, 2)
    mockFetchAPI({ recipes: loadedRecipesMock, done: false })
    const loadMoreButton = screen.getByTestId('load-more-button', { exact: true })
    fireEvent.click(loadMoreButton)

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled()
    })

    const recipeFooter = screen.queryByTestId('recipe-footer')
    expect(recipeFooter).toBeVisible()
  })

  test('load more recipes button is displayed when the done is true in api response', async () => {
    const loadedRecipesMock = getRecipesMockData(5, 2)
    mockFetchAPI({ recipes: loadedRecipesMock, done: true })
    const loadMoreButton = screen.getByTestId('load-more-button', { exact: true })
    fireEvent.click(loadMoreButton)

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled()
    })

    const recipeFooter = screen.queryByTestId('recipe-footer')
    expect(recipeFooter).toBeNull()
  })
})
