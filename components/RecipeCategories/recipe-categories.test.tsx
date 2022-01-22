import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import RecipeCategories from './recipe-categories'
import { RecipeCategoryGallery } from '../../types/recipe'

describe('RecipeCategories', () => {
  const recipeCategoryGalleryMock: RecipeCategoryGallery = {
    id: '1',
    name: 'rice dish 1',
    recipesCount: 10,
    galleryPhotos: [
      {
        imageTitle: 'Photo 1',
        imageSource: 'http://some-image.net'
      },
      {
        imageTitle: 'Photo 2',
        imageSource: 'http://some-image.net'
      }
    ]
  }

  const getRecipeCategoryGalleryMock = (count: number) => {
    const mockData = []
    for (let i = 0; i < count; i++) {
      mockData.push({
        id: (i + 1).toString(),
        name: `rice dish ${(i + 1).toString()}`,
        recipesCount: 10,
        galleryPhotos: [
          {
            imageTitle: 'Photo 1',
            imageSource: 'http://some-image.net'
          },
          {
            imageTitle: 'Photo 2',
            imageSource: 'http://some-image.net'
          }
        ]
      })
    }
    return mockData
  }

  const mockRouterPathname = (pathname: string) => {
    jest.spyOn(require('next/router'), 'useRouter').mockImplementationOnce(() => ({
      pathname: pathname
    }))
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders the recipe categories based on the props provided', () => {
    mockRouterPathname('/does-not-matter')
    render(<RecipeCategories addBrowseAllCategoriesLink={false} categoriesGallery={getRecipeCategoryGalleryMock(2)} />)
    const recipeCategories = screen.getByTestId('recipe-categories', { exact: true })
    expect(recipeCategories).toBeVisible()

    const header = screen.getByTestId('recipe-categories-header', { exact: true })
    expect(header).toBeVisible()

    const list = screen.getByTestId('recipe-categories-list', { exact: true })
    expect(list).toBeVisible()

    const listItems = screen.getAllByTestId('recipe-categories-list-item', { exact: true })
    expect(listItems.length).toEqual(2)
  })

  test('header has categories count when it is not home page', () => {
    mockRouterPathname('/does-not-matter')
    render(<RecipeCategories addBrowseAllCategoriesLink={false} categoriesGallery={getRecipeCategoryGalleryMock(2)} />)

    const header = screen.getByTestId('recipe-categories-header', { exact: true })
    expect(header.textContent).toEqual('2 Recipe Categories')
  })

  test('header does not has categories count when it is home page', () => {
    mockRouterPathname('/')
    render(<RecipeCategories addBrowseAllCategoriesLink={false} categoriesGallery={getRecipeCategoryGalleryMock(2)} />)

    const header = screen.getByTestId('recipe-categories-header', { exact: true })
    expect(header.textContent).toEqual('Recipe Categories')
  })

  test('browse all categories link is displayed based on props', () => {
    mockRouterPathname('/does-not-matter')
    render(<RecipeCategories addBrowseAllCategoriesLink={true} categoriesGallery={getRecipeCategoryGalleryMock(2)} />)

    const browseAllCategoriesLink = screen.getByTestId('browse-categories-link', { exact: true })
    expect(browseAllCategoriesLink.textContent).toEqual('Browse all categories →')
  })
})
