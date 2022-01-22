import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import PageFooter from './page-footer'

describe('PageFooter', () => {
    test('renders the page footer component', () => {
        render(<PageFooter />)

        const pageFooter = screen.getByTestId('page-footer', { exact: true })
        expect(pageFooter).toBeVisible()

        const pageFooterLinks = screen.getByTestId('page-footer-links', { exact: true })
        expect(pageFooterLinks).toBeVisible()

        const pageFooterGithub = screen.getByTestId('page-footer-github', { exact: true })
        expect(pageFooterGithub).toBeVisible()

        const pageFooterLinked = screen.getByTestId('page-footer-linkedin', { exact: true })
        expect(pageFooterLinked).toBeVisible()

        const pageFooterGithubLink = screen.getByTestId('page-footer-github-link', { exact: true })
        expect(pageFooterGithubLink).toBeVisible()

        const pageFooterLinkedinLink = screen.getByTestId('page-footer-linkedin-link', { exact: true })
        expect(pageFooterLinkedinLink).toBeVisible()
    })

    test('renders the links on the page footer for github and linkedin', () => {
        render(<PageFooter />)

        const pageFooterGithubLink = screen.getByTestId('page-footer-github-link', { exact: true })
        expect(pageFooterGithubLink).toHaveAttribute('href', 'https://github.com/pratapreddy15/just-a-recipe')

        const pageFooterLinkedinLink = screen.getByTestId('page-footer-linkedin-link', { exact: true })
        expect(pageFooterLinkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/pratapreddy15')
    })
})