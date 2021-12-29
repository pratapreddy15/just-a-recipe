import { ChangeEvent, useReducer, useState } from 'react'

import { Checkbox } from '../..'
import { initialPicklistState, PICLIST_ACTION_TYPES, PicklistItemType, picklistReducer } from './picklist-reducer'
import { sort } from '../../../utils/client'
import classes from './picklist.module.css'

interface PicklistProps {
  options: Array<{ id: string; label: string }>
}

const sortPicklistItems = (items: PicklistItemType[]) => {
  const itemsBySelectionState = items.reduce(
    (acc, prev) => {
      if (prev.selected) {
        acc.selectedItems.push(prev)
      } else {
        acc.unselectedItems.push(prev)
      }
      return acc
    },
    { selectedItems: [] as PicklistItemType[], unselectedItems: [] as PicklistItemType[] }
  )

  const sortedSelectedItems = sort<PicklistItemType, 'label'>(itemsBySelectionState.selectedItems, 'label')
  const sortedUnselectedItems = sort<PicklistItemType, 'label'>(itemsBySelectionState.unselectedItems, 'label')
  const sortedItems = [...sortedSelectedItems, ...sortedUnselectedItems]
  return sortedItems
}

function Picklist(props: PicklistProps) {
  const [state, dispatch] = useReducer(picklistReducer, initialPicklistState(props.options))

  const togglePicklistItemsVisibility = () => {
    dispatch({
      type: PICLIST_ACTION_TYPES.SET_IS_PICKLIST_EXPANDED_FLAG,
      payload: { isPicklistExpanded: !state.isPicklistExpanded }
    })
  }

  const onSelectionChange = (id: string, isSelected: boolean) => {
    if (id) {
      const updatedItems = state.items
      const selectedItem = state.filteredItems.find((item) => item.id === id)
      const originalItem = updatedItems.find((item) => item.id === selectedItem?.id)
      if (selectedItem && originalItem) {
        selectedItem.selected = true
        originalItem.selected = isSelected
      }
      dispatch({
        type: PICLIST_ACTION_TYPES.SET_STATE,
        payload: {
          items: updatedItems,
          isPicklistExpanded: true,
          selectedItemsCount: isSelected ? ++state.selectedItemsCount : --state.selectedItemsCount
        }
      })
    }
  }

  const onFilterTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.value && e.target.value.trim()) {
      const filteredItems = state.items.filter((item) =>
        item.label.toLowerCase().includes(e.target.value.trim().toLowerCase())
      )
      dispatch({ type: PICLIST_ACTION_TYPES.SET_FILTERED_ITEMS, payload: { filteredItems: filteredItems } })
    } else {
      dispatch({ type: PICLIST_ACTION_TYPES.SET_FILTERED_ITEMS, payload: { filteredItems: state.items } })
    }
  }

  return (
    <div className={classes.picklist} data-expanded={state.isPicklistExpanded}>
      <div className={classes.selectedItem} onClick={togglePicklistItemsVisibility}>
        <div className={classes.selectedItemText}>{`${
          state.selectedItemsCount === 0 ? 'None Selected' : `${state.selectedItemsCount} Selected`
        }`}</div>
        <div className={classes.icon}>
          <img src="../../images/down-arrow.svg" alt="Expand or collapse picklist" />
        </div>
      </div>
      <ul className={classes.picklist__list}>
        <li className={classes['picklist__list--item']}>
          <input className={classes.filterInput} type="text" onChange={onFilterTextChange} />
        </li>
        {sortPicklistItems(state.filteredItems).map((option) => (
          <li key={option.id} className={classes['picklist__list--item']}>
            <Checkbox label={option.label} id={option.id} onToggle={onSelectionChange} isChecked={option.selected} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Picklist
