import Link from 'next/link'
import Image from 'next/image'

import classes from './page-footer.module.css'

function PageFooter() {
  return (
    <div data-pagefooter className={classes.footer}>
      <div className={classes.links}>
        <div className={classes.github}>
          <Link href="https://github.com/pratapreddy15/just-a-recipe">
            <a target="_blank">
              <Image height={40} width={40} src="/images/github.svg" />
            </a>
          </Link>
        </div>
        <div className={classes.linkedin}>
          <Link href="https://www.linkedin.com/in/pratapreddy15">
            <a target="_blank">
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
