import { GetStaticProps, GetStaticPaths, GetStaticPathsContext, GetStaticPropsContext } from 'next'
import path from 'path'

import { Recipes } from '../../components'
import { getFileContent } from '../../utils/utilities'
import { RecipeDetail, RecipeCategory } from '../../types/recipe'

function CategoryPage({ recipes }: { recipes: RecipeDetail[] }) {
  return <Recipes recipes={recipes} />
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  let recipesForGivenCategory: RecipeDetail[] = []
  const categoryId = context.params?.categoryId

  if (categoryId) {
    const recipes = await getFileContent<RecipeDetail[]>(path.join(process.cwd(), 'data', 'recipes.json'))
    recipesForGivenCategory = recipes.filter((rec) => rec.categoryId === categoryId)
  }

  return {
    props: {
      recipes: recipesForGivenCategory
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
