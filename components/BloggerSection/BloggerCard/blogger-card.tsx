import Image from 'next/image'
import Link from 'next/link'

import classes from './blogger-card.module.css'

interface BloggerCardProps {
  bloggerTitle: string
  blogUrl: string
  highlight: string
  youtubeUrl: string
  facebookUrl: string
  twitterUrl: string
}

function BloggerCard(props: BloggerCardProps) {
  return (
    <div data-testid="blogger-card" className={classes.card}>
      <div data-testid="blogger-card-title" className={classes.title}>
        <Link href={props.blogUrl}>
          <a data-testid="blogger-card-title-link" className={classes.linkToBlog} target="_blank" rel="noreferrer">
            {props.bloggerTitle}
          </a>
        </Link>
      </div>
      <div className={classes.highlight}>{props.highlight}</div>
      <div data-testid="blogger-card-socialmedias" className={classes.socialMedias}>
        <div data-testid="blogger-card-youtube" className={classes.youtube}>
          <a
            data-testid="blogger-card-youtube-link"
            className={classes.link}
            href={props.youtubeUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Image height={30} width={30} src="/images/youtube-icon.svg" />
          </a>
        </div>
        <div data-testid="blogger-card-facebook" className={classes.facebook}>
          <a
            data-testid="blogger-card-facebook-link"
            className={classes.link}
            target="_blank"
            href={props.facebookUrl}
            rel="noreferrer"
          >
            <Image height={30} width={30} src="/images/facebook-icon.svg" />
          </a>
        </div>
        <div data-testid="blogger-card-twitter" className={classes.twitter}>
          <a
            data-testid="blogger-card-twitter-link"
            className={classes.link}
            target="_blank"
            href={props.twitterUrl}
            rel="noreferrer"
          >
            <Image height={30} width={30} src="/images/twitter-icon.svg" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default BloggerCard
