import { useContext, useEffect } from 'react'

import { About } from '../../components'
import { APP_PAGES } from '../../constants/pages'
import { AppContext, NAVIGATION_MENU_STATES } from '../../context/context-provider'

function AboutPage() {
  const appContext = useContext(AppContext)

  useEffect(() => {
    if (appContext.navigationMenuState === NAVIGATION_MENU_STATES.OPEN) {
      appContext.setNavigationMenuState(NAVIGATION_MENU_STATES.CLOSED)
    }
    appContext.setActivePage(APP_PAGES.ABOUT)
  }, [])

  return <About />
}

export default AboutPage
