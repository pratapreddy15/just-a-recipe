import classes from './contact.module.css'

function Contact() {
  return (
    <div className={classes.contact}>
      <div className={classes.formHeader}>
        <span>Please provide your valuable feedback</span>
      </div>
      <form className={classes.form}>
        <div className={classes.formControl}>
          <label htmlFor="name" className={classes.formLabel}>
            Your name
          </label>
          <input type="text" id="name" className={classes.formInput} />
        </div>
        <div className={classes.formControl}>
          <label htmlFor="email" className={classes.formLabel}>
            Your email
          </label>
          <input type="email" id="email" className={classes.formInput} />
        </div>
        <div className={classes.formControl}>
          <label htmlFor="feedbackText" className={classes.formLabel}>
            Feedback
          </label>
          <textarea id="feedbackText" className={classes.textarea}></textarea>
        </div>
        <div className={classes.formAction}>
          <button className={classes.formButton} type="submit">
            Submit
          </button>
          <button className={classes.formButton} type="reset">
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}

export default Contact
