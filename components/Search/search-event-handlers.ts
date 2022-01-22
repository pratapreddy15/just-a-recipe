import { RecipeSearchResult } from '../../types/recipe'

export const searchRecipes = async (searchText: string, selectedCategories: string[]): Promise<RecipeSearchResult> => {
  if (searchText || selectedCategories.length > 0) {
    const apiResponse = await fetch(`/api/search`, {
      method: 'POST',
      body: JSON.stringify({
        searchText: searchText,
        recipeCategories: selectedCategories
      })
    })

    const searchResult = await apiResponse.json()
    const searchedRecipes = searchResult as RecipeSearchResult

    return searchedRecipes
  } else {
    throw new Error('Invalid filter. Either search text or recipe category must be provided.')
  }
}
