import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import LoadableCard from './loadable-card'

describe('LoadableCard', () => {
    const loadableCardPropsMock = {
        cardImage: {
            imageSource: 'http://some-image-url.net',
            imageTitle: 'Some Image'
        },
        footer: <div></div>
    }

    let stateObjectMock: { isImageLoaded: boolean; setIsImageLoaded: (value: boolean) => void } = {
        isImageLoaded: false,
        setIsImageLoaded: (value: boolean) => {
            stateObjectMock.isImageLoaded = value
        }
    }

    const mockReactState = (initialValue: boolean) => {
        const useStateMock = jest.fn().mockImplementation((doesnotmatter: boolean) => {
            stateObjectMock.isImageLoaded = initialValue
            const isImageLoaded = stateObjectMock.isImageLoaded
            const setIsImageLoaded = stateObjectMock.setIsImageLoaded
            return [isImageLoaded, setIsImageLoaded]
        })
        jest.spyOn(React, 'useState').mockImplementation(useStateMock)
    }

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('renders the loadable card component', () => {
        render(<LoadableCard {...loadableCardPropsMock} />)

        const loadableCard = screen.getByTestId('loadable-card', { exact: true })
        expect(loadableCard).toBeVisible()

        const footer = screen.getByTestId('loadable-card-footer', { exact: true })
        expect(footer).toBeVisible()
    })

    test('displays the spinner if the image is not yet loaded', () => {
        render(<LoadableCard {...loadableCardPropsMock} />)

        const spinner = screen.getByTestId('loadable-card-photo', { exact: true })
        expect(spinner).toBeVisible()
    })

    test('displays the image when loaded', () => {
        mockReactState(true)
        render(<LoadableCard {...loadableCardPropsMock} />)

        const loadableCard = screen.getByTestId('loadable-card', { exact: true })
        const img = loadableCard.querySelector('img')
        expect(img).toHaveAttribute('alt', 'Some Image')
    })
})