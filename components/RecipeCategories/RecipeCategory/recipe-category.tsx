import React from 'react'
import Link from 'next/link'

import classes from './recipe-category.module.css'

enum SLIDESHOW_STATE {
  PLAYING = 'playing',
  PAUSED = 'paused'
}

type RecipeCategoryProps = {
  id: string
  category: string
  recipesCount: number
  photos: { imageSource: string; imageTitle: string }[]
}

function RecipeCategory(props: RecipeCategoryProps) {
  const [slideshowState, setSlideshowState] = React.useState<SLIDESHOW_STATE>(SLIDESHOW_STATE.PLAYING)
  const classList = [
    props.photos.length > 1 ? classes.photos : classes['single-photo'],
    `${slideshowState === SLIDESHOW_STATE.PLAYING ? classes.playing : classes.paused}`,
    classes[`photos-${props.category}`]
  ]

  let slideshowMediaImage: React.ReactNode
  if (props.photos.length > 1) {
    slideshowMediaImage =
      slideshowState === SLIDESHOW_STATE.PAUSED ? (
        <img
          data-testid="recipe-category-slideshow-play"
          className={classes.imagePlay}
          src="./images/play-circle.svg"
          alt="Play"
          onClick={() => {
            setSlideshowState(SLIDESHOW_STATE.PLAYING)
          }}
        />
      ) : (
        <img
          data-testid="recipe-category-slideshow-pause"
          className={classes.imagePaused}
          src="./images/pause-circle.svg"
          alt="Pause"
          onClick={() => {
            setSlideshowState(SLIDESHOW_STATE.PAUSED)
          }}
        />
      )
  }

  return (
    <div data-testid="recipe-category" className={classes.gallery}>
      <div data-testid="recipe-category-gallery-photos" className={classList.join(' ')}>
        {props.photos.map((image, index) => {
          return <img key={index} src={image.imageSource} alt={image.imageTitle} />
        })}
      </div>
      <div data-testid="recipe-category-footer" className={classes.footer}>
        <div data-testid="recipe-category-footer-text" className={classes.categoryName}>
          {new Intl.NumberFormat().format(props.recipesCount)} {props.category}
        </div>
        <div className={classes.slideshowButton}>
          {slideshowMediaImage && slideshowMediaImage}
          <Link href={`/categories/${props.id}`}>
            <a data-testid="recipe-category-footer-link" className={classes.footerLink}>
              <img className={classes.browseRecipes} src="./images/btn-browse-recipes.svg" alt="Browse Recipes" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RecipeCategory
