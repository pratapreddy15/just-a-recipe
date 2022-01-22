import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

import { RecipeDetail } from '../../../types/recipe'
import { getFileContent } from '../../../utils/server'

type ErrorDetail = {
  errorCode: number
  errorMessage: string
}

type ApiResponse = {
  recipes: RecipeDetail[]
  totalRecipes: number
  done: boolean
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse | ErrorDetail>) {
  if (req.method === 'GET') {
    try {
      const maxRecipesCount = 11
      let isDone = false
      const categoryId = req.query.categoryId
      const lastRecipeId = req.query.lastRecipeId
      const recipes = await getFileContent<RecipeDetail[]>(path.join(process.cwd(), 'data', 'recipes.json'))
      const recipesForCategory = recipes.filter((rec) => rec.categoryId === categoryId.toString())

      const totalRecipes = recipesForCategory.length

      const top10Recipes: RecipeDetail[] = []
      if (!lastRecipeId) {
        top10Recipes.push(...recipesForCategory.slice(0, maxRecipesCount))
      } else {
        const startingIndex = recipesForCategory.findIndex((rec) => rec.id === lastRecipeId)
        const endingIndex = startingIndex + maxRecipesCount
        if (recipesForCategory.length <= endingIndex - 1) {
          isDone = true
          top10Recipes.push(...recipesForCategory.slice(startingIndex + 1, recipesForCategory.length - 1))
        } else {
          // We do not want to just use startingIndex because that is the index of the last recipe
          top10Recipes.push(...recipesForCategory.slice(startingIndex + 1, endingIndex))
        }
      }

      res.status(200).json({ recipes: top10Recipes, totalRecipes: totalRecipes, done: isDone })
    } catch {
      res.status(400).json({ errorCode: 400, errorMessage: 'Invalid request' })
    }
  }
}
