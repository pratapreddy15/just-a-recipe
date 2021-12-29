import { FormEvent, useReducer, useRef } from 'react'

import { RecipeSearchResult, RecipeDetail, RecipeCategory } from '../../types/recipe'
import { Recipe, RecipeHeader, RecipeFooter, Picklist, APIStatusBar } from '..'
import { SEARCH_RECIPE_ACTION_TYPES, searchReducer } from './searchReducer'
import { RECIPE_CATEGORIES_TAGS } from '../../constants/recipe'
import classes from './search.module.css'

function Search({ recipeCategories }: { recipeCategories: Array<{ id: string; name: string }> }) {
  const maxRecipesToDisplay = 10
  const selectedOptions: string[] = []
  const [state, dispatch] = useReducer(searchReducer, {
    recipes: [],
    isRecipesLoading: false,
    lastDisplayedRecipeIndex: -1,
    hasError: false,
    errorMessage: ''
  })

  const inputRef = useRef<HTMLInputElement>(null)
  const onSelectOption = (value: string) => {
    if (!selectedOptions.includes(value)) selectedOptions.push(value)
  }

  const onDeselectOption = (value: string) => {
    const indexOfSelectedOption = selectedOptions.findIndex((option) => option === value)
    if (indexOfSelectedOption > -1) {
      selectedOptions.splice(indexOfSelectedOption, 1)
    }
  }

  const recipesToDisplay = state.recipes.slice(0, state.lastDisplayedRecipeIndex + maxRecipesToDisplay)

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const searchText = inputRef.current ? inputRef.current.value.trim() : null
    if (searchText || selectedOptions.length > 0) {
      fetch(`/api/search`, {
        method: 'POST',
        body: JSON.stringify({
          searchText: searchText,
          recipeCategories: selectedOptions
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
    } else {
      dispatch({
        type: SEARCH_RECIPE_ACTION_TYPES.SET_ERROR,
        payload: { errorMessage: 'Invalid filter. Either search text or recipe category must be provided.' }
      })
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
      {state.hasError && state.errorMessage && (
        <APIStatusBar
          status="ERROR"
          message={state.errorMessage}
          closeHandler={() => {
            dispatch({ type: SEARCH_RECIPE_ACTION_TYPES.CLEAR_ERROR, payload: {} })
          }}
        />
      )}
      <form className={classes.form} onSubmit={formSubmitHandler}>
        <div className={classes.formControl}>
          <label className={classes.formLabel} htmlFor="keywordInput">
            Recipe name that contains
          </label>
          <input id="keywordInput" className={classes.searchInput} type="text" ref={inputRef} />
        </div>
        <div className={classes.formControl}>
          <label className={classes.formLabel}>Recipe category</label>
          <Picklist
            noSelectedItemText="Any recipe category"
            options={recipeCategories.map((category, i) => ({ id: `option-${i}`, label: category.name }))}
            selectOptionHandler={onSelectOption}
            deselectOptionHandler={onDeselectOption}
          />
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
