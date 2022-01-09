import { useContext, useEffect } from 'react'

import { APP_PAGES } from '../constants/pages'
import { NAVIGATION_MENU_STATES, AppContext } from '../context/context-provider'

const useAppNavigation = () => {
  const appContext = useContext(AppContext)
  useEffect(() => {
    if (appContext.navigationMenuState === NAVIGATION_MENU_STATES.OPEN) {
      appContext.setNavigationMenuState(NAVIGATION_MENU_STATES.CLOSED)
    }
    appContext.setActivePage(APP_PAGES.HOME)
  }, [])
}

export default useAppNavigation
