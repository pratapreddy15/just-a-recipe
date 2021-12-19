import React, { useContext } from 'react'

import { IconMenu, Navigation } from '../../'
import { AppContext, NAVIGATION_MENU_STATES } from '../../../context/context-provider'

function Navbar() {
  const appContext = useContext(AppContext)

  return (
    <nav className="nav vertically-centered">
      <button
        onClick={() => {
          appContext.setNavigationMenuState(NAVIGATION_MENU_STATES.OPEN)
        }}
        className="btn-menu"
      >
        <IconMenu />
      </button>
      <Navigation />
    </nav>
  )
}

export default Navbar
