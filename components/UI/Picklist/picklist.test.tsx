import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Picklist from './picklist'

describe('Picklist', () => {
  const picklistOptions = [
    {
      id: '1',
      name: 'Item 1'
    },
    {
      id: '2',
      name: 'Item 2'
    }
  ]

  const onSelectOption = jest.fn().mockImplementation((value: string) => {
    // console.log('onSelectOption', value)
  })

  const onDeselectOption = jest.fn().mockImplementation((value: string) => {
    // console.log('onDeselectOption', value)
  })

  test('renders the options in the picklist', () => {
    const { getAllByTestId } = render(
      <div data-testid="wrapper">
        <Picklist
          noSelectedItemText="Picklist Test Item"
          options={picklistOptions.map((category, i) => ({ id: `option-${i}`, label: category.name }))}
          selectOptionHandler={onSelectOption}
          deselectOptionHandler={onDeselectOption}
        />
      </div>
    )

    const options = getAllByTestId('picklist-option')
    expect(options.length).toEqual(3)
  })

  test('expand or collapse the picklist when the picklist label (i.e. picklist toggler) is clicked', () => {
    const { getByTestId } = render(
      <div data-testid="wrapper">
        <Picklist
          noSelectedItemText="Picklist Test Item"
          options={picklistOptions.map((category, i) => ({ id: `option-${i}`, label: category.name }))}
          selectOptionHandler={onSelectOption}
          deselectOptionHandler={onDeselectOption}
        />
      </div>
    )

    expect(getByTestId('picklist').dataset.expanded).toEqual('false')
    const toggler = getByTestId('picklist-toggler')
    toggler.click()
    expect(getByTestId('picklist').dataset.expanded).toEqual('true')

    toggler.click()
    expect(getByTestId('picklist').dataset.expanded).toEqual('false')
  })

  test('option selection handler is called when selecting picklist option', () => {
    const { getByTestId, getAllByTestId } = render(
      <div data-testid="wrapper">
        <Picklist
          noSelectedItemText="Picklist Test Item"
          options={picklistOptions.map((opt) => ({ id: `option-${opt.id}`, label: opt.name }))}
          selectOptionHandler={onSelectOption}
          deselectOptionHandler={onDeselectOption}
        />
      </div>
    )

    const options = getAllByTestId('checkbox-label', { exact: true })
    options[0].click()
    expect(onSelectOption).toBeCalled()
  })

  test('option de-selection handler is called when selecting picklist option', () => {
    const { getByTestId, getAllByTestId } = render(
      <div data-testid="wrapper">
        <Picklist
          noSelectedItemText="Picklist Test Item"
          options={picklistOptions.map((opt) => ({ id: `option-${opt.id}`, label: opt.name }))}
          selectOptionHandler={onSelectOption}
          deselectOptionHandler={onDeselectOption}
        />
      </div>
    )

    const options = getAllByTestId('checkbox-label', { exact: true })
    options[0].click()
    options[0].click()
    expect(onDeselectOption).toBeCalled()
  })

  test('the selected options count is updated when selecting the picklist option', () => {
    const { getByTestId, getAllByTestId } = render(
      <div data-testid="wrapper">
        <Picklist
          noSelectedItemText="Picklist Test Item"
          options={picklistOptions.map((opt) => ({ id: `option-${opt.id}`, label: opt.name }))}
          selectOptionHandler={onSelectOption}
          deselectOptionHandler={onDeselectOption}
        />
      </div>
    )

    const options = getAllByTestId('checkbox-label', { exact: true })
    options[0].click()

    expect(getByTestId('picklist-selected-options-count').textContent).toEqual('1 Selected')
    options[1].click()
    expect(getByTestId('picklist-selected-options-count').textContent).toEqual('2 Selected')
  })

  test('the selected options count is updated when de-selecting the picklist option', () => {
    const { getByTestId, getAllByTestId } = render(
      <div data-testid="wrapper">
        <Picklist
          noSelectedItemText="Picklist Test Item"
          options={picklistOptions.map((opt) => ({ id: `option-${opt.id}`, label: opt.name }))}
          selectOptionHandler={onSelectOption}
          deselectOptionHandler={onDeselectOption}
        />
      </div>
    )

    const options = getAllByTestId('checkbox-label', { exact: true })
    options[0].click()
    expect(getByTestId('picklist-selected-options-count').textContent).toEqual('1 Selected')
    options[0].click()
    expect(getByTestId('picklist-selected-options-count').textContent).toEqual('Picklist Test Item')

    options[0].click()
    options[1].click()
    expect(getByTestId('picklist-selected-options-count').textContent).toEqual('2 Selected')
    options[1].click()
    expect(getByTestId('picklist-selected-options-count').textContent).toEqual('1 Selected')
  })
})
