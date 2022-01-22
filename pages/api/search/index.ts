import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

import { RecipeCategory, RecipeDetail } from '../../../types/recipe'
import { getFileContent } from '../../../utils/server'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { searchText, recipeCategories }: { searchText: string; recipeCategories: string[] } = JSON.parse(req.body)

    if (!searchText && recipeCategories.length === 0) {
      return res.status(400).json({
        message: 'Either search text or recipe categories must be provided'
      })
    }

    const allCategories = await getFileContent<RecipeCategory[]>(
      path.join(process.cwd(), 'data', 'recipe-categories.json')
    )
    const clientProvidedCategories = allCategories.filter((category) => recipeCategories.includes(category.name))

    const recipes = await getFileContent<RecipeDetail[]>(path.join(process.cwd(), 'data', 'recipes.json'))
    let filteredRecipes =
      recipeCategories.length === 0
        ? recipes
        : recipes.filter(
            (recipe) => clientProvidedCategories.findIndex((category) => category.id === recipe.categoryId) > -1
          )
    filteredRecipes = filteredRecipes.filter((recipe) => recipe.name.toLowerCase().includes(searchText.toLowerCase()))

    res.status(200).json({
      count: filteredRecipes.length,
      recipes: filteredRecipes
    })
  }
}
