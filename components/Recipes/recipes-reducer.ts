import { RecipeDetail } from '../../types/recipe'

type RecipesState = { done: boolean; isRecipesLoading: boolean; recipes: RecipeDetail[] }
type RecipesActionPayload = { done?: boolean; isRecipesLoading?: boolean; recipes?: RecipeDetail[] }
type RecipesAction = { type: RECIPES_ACTION_TYPES; payload: RecipesActionPayload }

export enum RECIPES_ACTION_TYPES {
  SET_STATE,
  SET_FLAG,
  SET_RECIPES,
  SET_RECIPES_LOADING_FLAG
}

export const recipesReducer = function (state: RecipesState, action: RecipesAction): RecipesState {
  switch (action.type) {
    case RECIPES_ACTION_TYPES.SET_STATE:
      return {
        done: action.payload.done ? action.payload.done : false,
        recipes: action.payload.recipes ? action.payload.recipes : [],
        isRecipesLoading: action.payload.isRecipesLoading || false
      }
    case RECIPES_ACTION_TYPES.SET_FLAG:
      return {
        done: action.payload.done ? action.payload.done : false,
        recipes: [...state.recipes],
        isRecipesLoading: state.isRecipesLoading
      }
    case RECIPES_ACTION_TYPES.SET_RECIPES:
      return {
        done: state.done,
        recipes: action.payload.recipes ? action.payload.recipes : [],
        isRecipesLoading: state.isRecipesLoading
      }
    case RECIPES_ACTION_TYPES.SET_RECIPES_LOADING_FLAG:
      return {
        ...state,
        isRecipesLoading: action.payload.isRecipesLoading || false
      }
    default:
      throw new Error('Invalid action type')
  }
}
