import Link from 'next/link'
import { BloggerCard } from '../../index'

import classes from './bloggers.module.css'

interface BloggersProps {
  bloggers: Array<{
    title: string
    blogUrl: string
    highlight: string
    youtubeUrl: string
    facebookUrl: string
    twitterUrl: string
  }>
}

function Bloggers(props: BloggersProps) {
  const { bloggers } = props

  return (
    <section data-testid="bloggers" className={classes.bloggers}>
      <h3 data-testid="bloggers-header" className={classes.header}>
        Credit to bloggers
      </h3>
      <div data-testid="bloggers-grid" className={classes.grid}>
        {bloggers.map((blogger, i) => (
          <BloggerCard
            key={i}
            bloggerTitle={blogger.title}
            blogUrl={blogger.blogUrl}
            highlight={blogger.highlight}
            youtubeUrl={blogger.youtubeUrl}
            facebookUrl={blogger.facebookUrl}
            twitterUrl={blogger.twitterUrl}
          />
        ))}
      </div>
      <div className={classes.linkTopFoodBlogs}>
        <Link href="https://blog.feedspot.com/indian_food_blogs/?_src=search">
          <a data-testid="bloggers-top-food-blogs-link" target="_blank" rel="noreferrer">
            See top 100 indian food blogs <div className={classes.rightArrow}>&#8594;</div>
          </a>
        </Link>
      </div>
    </section>
  )
}

export default Bloggers
