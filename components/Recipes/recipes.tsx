import { useReducer } from 'react'

import { Recipe, ImageLoader } from '../'
import { RECIPES_ACTION_TYPES, recipesReducer } from './recipes-reducer'
import { RecipeDetail } from '../../types/recipe'
import classes from './recipes.module.css'

interface RecipesProps {
  recipes: Array<{
    id: string
    categoryId: string
    name: string
    imageSource: string
    url: string
  }>
  totalRecipes: number
}

function Recipes(props: RecipesProps) {
  const [state, dispatch] = useReducer(recipesReducer, { recipes: props.recipes, done: false, isRecipesLoading: false })

  const loadMoreRecipes = () => {
    if (!state.done) {
      const cards = document.querySelectorAll('ul[data-recipes] li[data-recipe]')
      const lastCard = cards[cards.length - 1] as HTMLElement

      const recipeId = lastCard.dataset.recipeid
      const categoryId = lastCard.dataset.categoryid

      dispatch({ type: RECIPES_ACTION_TYPES.SET_RECIPES_LOADING_FLAG, payload: { isRecipesLoading: true } })
      fetch(`/api/categories/${categoryId}?lastRecipeId=${recipeId}`)
        .then((response) => response.json())
        .then((json) => {
          const result = json as { recipes: RecipeDetail[]; done: boolean }
          dispatch({
            type: RECIPES_ACTION_TYPES.SET_STATE,
            payload: {
              done: result.done,
              recipes: state.recipes.concat(result.recipes),
              isRecipesLoading: false
            }
          })
        })
        .catch((e) => console.error(e))
    } else {
      console.log('Loaded all the recipes!!!')
    }
  }

  return (
    <div className={classes.recipes}>
      <div className={classes.headerText}>
        <h4>{`Showing ${state.recipes.length} recipes of ${props.totalRecipes}`}</h4>
      </div>
      <ul data-recipes className={classes.list}>
        {state.recipes.map((rec) => (
          <Recipe
            key={rec.id}
            id={rec.id}
            categoryId={rec.categoryId}
            name={rec.name}
            imageSource={rec.imageSource}
            url={rec.url}
          />
        ))}
      </ul>
      {!state.done && (
        <div className={classes.recipesFooter}>
          <button className={classes.loadMoreButton} onClick={loadMoreRecipes} disabled={state.isRecipesLoading}>
            {state.isRecipesLoading ? 'Loading...' : 'Load More Recipes'}
          </button>
        </div>
      )}
    </div>
  )
}

export default Recipes
