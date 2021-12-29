import { sort } from '../../../utils/client'

export type PicklistItemType = {
  id: string
  label: string
  selected: boolean
}

export enum PICLIST_ACTION_TYPES {
  INITIALIZE,
  SET_STATE,
  SET_FILTERED_ITEMS,
  SET_SELECTED_ITEMS_COUNT,
  SET_IS_PICKLIST_EXPANDED_FLAG
}

export type PicklistStateType = {
  items: PicklistItemType[]
  filteredItems: PicklistItemType[]
  selectedItemsCount: number
  isPicklistExpanded: boolean
}

type PicklistActionPayloadType = {
  items?: PicklistItemType[]
  filteredItems?: PicklistItemType[]
  selectedItemsCount?: number
  isPicklistExpanded?: boolean
}

type PicklistActionType = {
  type: PICLIST_ACTION_TYPES
  payload: PicklistActionPayloadType
}

export const initialPicklistState = (items: Array<{ id: string; label: string }>): PicklistStateType => {
  const sortedItems = sort<{ id: string; label: string }, 'label'>(items, 'label')
  const picklistItems = sortedItems.map((item) => ({ ...item, selected: false }))
  return {
    items: picklistItems,
    filteredItems: picklistItems,
    selectedItemsCount: 0,
    isPicklistExpanded: false
  }
}

export const picklistReducer = (state: PicklistStateType, action: PicklistActionType): PicklistStateType => {
  switch (action.type) {
    case PICLIST_ACTION_TYPES.INITIALIZE:
      return {
        ...state,
        items: action.payload.items || [],
        filteredItems: action.payload.items || [],
        selectedItemsCount: 0,
        isPicklistExpanded: false
      }
    case PICLIST_ACTION_TYPES.SET_STATE:
      return {
        items: action.payload.items || state.items,
        filteredItems: action.payload.filteredItems || state.filteredItems,
        selectedItemsCount:
          action.payload.selectedItemsCount === undefined
            ? state.selectedItemsCount
            : action.payload.selectedItemsCount,
        isPicklistExpanded:
          action.payload.isPicklistExpanded === undefined ? state.isPicklistExpanded : action.payload.isPicklistExpanded
      }
    case PICLIST_ACTION_TYPES.SET_FILTERED_ITEMS:
      return {
        ...state,
        filteredItems: action.payload.filteredItems || []
      }
    case PICLIST_ACTION_TYPES.SET_SELECTED_ITEMS_COUNT:
      return {
        ...state,
        selectedItemsCount: action.payload.selectedItemsCount === undefined ? 0 : action.payload.selectedItemsCount
      }
    case PICLIST_ACTION_TYPES.SET_IS_PICKLIST_EXPANDED_FLAG:
      return {
        ...state,
        isPicklistExpanded: action.payload.isPicklistExpanded === undefined ? false : action.payload.isPicklistExpanded
      }
    default:
      throw new Error(`Invalid action type: ${action.type}`)
  }
}
