import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import ImageLoader from './image-loader'

describe('ImageLoader', () => {
    test('rendes the image loader component', () => {
        render(<ImageLoader />)

        const imageLoader = screen.getByTestId('image-loader', { exact: true })
        expect(imageLoader).toBeVisible()
    })

    test('the image loader element has the spinner class', () => {
        render(<ImageLoader />)

        const imageLoader = screen.getByTestId('image-loader', { exact: true })
        expect(imageLoader.className).toEqual('spinner')
    })
})