import { useContext, useEffect } from 'react'
import path from 'path'

import { Search } from '../../components'
import { RecipeCategory } from '../../types/recipe'
import { getFileContent } from '../../utils/server'
import { AppContext, NAVIGATION_MENU_STATES } from '../../context/context-provider'

interface SearchPageProps {
  recipeCategories: Array<{ id: string; name: string }>
}

function SearchPage(props: SearchPageProps) {
  const appContext = useContext(AppContext)

  useEffect(() => {
    if (appContext.navigationMenuState === NAVIGATION_MENU_STATES.OPEN) {
      appContext.setNavigationMenuState(NAVIGATION_MENU_STATES.CLOSED)
    }
  }, [])

  return <Search recipeCategories={props.recipeCategories} />
}

export async function getStaticProps() {
  const recipeCategories = await getFileContent<RecipeCategory[]>(
    path.join(process.cwd(), 'data', 'recipe-categories.json')
  )

  const categories = recipeCategories.map((recipeCategory) => ({ id: recipeCategory.id, name: recipeCategory.name }))

  return {
    props: {
      recipeCategories: categories
    }
  }
}

export default SearchPage
