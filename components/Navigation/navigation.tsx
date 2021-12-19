import Link from 'next/link'
import { useContext } from 'react'

import { CloseMenu } from '..'
import { AppContext, NAVIGATION_MENU_STATES } from '../../context/context-provider'
import classes from './navigation.module.css'

function Navigation() {
  const appContext = useContext(AppContext)
  const isOpen = appContext.navigationMenuState === NAVIGATION_MENU_STATES.OPEN
  const isClosed = appContext.navigationMenuState === NAVIGATION_MENU_STATES.CLOSED

  const elClasses = [classes.navigation]
  if (isOpen) elClasses.push(classes.open)
  if (isClosed) elClasses.push(classes.close)

  return (
    <div className={elClasses.join(' ')}>
      <div className={classes.closeNavigation}>
        <button
          onClick={() => {
            appContext.setNavigationMenuState(NAVIGATION_MENU_STATES.CLOSED)
          }}
          className={classes.btnClose}
        >
          <CloseMenu />
        </button>
      </div>
      <ul className={classes.navigation__list}>
        <li className={classes['navigation__list--item']}>
          <Link href="/">Home</Link>
        </li>
        <li className={classes['navigation__list--item']}>
          <Link href="/categories">Categories</Link>
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
