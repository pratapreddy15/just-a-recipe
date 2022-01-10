import { useState } from 'react'
import classes from './api-status-bar.module.css'

interface APIStatusBarProps {
  status: 'SUCCESS' | 'ERROR'
  message: string
  closeHandler: () => void
}

function APIStatusBar(props: APIStatusBarProps) {
  return (
    <div data-testid="api-status-bar" className={`${classes.toastr} ${classes[props.status.toLowerCase()]}`}>
      <div data-testid="api-status-message" className={classes.message}>
        {props.message}
      </div>
      <button data-testid="api-status-close" className={classes.closeButton} onClick={() => props.closeHandler()}>
        &#215;
      </button>
    </div>
  )
}

export default APIStatusBar
