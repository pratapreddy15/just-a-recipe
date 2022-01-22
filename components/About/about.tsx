import { TestIds } from '../../utils/test-id'
import { ABOUT_PARAGRAPHS } from '../../constants/about-paragraphs'
import classes from './about.module.css'

function About() {
  return (
    <div className={classes.about}>
      <div data-testid={TestIds.ABOUT.BRAND_HEADER} className={classes.brandname}>
        Just a Recipe
      </div>
      {ABOUT_PARAGRAPHS.map((paragraph, i) => (
        <p key={i} data-testid={TestIds.ABOUT.PARAGRAPH} className={classes.paragraph}>
          {paragraph}
        </p>
      ))}
      <p data-testid={TestIds.ABOUT.PARAGRAPH} className={classes.paragraph}>
        To know more about me and my work, please visit my{' '}
        <a
          data-testid={TestIds.ABOUT.LINK}
          className={classes.link}
          href="https://github.com/pratapreddy15"
          target="_blank"
          rel="noreferrer"
        >
          github
        </a>{' '}
        and{' '}
        <a
          data-testid={TestIds.ABOUT.LINK}
          className={classes.link}
          href="https://www.linkedin.com/in/pratapreddy15"
          target="_blank"
          rel="noreferrer"
        >
          linkedin
        </a>{' '}
        profile.
      </p>
    </div>
  )
}

export default About
