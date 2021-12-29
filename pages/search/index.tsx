import { useContext, useEffect } from 'react'

import { Search } from '../../components'
import { AppContext, NAVIGATION_MENU_STATES } from '../../context/context-provider'

function SearchPage() {
  const appContext = useContext(AppContext)

  useEffect(() => {
    if (appContext.navigationMenuState === NAVIGATION_MENU_STATES.OPEN) {
      appContext.setNavigationMenuState(NAVIGATION_MENU_STATES.CLOSED)
    }
  }, [])

  return <Search />
}

export default SearchPage
