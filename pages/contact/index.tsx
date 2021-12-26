import { useEffect, useContext } from 'react'

import { Contact } from '../../components'
import { AppContext, NAVIGATION_MENU_STATES } from '../../context/context-provider'

function ContactPage() {
  const appContext = useContext(AppContext)

  useEffect(() => {
    if (appContext.navigationMenuState === NAVIGATION_MENU_STATES.OPEN) {
      appContext.setNavigationMenuState(NAVIGATION_MENU_STATES.CLOSED)
    }
  }, [])

  return <Contact />
}

export default ContactPage
