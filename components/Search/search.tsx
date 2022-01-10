import { FormEvent, useReducer, useRef } from 'react'

import { RecipeSearchResult, RecipeDetail, RecipeCategory } from '../../types/recipe'
import { Recipe, RecipeHeader, RecipeFooter, Picklist, APIStatusBar } from '..'
import { SEARCH_RECIPE_ACTION_TYPES, searchReducer } from './searchReducer'
import { RECIPE_CATEGORIES_TAGS } from '../../constants/recipe'
import { searchRecipes } from './search-event-handlers'
import classes from './search.module.css'

function Search({ recipeCategories }: { recipeCategories: Array<{ id: string; name: string }> }) {
  const maxRecipesToDisplay = 10
  const [state, dispatch] = useReducer(searchReducer, {
    recipes: [],
    isRecipesLoading: false,
    lastDisplayedRecipeIndex: -1,
    selectedOptions: [],
    hasError: false,
    errorMessage: ''
  })

  const inputRef = useRef<HTMLInputElement>(null)
  const onSelectOption = (value: string) => {
    const selectedOptions = state.selectedOptions
    if (!selectedOptions.includes(value)) {
      selectedOptions.push(value)
      dispatch({ type: SEARCH_RECIPE_ACTION_TYPES.SET_SELECTED_OPTIONS, payload: { selectedOptions: selectedOptions } })
    }
  }

  const onDeselectOption = (value: string) => {
    const selectedOptions = state.selectedOptions
    const indexOfSelectedOption = selectedOptions.findIndex((option) => option === value)
    if (indexOfSelectedOption > -1) {
      selectedOptions.splice(indexOfSelectedOption, 1)
      dispatch({ type: SEARCH_RECIPE_ACTION_TYPES.SET_SELECTED_OPTIONS, payload: { selectedOptions: selectedOptions } })
    }
  }

  const recipesToDisplay = state.recipes.slice(0, state.lastDisplayedRecipeIndex + maxRecipesToDisplay)

  const submitFormData = async (searchText: string, selectedCategories: string[]) => {
    try {
      const searchedRecipes = await searchRecipes(searchText, selectedCategories)
      dispatch({
        type: SEARCH_RECIPE_ACTION_TYPES.SET_STATE,
        payload: {
          recipes: searchedRecipes.recipes,
          isRecipesLoading: false,
          lastDisplayedRecipeIndex: 0
        }
      })
    } catch (error: any) {
      dispatch({
        type: SEARCH_RECIPE_ACTION_TYPES.SET_ERROR,
        payload: { errorMessage: error.message }
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
    <div data-testid="search" className={classes.search}>
      {state.hasError && state.errorMessage && (
        <APIStatusBar
          status="ERROR"
          message={state.errorMessage}
          closeHandler={() => {
            dispatch({ type: SEARCH_RECIPE_ACTION_TYPES.CLEAR_ERROR, payload: {} })
          }}
        />
      )}
      <form
        data-testid="search-form"
        className={classes.form}
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault()
          const searchText = inputRef.current ? inputRef.current.value.trim() : ''
          submitFormData(searchText, state.selectedOptions)
        }}
      >
        <div data-testid="search-form-control" className={classes.formControl}>
          <label className={classes.formLabel} htmlFor="keywordInput">
            Recipe name that contains
          </label>
          <input id="keywordInput" className={classes.searchInput} type="text" ref={inputRef} />
        </div>
        <div data-testid="search-form-control" className={classes.formControl}>
          <label className={classes.formLabel}>Recipe category</label>
          <Picklist
            noSelectedItemText="Any recipe category"
            options={recipeCategories.map((category) => ({ id: `option-${category.id}`, label: category.name }))}
            selectOptionHandler={onSelectOption}
            deselectOptionHandler={onDeselectOption}
          />
        </div>
        <div data-testid="search-footer" className={classes.formActions}>
          <button data-testid="search-form-submit-button" className={classes.formButton} type="submit">
            Search
          </button>
          <button data-testid="search-form-reset-button" className={classes.formButton} type="reset">
            Clear
          </button>
        </div>
      </form>
      <div data-testid="search-result" className={classes.searchResults}>
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
            {state.recipes.length > maxRecipesToDisplay &&
              state.lastDisplayedRecipeIndex < state.recipes.length - 1 && (
                <RecipeFooter isRecipesLoading={state.isRecipesLoading} loadRecipesHandler={loadMoreRecipes} />
              )}
          </>
        )}
      </div>
    </div>
  )
}

export default Search
