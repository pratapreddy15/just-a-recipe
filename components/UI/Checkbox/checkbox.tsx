import { ChangeEvent } from 'react'
import classes from './checkbox.module.css'

interface CheckboxProps {
  id: string
  label: string
  isChecked: boolean
  onToggle: (id: string, isChecked: boolean) => void
}

function Checkbox(props: CheckboxProps) {
  const toggleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.onToggle(e.target.dataset.identifier || '', e.target.checked)
  }

  return (
    <>
      <input
        onChange={toggleHandler}
        checked={props.isChecked}
        id={`checkbox-${props.id}`}
        name={`checkbox-${props.id}`}
        className={classes.input}
        type="checkbox"
        data-identifier={props.id}
      />
      <div className={classes.square}>
        <span className={classes.innerSquare}></span>
      </div>
      <label className={classes.label} htmlFor={`checkbox-${props.id}`}>
        {props.label}
      </label>
    </>
  )
}

export default Checkbox
