import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

import { RecipeDetail } from '../../../types/recipe'
import { getFileContent } from '../../../utils/server'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { searchText }: { searchText: string } = JSON.parse(req.body)

    const recipes = await getFileContent<RecipeDetail[]>(path.join(process.cwd(), 'data', 'recipes.json'))
    const filteredRecipes = recipes.filter((rec) => rec.name.toLowerCase().includes(searchText.toLowerCase()))

    res.status(200).json({
      count: filteredRecipes.length,
      recipes: filteredRecipes
    })
  }
}
