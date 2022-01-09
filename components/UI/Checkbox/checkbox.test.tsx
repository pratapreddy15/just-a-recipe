import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Checkbox from './checkbox'

describe('Checkbox', () => {
  test('the checkbox is rendered', () => {
    render(
      <div data-testid="wrapper">
        <Checkbox id="test" label="Checkbox Test" isChecked={false} onToggle={() => console.log('Hey hey')} />
      </div>
    )

    expect(screen.getByTestId('wrapper')).toBeVisible()
    expect(screen.getByTestId('checkbox-test')).toBeVisible()
    expect(screen.getByTestId('checkbox-label')).toBeVisible()
    expect(screen.getByTestId('wrapper').querySelector('.square')).toBeVisible()
    expect(screen.getByTestId('wrapper').querySelector('.square .innerSquare')).toBeVisible()
  })

  test('the label for the checkbox is displayed as per the props passed', () => {
    render(
      <div data-testid="wrapper">
        <Checkbox id="test" label="Checkbox Test" isChecked={false} onToggle={() => console.log('Hey hey')} />
      </div>
    )

    const label = screen.getByTestId('checkbox-label')
    expect(label).toBeVisible()
    expect(label.textContent).toEqual('Checkbox Test')
  })

  test('the change event of the native checkbox is called when checkbox label is called', () => {
    const checkoxToggleFn = jest.fn()
    render(
      <div data-testid="wrapper">
        <Checkbox id="test" label="Checkbox Test" isChecked={false} onToggle={checkoxToggleFn} />
      </div>
    )

    screen.getByTestId('checkbox-label').click()
    expect(checkoxToggleFn).toBeCalled()
  })
})
