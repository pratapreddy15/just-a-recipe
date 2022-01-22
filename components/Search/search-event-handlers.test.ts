import { searchRecipes } from './search-event-handlers'
import { enableFetchMocks, disableFetchMocks } from 'jest-fetch-mock'

describe('searchRecipes', () => {
  beforeEach(() => {
    enableFetchMocks()
  })

  afterEach(() => {
    disableFetchMocks()
  })

  const mockFetchAPI = () => {
    fetchMock.mockResponse(JSON.stringify({ count: 2, recipes: ['recipe 1', 'recipe 2'] }))
  }

  test('error is thrown when either search text is empty or recipe categories is empty array', async () => {
    try {
      await searchRecipes('', [])
    } catch (err: any) {
      expect(err.message).toEqual('Invalid filter. Either search text or recipe category must be provided.')
    }
  })

  test('search result are returned when search text is empty but recipe categories are provided', async () => {
    mockFetchAPI()
    const searchResult = await searchRecipes('', ['category filter'])
    expect(searchResult).toEqual({ count: 2, recipes: ['recipe 1', 'recipe 2'] })
  })

  test('search result are returned when search text is provided but recipe categories are empty', async () => {
    mockFetchAPI()
    const searchResult = await searchRecipes('search text', [])
    expect(searchResult).toEqual({ count: 2, recipes: ['recipe 1', 'recipe 2'] })
  })

  test('search result are returned when search text and recipe categories filters are provided', async () => {
    mockFetchAPI()
    const searchResult = await searchRecipes('filter text', ['category filter'])
    expect(searchResult).toEqual({ count: 2, recipes: ['recipe 1', 'recipe 2'] })
  })
})
