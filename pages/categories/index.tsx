import React, { useContext, useEffect } from 'react'
import path from 'path'

import { RecipeCategories } from '../../components'
import { RecipeCategory, RecipeCategoryWithCount, RecipeDetail, RecipeCategoryGallery } from '../../types/recipe'
import { AppContext, NAVIGATION_MENU_STATES } from '../../context/context-provider'
import { getFileContent } from '../../utils/server'

interface CategoriesPageProps {
  recipeCategories: RecipeCategoryWithCount[]
}

const CategoriesPage = (props: CategoriesPageProps) => {
  const appContext = useContext(AppContext)
  const { recipeCategories } = props

  useEffect(() => {
    if (appContext.navigationMenuState === NAVIGATION_MENU_STATES.OPEN) {
      appContext.setNavigationMenuState(NAVIGATION_MENU_STATES.CLOSED)
    }
  }, [])

  const categoriesGallery: RecipeCategoryGallery[] = recipeCategories.map((category) => {
    return {
      id: category.id,
      name: category.name,
      recipesCount: category.recipesCount,
      galleryPhotos: [
        {
          imageSource: category.imageSource,
          imageTitle: category.name
        }
      ]
    }
  })

  return (
    <div>
      <RecipeCategories categoriesGallery={categoriesGallery} addBrowseAllCategoriesLink={false} />
    </div>
  )
}

export async function getStaticProps() {
  const recipes = await getFileContent<RecipeDetail[]>(path.join(process.cwd(), 'data', 'recipes.json'))
  const recipeCategories = await getFileContent<RecipeCategory[]>(
    path.join(process.cwd(), 'data', 'recipe-categories.json')
  )

  const recipeCategoriesWithCount: RecipeCategoryWithCount[] = recipeCategories.map((category) => {
    const recipesCount = recipes.filter((rec) => rec.categoryId === category.id).length
    return {
      ...category,
      recipesCount: recipesCount
    }
  })

  return {
    props: {
      recipeCategories: recipeCategoriesWithCount
    }
  }
}

export default CategoriesPage
