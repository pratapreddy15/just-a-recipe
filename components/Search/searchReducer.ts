import { RecipeDetail } from '../../types/recipe'

type SearchStateType = {
  recipes: RecipeDetail[]
  isRecipesLoading: boolean
  lastDisplayedRecipeIndex: number
}

type SearchActionPayload = {
  recipes?: RecipeDetail[]
  isRecipesLoading?: boolean
  lastDisplayedRecipeIndex?: number
}

type SearchReducerAction = {
  type: SEARCH_RECIPE_ACTION_TYPES
  payload: SearchActionPayload
}

export enum SEARCH_RECIPE_ACTION_TYPES {
  SET_STATE,
  SET_RECIPES,
  SET_IS_RECIPES_LOADING,
  SET_LAST_RECIPE_INDEX
}

export const searchReducer = (state: SearchStateType, action: SearchReducerAction): SearchStateType => {
  switch (action.type) {
    case SEARCH_RECIPE_ACTION_TYPES.SET_STATE: {
      let index = -1
      if (
        (action.payload.lastDisplayedRecipeIndex || action.payload.lastDisplayedRecipeIndex === 0) &&
        action.payload.lastDisplayedRecipeIndex > -1
      ) {
        index = action.payload.lastDisplayedRecipeIndex
      }
      return {
        ...state,
        recipes: action.payload.recipes || [],
        isRecipesLoading: action.payload.isRecipesLoading || false,
        lastDisplayedRecipeIndex: index
      }
    }
    case SEARCH_RECIPE_ACTION_TYPES.SET_RECIPES:
      return {
        ...state,
        recipes: action.payload.recipes || []
      }
    case SEARCH_RECIPE_ACTION_TYPES.SET_IS_RECIPES_LOADING:
      return {
        ...state,
        isRecipesLoading: action.payload.isRecipesLoading || false
      }
    case SEARCH_RECIPE_ACTION_TYPES.SET_LAST_RECIPE_INDEX:
      return {
        ...state,
        lastDisplayedRecipeIndex: action.payload.lastDisplayedRecipeIndex || -1
      }
    default:
      return {
        ...state
      }
  }
}
