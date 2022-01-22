import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { ImageLoader } from '../'
import classes from './loadable-card.module.css'

type CardProps = {
  cardImage: { imageSource: string; imageTitle: string }
  footer: React.ReactChild
}

function LoadableCard(props: CardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const { cardImage } = props

  return (
    <div data-testid='loadable-card' className={classes.loadableCard}>
      <div data-testid='loadable-card-photo' className={classes.photo}>
        {!isImageLoaded && <ImageLoader />}
        <Image
          src={cardImage.imageSource}
          onLoadingComplete={() => setIsImageLoaded(true)}
          alt={cardImage.imageTitle}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div data-testid='loadable-card-footer' className={classes.footer}>{props.footer}</div>
    </div>
  )
}

export default LoadableCard
