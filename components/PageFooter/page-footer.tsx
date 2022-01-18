import Link from 'next/link'
import Image from 'next/image'

import classes from './page-footer.module.css'

function PageFooter() {
  return (
    <div data-testid='page-footer' data-pagefooter className={classes.footer}>
      <div data-testid='page-footer-links' className={classes.links}>
        <div data-testid='page-footer-github' className={classes.github}>
          <Link href="https://github.com/pratapreddy15/just-a-recipe">
            <a data-testid='page-footer-github-link' target="_blank" rel="noreferrer">
              <Image height={40} width={40} src="/images/github.svg" />
            </a>
          </Link>
        </div>
        <div data-testid='page-footer-linkedin' className={classes.linkedin}>
          <Link href="https://www.linkedin.com/in/pratapreddy15">
            <a data-testid='page-footer-linkedin-link' target="_blank" rel="noreferrer">
              <Image height={40} width={40} src="/images/linkedin.svg" />
            </a>
          </Link>
        </div>
      </div>
      <div className={classes.copyright}>
        <span>&copy;</span>&nbsp;Just A Recipe
      </div>
    </div>
  )
}

export default PageFooter
