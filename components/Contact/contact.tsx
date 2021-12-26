import { FormEvent, useRef, useState } from 'react'

import { APIStatusBar } from '..'
import classes from './contact.module.css'

enum FEEDBACK_SUBMISSION_STATUS {
  NONE,
  SUCCESS,
  ERROR
}

function Contact() {
  const [feedbackSubmissionStatus, setFeedbackSubmissionStatus] = useState(FEEDBACK_SUBMISSION_STATUS.NONE)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const messageInputRef = useRef<HTMLTextAreaElement>(null)

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const name = nameInputRef.current ? nameInputRef.current.value.trim() : null
    const email = emailInputRef.current ? emailInputRef.current.value.trim() : null
    const message = messageInputRef.current ? messageInputRef.current.value.trim() : null

    if (name && email && message) {
      fetch('/api/feedback', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          message
        })
      })
        .then((response) => {
          if (response.status === 201) {
            setFeedbackSubmissionStatus(FEEDBACK_SUBMISSION_STATUS.SUCCESS)
          } else {
            setFeedbackSubmissionStatus(FEEDBACK_SUBMISSION_STATUS.ERROR)
          }
        })
        .catch((err) => {
          console.error(err)
          setFeedbackSubmissionStatus(FEEDBACK_SUBMISSION_STATUS.ERROR)
        })
    }
  }

  return (
    <div className={classes.contact}>
      <div className={classes.formHeader}>
        <span>Get in touch or leave a feedback</span>
      </div>
      {feedbackSubmissionStatus === FEEDBACK_SUBMISSION_STATUS.ERROR && (
        <APIStatusBar
          status={'ERROR'}
          message="Something went wrong, please try again!"
          closeHandler={() => setFeedbackSubmissionStatus(FEEDBACK_SUBMISSION_STATUS.NONE)}
        />
      )}
      {feedbackSubmissionStatus === FEEDBACK_SUBMISSION_STATUS.SUCCESS && (
        <APIStatusBar
          status={'SUCCESS'}
          message="Thank you for your message!"
          closeHandler={() => setFeedbackSubmissionStatus(FEEDBACK_SUBMISSION_STATUS.NONE)}
        />
      )}
      <form className={classes.form} onSubmit={(e) => formSubmitHandler(e)}>
        <div className={classes.formControl}>
          <label htmlFor="name" className={classes.formLabel}>
            Your name
          </label>
          <input required type="text" id="name" className={classes.formInput} ref={nameInputRef} />
        </div>
        <div className={classes.formControl}>
          <label htmlFor="email" className={classes.formLabel}>
            Your email
          </label>
          <input required type="email" id="email" className={classes.formInput} ref={emailInputRef} />
        </div>
        <div className={classes.formControl}>
          <label htmlFor="messageText" className={classes.formLabel}>
            Message
          </label>
          <textarea required id="messageText" className={classes.textarea} ref={messageInputRef}></textarea>
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
