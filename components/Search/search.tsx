import { FormEvent, useReducer, useRef } from 'react'

import { RecipeSearchResult, RecipeDetail } from '../../types/recipe'
import { Recipe, RecipeHeader, RecipeFooter, Picklist } from '..'
import { SEARCH_RECIPE_ACTION_TYPES, searchReducer } from './searchReducer'
import { RECIPE_CATEGORIES_TAGS } from '../../constants/recipe'
import classes from './search.module.css'

function Search() {
  const maxRecipesToDisplay = 10
  const [state, dispatch] = useReducer(searchReducer, {
    recipes: [],
    isRecipesLoading: false,
    lastDisplayedRecipeIndex: -1
  })

  const inputRef = useRef<HTMLInputElement>(null)

  const recipesToDisplay = state.recipes.slice(0, state.lastDisplayedRecipeIndex + maxRecipesToDisplay)

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const searchText = inputRef.current ? inputRef.current.value.trim() : null
    if (searchText) {
      fetch(`/api/search`, {
        method: 'POST',
        body: JSON.stringify({
          searchText: searchText
        })
      })
        .then((response) => response.json())
        .then((result) => {
          const searchResult = result as RecipeSearchResult
          dispatch({
            type: SEARCH_RECIPE_ACTION_TYPES.SET_STATE,
            payload: {
              recipes: searchResult.recipes,
              isRecipesLoading: false,
              lastDisplayedRecipeIndex: 0
            }
          })
        })
        .catch((err) => console.error(err))
    }
  }

  const loadMoreRecipes = () => {
    dispatch({
      type: SEARCH_RECIPE_ACTION_TYPES.SET_LAST_RECIPE_INDEX,
      payload: {
        isRecipesLoading: false,
        lastDisplayedRecipeIndex: recipesToDisplay.length
      }
    })
  }

  return (
    <div className={classes.search}>
      <form className={classes.form} onSubmit={formSubmitHandler}>
        <div className={classes.formControl}>
          <label className={classes.formLabel} htmlFor="keywordInput">
            Recipe name that contains
          </label>
          <input id="keywordInput" className={classes.searchInput} type="text" ref={inputRef} />
        </div>
        <div className={classes.formControl}>
          <label className={classes.formLabel} htmlFor="categoryTags">
            Recipe category tags
          </label>
          <Picklist options={RECIPE_CATEGORIES_TAGS.map((tag, i) => ({ id: `option-${i}`, label: tag }))} />
        </div>
        <div className={classes.formActions}>
          <button className={classes.formButton} type="submit">
            Search
          </button>
          <button className={classes.formButton} type="reset">
            Clear
          </button>
        </div>
      </form>
      <div className={classes.searchResults}>
        {state.lastDisplayedRecipeIndex > -1 && state.recipes.length > 0 && (
          <>
            <RecipeHeader totalRecipesDisplayed={recipesToDisplay.length} totalRecipes={state.recipes.length} />
            <ul data-recipes className={classes.list}>
              {recipesToDisplay.map((rec: RecipeDetail) => (
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
            {state.lastDisplayedRecipeIndex < state.recipes.length - 1 && (
              <RecipeFooter isRecipesLoading={state.isRecipesLoading} loadRecipesHandler={loadMoreRecipes} />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Search
