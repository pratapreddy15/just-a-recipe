import { GetStaticProps, GetStaticPaths, GetStaticPathsContext, GetStaticPropsContext } from 'next'
import path from 'path'

import { Recipes } from '../../components'
import { getFileContent } from '../../utils/server'
import { RecipeDetail, RecipeCategory } from '../../types/recipe'

function CategoryPage({ recipes, totalRecipes }: { recipes: RecipeDetail[]; totalRecipes: number }) {
  return <Recipes recipes={recipes} totalRecipes={totalRecipes} />
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  let recipesForGivenCategory: RecipeDetail[] = []
  const categoryId = context.params?.categoryId

  let recipesCount = 0

  if (categoryId) {
    const recipes = await getFileContent<RecipeDetail[]>(path.join(process.cwd(), 'data', 'recipes.json'))
    // TODO - remove slice
    recipesForGivenCategory = recipes.filter((rec) => rec.categoryId === categoryId)
    recipesCount = recipesForGivenCategory.length
  }

  return {
    props: {
      recipes: recipesForGivenCategory.slice(0, 10),
      totalRecipes: recipesCount
    }
  }
}

export const getStaticPaths: GetStaticPaths = async (context: GetStaticPathsContext) => {
  const recipeCategories = await getFileContent<RecipeCategory[]>(
    path.join(process.cwd(), 'data', 'recipe-categories.json')
  )
  const featuredCategories = recipeCategories.filter((category) => category.isFeatured)

  const params = featuredCategories.map((category) => ({ params: { categoryId: category.id } }))

  return {
    paths: params,
    fallback: 'blocking'
  }
}

export default CategoryPage
