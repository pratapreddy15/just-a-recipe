import Link from 'next/link'
import { useState, useContext } from 'react'

import { CloseMenu } from '..'
import { AppContext, NAVIGATION_MENU_STATES } from '../../context/context-provider'
import classes from './navigation.module.css'

function Navigation() {
  const appContext = useContext(AppContext)
  console.log(appContext.navigationMenuState)
  //   const isClosed = appContext.navigationMenuState === NAVIGATION_MENU_STATES.CLOSED
  const isOpen = appContext.navigationMenuState === NAVIGATION_MENU_STATES.OPEN

  //   const [isClosed, setIsClose] = useState(appContext.navigationMenuState === NAVIGATION_MENU_STATES.CLOSED)

  return (
    <div className={isOpen ? `${classes.navigation} ${classes.open}` : `${classes.navigation} ${classes.close}`}>
      <div className={classes.closeNavigation}>
        <button
          onClick={() => {
            appContext.setNavigationMenuState(NAVIGATION_MENU_STATES.CLOSED)
            // setIsClose(true)
          }}
          className={classes.btnClose}
        >
          <CloseMenu />
        </button>
      </div>
      <ul className={classes.navigation__list}>
        <li className={classes['navigation__list--item']}>
          <Link href="#">Home</Link>
        </li>
        <li className={classes['navigation__list--item']}>
          <Link href="#">Categories</Link>
        </li>
        <li className={classes['navigation__list--item']}>
          <Link href="#">Recipes</Link>
        </li>
        <li className={classes['navigation__list--item']}>
          <Link href="#">About</Link>
        </li>
        <li className={classes['navigation__list--item']}>
          <Link href="#">Contact</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navigation
