import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import APIStatusBar from './api-status-bar'

describe('APIStatusBar', () => {
  test('displays the status message', () => {
    const { getByTestId } = render(<APIStatusBar closeHandler={() => {}} message="Message test" status="SUCCESS" />)
    const apiStatusMessage = getByTestId('api-status-message')
    expect(apiStatusMessage.textContent).toEqual('Message test')
  })

  test("adds the 'success' css class to api status bar when status is success", () => {
    const { getByTestId } = render(<APIStatusBar closeHandler={() => {}} message="Message test" status="SUCCESS" />)
    const apiStatusBar = getByTestId('api-status-bar')
    expect(apiStatusBar.classList.contains('success')).toBeTruthy()
  })

  test("adds the 'error' css class to api status bar when status is error", () => {
    const { getByTestId } = render(<APIStatusBar closeHandler={() => {}} message="Message test" status="ERROR" />)
    const apiStatusBar = getByTestId('api-status-bar')
    expect(apiStatusBar.classList.contains('error')).toBeTruthy()
  })

  test('calls the close handler when the close button on the api status bar is clicked', () => {
    const closeAPIStatusBarCloseFn = jest.fn().mockImplementation(() => {})

    const { getByTestId } = render(
      <APIStatusBar closeHandler={closeAPIStatusBarCloseFn} message="Message test" status="ERROR" />
    )
    const closeAPIStatusBarButton = getByTestId('api-status-close')
    closeAPIStatusBarButton.click()
    expect(closeAPIStatusBarCloseFn).toHaveBeenCalled()
  })
})
