import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Navbar from './navbar'
import { AppContext, NAVIGATION_MENU_STATES } from '../../../context/context-provider'
import { APP_PAGES } from '../../../constants/pages'

describe("Navbar", () => {
    const setNavigationMenuStateMock = jest.fn()

    beforeEach(() => {
        React.useContext = jest.fn().mockImplementation((value: any) => {
            return {
                setNavigationMenuState: setNavigationMenuStateMock
            }
        })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test("renders the navbar component", () => {
        render(<Navbar />)
        const navbar = screen.getByTestId("navbar")
        expect(navbar).toBeVisible()
    })

    test("the menu state is set in the context when the navbar is opened", () => {
        render((
            <AppContext.Provider value={
                {
                    activePage: APP_PAGES.HOME,
                    navigationMenuState: NAVIGATION_MENU_STATES.CLOSED,
                    setActivePage: jest.fn(),
                    setNavigationMenuState: setNavigationMenuStateMock
                }
            }>
                <Navbar />
            </AppContext.Provider>
        ))
        const buttonMenu = screen.getByTestId("button-menu", { exact: true })
        fireEvent.click(buttonMenu)
        expect(setNavigationMenuStateMock).toHaveBeenCalledWith(NAVIGATION_MENU_STATES.OPEN)
    })
})