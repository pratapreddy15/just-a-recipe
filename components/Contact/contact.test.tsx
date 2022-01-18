import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { enableFetchMocks, disableFetchMocks } from 'jest-fetch-mock'

import Contact from './contact'

describe('Contact', () => {
  beforeEach(() => {
    enableFetchMocks()
  })

  afterEach(() => {
    disableFetchMocks()
    jest.clearAllMocks()
  })

  test('renders the form controls', () => {
    render(<Contact />)
    const contact = screen.getByTestId('contact', { exact: true })
    expect(contact).toBeVisible()

    const contactHeader = screen.getByTestId('contact-header', { exact: true })
    expect(contactHeader).toBeVisible()

    const contactForm = screen.getByTestId('contact-form', { exact: true })
    expect(contactForm).toBeVisible()

    const contactFormControls = screen.getAllByTestId('contact-form-control', { exact: true })
    expect(contactFormControls.length).toEqual(3)
    contactFormControls.forEach((control) => expect(control).toBeVisible())

    const formInputName = screen.getByTestId('form-input-name', { exact: true })
    expect(formInputName).toBeVisible()

    const formInputEmail = screen.getByTestId('form-input-email', { exact: true })
    expect(formInputEmail).toBeVisible()

    const formInputMessage = screen.getByTestId('form-input-message', { exact: true })
    expect(formInputMessage).toBeVisible()

    const contactFormAction = screen.getByTestId('contact-form-action', { exact: true })
    expect(contactFormAction).toBeVisible()

    const formButtonSubmit = screen.getByTestId('form-button-submit', { exact: true })
    expect(formButtonSubmit).toBeVisible()

    const formButtonReset = screen.getByTestId('form-button-reset', { exact: true })
    expect(formButtonReset).toBeVisible()
  })

  test('the header text is present on the contact form', () => {
    render(<Contact />)
    const contactHeader = screen.getByTestId('contact-header', { exact: true })
    expect(contactHeader.textContent).toEqual('Get in touch or leave a feedback')
  })

  test('display form submission status when the form data submission failed', async () => {
    fetchMock.mockReject({ name: 'test_error', message: 'some error introduced for testing' })
    render(<Contact />)

    fireEvent.input(screen.getByLabelText('Your name', { exact: true }), { target: { value: 'test user' } })
    fireEvent.input(screen.getByLabelText('Your email', { exact: true }), {
      target: { value: 'testuser@justarecipe.com' }
    })
    fireEvent.input(screen.getByLabelText('Message', { exact: true }), { target: { value: 'test message' } })
    fireEvent.submit(screen.getByTestId('form-button-submit', { exact: true }))
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled()
    })

    const apiStatusBar = screen.getByTestId('api-status-bar', { exact: true })
    expect(apiStatusBar.classList).toContain('error')
  })

  test('display form submission status when the form data is successfully submited', async () => {
    fetchMock.mockResponse(JSON.stringify({ status: 201 }))
    render(<Contact />)

    fireEvent.input(screen.getByLabelText('Your name', { exact: true }), { target: { value: 'test user' } })
    fireEvent.input(screen.getByLabelText('Your email', { exact: true }), {
      target: { value: 'testuser@justarecipe.com' }
    })
    fireEvent.input(screen.getByLabelText('Message', { exact: true }), { target: { value: 'test message' } })
    fireEvent.submit(screen.getByTestId('form-button-submit', { exact: true }))
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled()
    })

    const apiStatusBar = screen.getByTestId('api-status-bar', { exact: true })
    expect(apiStatusBar.classList).toContain('error')
  })
})
