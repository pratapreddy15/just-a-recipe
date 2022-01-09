import React, { createContext, ReactNode, useState } from 'react'

import { APP_PAGES } from '../constants/pages'

export enum NAVIGATION_MENU_STATES {
  NONE,
  CLOSED,
  OPEN
}

type AppContextType = {
  navigationMenuState: NAVIGATION_MENU_STATES
  activePage: APP_PAGES
  setNavigationMenuState: (value: NAVIGATION_MENU_STATES) => void
  setActivePage: (value: APP_PAGES) => void
}

const defaultAppContext: AppContextType = {
  navigationMenuState: NAVIGATION_MENU_STATES.NONE,
  activePage: APP_PAGES.HOME,
  setNavigationMenuState: (value: NAVIGATION_MENU_STATES) => {},
  setActivePage: (value: APP_PAGES) => {}
}

type ContextProviderProps = {
  children: ReactNode
}

export const AppContext = createContext<AppContextType>(defaultAppContext)

export function ContextProvider({ children }: ContextProviderProps) {
  const [navMenuState, setNavMenuState] = useState<NAVIGATION_MENU_STATES>(NAVIGATION_MENU_STATES.NONE)
  const [activePage, setActivePage] = useState<APP_PAGES>(APP_PAGES.HOME)

  const initialValues: AppContextType = {
    navigationMenuState: navMenuState,
    activePage: activePage,
    setNavigationMenuState: setNavMenuState,
    setActivePage: setActivePage
  }

  return <AppContext.Provider value={initialValues}>{children}</AppContext.Provider>
}
