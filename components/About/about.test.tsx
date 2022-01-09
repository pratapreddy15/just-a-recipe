import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { ABOUT_PARAGRAPHS } from '../../constants/about-paragraphs'
import { TestIds } from '../../utils/test-id'

import About from './about'

describe('About', () => {
  test('displays the brand name in the heading', () => {
    render(<About />)

    const brandHeader = screen.getByTestId(TestIds.ABOUT.BRAND_HEADER, { exact: true })
    expect(brandHeader).toBeInTheDocument()
  })

  test('displays the paragraph for the content', () => {
    render(<About />)

    const paragraphs = screen.getAllByTestId(TestIds.ABOUT.PARAGRAPH, { exact: true })
    for (let i = 0; i < ABOUT_PARAGRAPHS.length; i++) {
      expect(paragraphs[i].textContent).toEqual(ABOUT_PARAGRAPHS[i])
    }

    const lastParagraph = paragraphs[paragraphs.length - 1]
    expect(lastParagraph.textContent).toEqual(
      'To know more about me and my work, please visit my github and linkedin profile.'
    )
  })

  test('displays the github and linked link on the last paragraph on the page', () => {
    render(<About />)

    const links = screen.getAllByTestId(TestIds.ABOUT.LINK, { exact: true })
    expect(links.length).toEqual(2)

    const githubLink = links[0]
    const linkedinLink = links[1]

    expect(githubLink.getAttribute('href')).toEqual('https://github.com/pratapreddy15')
    expect(linkedinLink.getAttribute('href')).toEqual('https://www.linkedin.com/in/pratapreddy15')
  })
})
