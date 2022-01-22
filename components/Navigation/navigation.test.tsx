import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Navigation from './navigation'
import { AppContext, NAVIGATION_MENU_STATES } from '../../context/context-provider'
import { APP_PAGES } from '../../constants/pages'

describe('Navigation', () => {
    let appContextValuesMock = {
        activePage: APP_PAGES.HOME,
        setActivePage: jest.fn(),
        navigationMenuState: NAVIGATION_MENU_STATES.CLOSED,
        setNavigationMenuState: jest.fn()
    }

    let useContextMock: jest.Mock

    const mockUseContextHook = (navigationMenuState: NAVIGATION_MENU_STATES = NAVIGATION_MENU_STATES.CLOSED, activePage: APP_PAGES = APP_PAGES.HOME) => {
        useContextMock.mockImplementation((value: any) => {
            return {
                setNavigationMenuState: jest.fn(),
                navigationMenuState: navigationMenuState,
                activePage: activePage
            }
        })
    }

    beforeEach(() => {
        useContextMock = jest.fn()
        React.useContext = useContextMock
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('renders the navigation component', () => {
        mockUseContextHook()
        render(<Navigation />)
        const navigation = screen.getByTestId('navigation', { exact: true })
        expect(navigation).toBeVisible()

        const navigationClose = screen.getByTestId('navigation-close', { exact: true })
        expect(navigationClose).toBeVisible()

        const navigationCloseButton = screen.getByTestId('navigation-close-button', { exact: true })
        expect(navigationCloseButton).toBeVisible()

        const navigationList = screen.getByTestId('navigation-list', { exact: true })
        expect(navigationList).toBeVisible()

        const navigationListItems = screen.getAllByTestId('navigation-list-item', { exact: true })
        expect(navigationListItems.length).toEqual(5)
    })

    test('renders the navigation list item with link to the correct page', () => {
        mockUseContextHook()

        render(<Navigation />)
        const navigationListItems = screen.getAllByTestId('navigation-list-item', { exact: true })

        const homeListItem = navigationListItems[0]
        const homeLink = homeListItem.querySelector('a')
        expect(homeLink).toHaveAttribute('href', '/')

        const categoriesListItem = navigationListItems[1]
        const categoriesLink = categoriesListItem.querySelector('a')
        expect(categoriesLink).toHaveAttribute('href', '/categories')

        const searchListItem = navigationListItems[2]
        const searchLink = searchListItem.querySelector('a')
        expect(searchLink).toHaveAttribute('href', '/search')

        const aboutListItem = navigationListItems[3]
        const aboutLink = aboutListItem.querySelector('a')
        expect(aboutLink).toHaveAttribute('href', '/about')

        const contactListItem = navigationListItems[4]
        const contactLink = contactListItem.querySelector('a')
        expect(contactLink).toHaveAttribute('href', '/contact')
    })

    test('the navigation bar is closed if the navigation menu state is closed', () => {
        mockUseContextHook()

        render((
            <AppContext.Provider value={
                {
                    ...appContextValuesMock
                }
            }>
                <Navigation />
            </AppContext.Provider>
        ))

        const navigation = screen.getByTestId('navigation', { exact: true })
        expect(navigation.className.split(' ')).toEqual(['navigation', 'close'])
    })

    test('the navigation bar is opened if the navigation menu state is open', () => {
        mockUseContextHook(NAVIGATION_MENU_STATES.OPEN)

        render((
            <AppContext.Provider value={
                {
                    ...appContextValuesMock
                }
            }>
                <Navigation />
            </AppContext.Provider>
        ))

        const navigation = screen.getByTestId('navigation', { exact: true })
        expect(navigation.className.split(' ')).toEqual(['navigation', 'open'])
    })

    test('highlight the active list item when page navigating happens', () => {
        mockUseContextHook(NAVIGATION_MENU_STATES.CLOSED, APP_PAGES.CATEGORIES)

        render((
            <AppContext.Provider value={
                {
                    ...appContextValuesMock
                }
            }>
                <Navigation />
            </AppContext.Provider>
        ))

        const navigationListItems = screen.getAllByTestId('navigation-list-item', { exact: true })
        const categoriesListItem = navigationListItems[1]
        expect(categoriesListItem.className.split(' ')).toEqual(['navigation__list--item', 'active'])

        const homeListItem = navigationListItems[0]
        expect(homeListItem.className.split(' ')).toEqual(['navigation__list--item'])

        const searchListItem = navigationListItems[2]
        expect(searchListItem.className.split(' ')).toEqual(['navigation__list--item'])

        const aboutListItem = navigationListItems[3]
        expect(aboutListItem.className.split(' ')).toEqual(['navigation__list--item'])

        const contactListItem = navigationListItems[4]
        expect(contactListItem.className.split(' ')).toEqual(['navigation__list--item'])
    })
})