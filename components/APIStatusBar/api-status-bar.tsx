import { useState } from 'react'
import classes from './api-status-bar.module.css'

interface APIStatusBarProps {
  status: 'SUCCESS' | 'ERROR'
  message: string
  closeHandler: () => void
}

function APIStatusBar(props: APIStatusBarProps) {
  return (
    <div className={`${classes.toastr} ${classes[props.status.toLowerCase()]}`}>
      <div className={classes.message}>{props.message}</div>
      <button className={classes.closeButton} onClick={() => props.closeHandler()}>
        &#215;
      </button>
    </div>
  )
}

export default APIStatusBar
