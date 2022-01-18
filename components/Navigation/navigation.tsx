import Link from 'next/link'
import { useContext } from 'react'

import { CloseMenu } from '..'
import { APP_PAGES } from '../../constants/pages'
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
    <div data-testid='navigation' className={elClasses.join(' ')}>
      <div data-testid='navigation-close' className={classes.closeNavigation}>
        <button
          data-testid='navigation-close-button'
          onClick={() => {
            appContext.setNavigationMenuState(NAVIGATION_MENU_STATES.CLOSED)
          }}
          className={classes.btnClose}
        >
          <CloseMenu />
        </button>
      </div>
      <ul data-testid='navigation-list' className={classes.navigation__list}>
        <li
          data-testid='navigation-list-item'
          className={[
            classes['navigation__list--item'],
            appContext.activePage === APP_PAGES.HOME ? classes.active : ''
          ].filter(className => !!className).join(' ')}
        >
          <Link href="/">Home</Link>
        </li>
        <li
          data-testid='navigation-list-item'
          className={[
            classes['navigation__list--item'],
            appContext.activePage === APP_PAGES.CATEGORIES ? classes.active : ''
          ].filter(className => !!className).join(' ')}
        >
          <Link href="/categories">Categories</Link>
        </li>
        <li
          data-testid='navigation-list-item'
          className={[
            classes['navigation__list--item'],
            appContext.activePage === APP_PAGES.SEARCH ? classes.active : ''
          ].filter(className => !!className).join(' ')}
        >
          <Link href="/search">Search</Link>
        </li>
        <li
          data-testid='navigation-list-item'
          className={[
            classes['navigation__list--item'],
            appContext.activePage === APP_PAGES.ABOUT ? classes.active : ''
          ].filter(className => !!className).join(' ')}
        >
          <Link href="/about">About</Link>
        </li>
        <li
          data-testid='navigation-list-item'
          className={[
            classes['navigation__list--item'],
            appContext.activePage === APP_PAGES.CONTACT ? classes.active : ''
          ].filter(className => !!className).join('')}
        >
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navigation
