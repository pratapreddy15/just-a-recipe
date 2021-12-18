import React from 'react'

import classes from './carousel-card.module.css'

enum SLIDESHOW_STATE {
  PLAYING = 'playing',
  PAUSED = 'paused'
}

type RecipeCardProps = {
  category: string
  photos: { imageSource: string; imageTitle: string }[]
}

function CarouselCard(props: RecipeCardProps) {
  const [slideshowState, setSlideshowState] = React.useState<SLIDESHOW_STATE>(SLIDESHOW_STATE.PLAYING)
  const classList = [
    classes.photos,
    `${slideshowState === SLIDESHOW_STATE.PLAYING ? classes.playing : classes.paused}`,
    classes[`photos-${props.category}`]
  ]

  return (
    <div className={classes.gallery}>
      <div className={classList.join(' ')}>
        {props.photos.map((image, index) => {
          return <img key={index} src={image.imageSource} alt={image.imageTitle} />
        })}
      </div>
      <div className={classes.footer}>
        <div className={classes.categoryName}>{props.category}</div>
        <div className={classes.slideshowButton}>
          {slideshowState === SLIDESHOW_STATE.PAUSED ? (
            <img
              className={classes.imagePlay}
              src="./images/play-circle.svg"
              alt="Play"
              onClick={() => {
                setSlideshowState(SLIDESHOW_STATE.PLAYING)
              }}
            />
          ) : (
            <img
              className={classes.imagePaused}
              src="./images/pause-circle.svg"
              alt="Pause"
              onClick={() => {
                setSlideshowState(SLIDESHOW_STATE.PAUSED)
              }}
            />
          )}
          <img className={classes.browseRecipes} src="./images/btn-browse-recipes.svg" alt="Browse Recipes" />
        </div>
      </div>
    </div>
  )
}

export default CarouselCard
