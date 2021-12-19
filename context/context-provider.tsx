import React, { createContext, ReactNode, useState } from 'react'

export enum NAVIGATION_MENU_STATES {
  NONE,
  CLOSED,
  OPEN
}

type AppContextType = {
  navigationMenuState: NAVIGATION_MENU_STATES
  setNavigationMenuState: (value: NAVIGATION_MENU_STATES) => void
}

const defaultAppContext: AppContextType = {
  navigationMenuState: NAVIGATION_MENU_STATES.NONE,
  setNavigationMenuState: (value: NAVIGATION_MENU_STATES) => {}
}

type ContextProviderProps = {
  children: ReactNode
}

export const AppContext = createContext<AppContextType>(defaultAppContext)

export function ContextProvider({ children }: ContextProviderProps) {
  const [navMenuState, setNavMenuState] = useState<NAVIGATION_MENU_STATES>(NAVIGATION_MENU_STATES.NONE)

  const initialValues: AppContextType = {
    navigationMenuState: navMenuState,
    setNavigationMenuState: setNavMenuState
  }

  return <AppContext.Provider value={initialValues}>{children}</AppContext.Provider>
}
