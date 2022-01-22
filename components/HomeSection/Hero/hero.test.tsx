import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

import Hero from './hero'

describe('Hero', () => {
    const heroPropsMock = [
        {
            imagePath: 'http://image-1.net',
            authorName: 'Image Author 1',
            authorUrl: 'http://image-author-1.net',
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
        },
        {
            imagePath: 'http://image-2.net',
            authorName: 'Image Author 2',
            authorUrl: 'http://image-author-2.net',
            content: `Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
        },
        {
            imagePath: 'http://image-3.net',
            authorName: 'Image Author 3',
            authorUrl: 'http://image-author-3.net',
            content: `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. `
        }
    ]

    afterEach(() => {
        jest.clearAllMocks()
    })

    test("renders the hero component", () => {
        render(<Hero heroContent={heroPropsMock} />)
        const hero = screen.getByTestId('hero', { exact: true })
        expect(hero).toBeVisible()

        const heroImages = screen.getByTestId('hero-images', { exact: true })
        expect(heroImages).toBeVisible()

        const heroContents = screen.getAllByTestId('hero-content', { exact: true })
        expect(heroContents.length).toEqual(heroPropsMock.length)

        const buttonPrev = screen.getByTestId('hero-image-nav-prev', { exact: true })
        expect(buttonPrev).toBeVisible()

        const buttonNext = screen.getByTestId('hero-image-nav-next', { exact: true })
        expect(buttonNext).toBeVisible()

        const buttonScrollDown = screen.getByTestId('hero-scroll-down', { exact: true })
        expect(buttonScrollDown).toBeVisible()
    })

    test('data-shown attribute is set only on hero image which is visible', () => {
        render(<Hero heroContent={heroPropsMock} />)
        const heroContents = screen.getAllByTestId('hero-content', { exact: true })

        expect(heroContents[0].getAttribute('data-hero-image')).toEqual('data-hero-image')
        expect(heroContents[0].getAttribute('data-shown')).toEqual('data-shown')

        expect(heroContents[1].getAttribute('data-hero-image')).toEqual('data-hero-image')
        expect(heroContents[1].getAttribute('data-shown')).toBeNull()

        expect(heroContents[2].getAttribute('data-hero-image')).toEqual('data-hero-image')
        expect(heroContents[2].getAttribute('data-shown')).toBeNull()
    })

    test("the next hero content is loaded when next icon is clicked", () => {
        render(<Hero heroContent={heroPropsMock} />)
        const buttonNext = screen.getByTestId('hero-image-nav-next', { exact: true })
        fireEvent.click(buttonNext)

        const heroContents = screen.getAllByTestId('hero-content', { exact: true })

        expect(heroContents[0]).not.toHaveAttribute('data-shown')

        expect(heroContents[1]).toHaveAttribute('data-shown')

        expect(heroContents[2]).not.toHaveAttribute('data-shown')
    })

    test("the previous hero content is loaded when prev icon is clicked", () => {
        render(<Hero heroContent={heroPropsMock} />)
        const buttonNext = screen.getByTestId('hero-image-nav-prev', { exact: true })
        fireEvent.click(buttonNext)

        const heroContents = screen.getAllByTestId('hero-content', { exact: true })

        expect(heroContents[0]).not.toHaveAttribute('data-shown')

        expect(heroContents[1]).not.toHaveAttribute('data-shown')

        expect(heroContents[2]).toHaveAttribute('data-shown')
    })

    test("page is scrolled down when scroll down icon is clicked", () => {
        window.scrollBy = jest.fn()
        render(<Hero heroContent={heroPropsMock} />)

        const buttonScrollDown = screen.getByTestId('hero-scroll-down', { exact: true })
        fireEvent.click(buttonScrollDown)

        expect(window.scrollBy).toHaveBeenCalled()
    })
})
