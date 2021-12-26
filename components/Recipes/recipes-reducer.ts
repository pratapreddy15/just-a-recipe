import { RecipeDetail } from '../../types/recipe'

type RecipesState = { done: boolean; recipes: RecipeDetail[] }
type RecipesActionPayload = { done?: boolean; recipes?: RecipeDetail[] }
type RecipesAction = { type: RECIPES_ACTION_TYPES; payload: RecipesActionPayload }

export enum RECIPES_ACTION_TYPES {
  SET_STATE,
  SET_FLAG,
  SET_RECIPES
}

export const recipesReducer = function (state: RecipesState, action: RecipesAction): RecipesState {
  switch (action.type) {
    case RECIPES_ACTION_TYPES.SET_STATE:
      return {
        done: action.payload.done ? action.payload.done : false,
        recipes: action.payload.recipes ? action.payload.recipes : []
      }
    case RECIPES_ACTION_TYPES.SET_FLAG:
      return {
        done: action.payload.done ? action.payload.done : false,
        recipes: [...state.recipes]
      }
    case RECIPES_ACTION_TYPES.SET_RECIPES:
      return {
        done: state.done,
        recipes: action.payload.recipes ? action.payload.recipes : []
      }
    default:
      throw new Error('Invalid action type')
  }
}
