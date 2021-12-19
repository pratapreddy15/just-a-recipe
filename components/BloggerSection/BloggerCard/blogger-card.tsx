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
    <div className={classes.card}>
      <div className={classes.title}>
        <Link href={props.blogUrl}>
          <a className={classes.linkToBlog} target="_blank">
            {props.bloggerTitle}
          </a>
        </Link>
      </div>
      <div className={classes.highlight}>{props.highlight}</div>
      <div className={classes.socialMedias}>
        <div className={classes.youtube}>
          <a className={classes.link} href={props.youtubeUrl} target="_blank">
            <Image height={30} width={30} src="/images/youtube-icon.svg" />
          </a>
        </div>
        <div className={classes.facebook}>
          <a className={classes.link} target="_blank" href={props.facebookUrl}>
            <Image height={30} width={30} src="/images/facebook-icon.svg" />
          </a>
        </div>
        <div className={classes.twitter}>
          <a className={classes.link} target="_blank" href={props.twitterUrl}>
            <Image height={30} width={30} src="/images/twitter-icon.svg" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default BloggerCard
