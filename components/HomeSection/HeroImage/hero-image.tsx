import { useState } from 'react'
import Image from 'next/image'

import { ImageLoader } from '../..'
import classes from './hero-image.module.css'

interface HeroImageProps {
  datasets: { [key: string]: string }
  content: string
  imagePath: string
  authorName: string
  authorUrl: string
}

function HeroImage(props: HeroImageProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <div data-testid="hero-content" {...props.datasets} className={classes.imageContainer}>
      {!isImageLoaded && <ImageLoader />}
      {isImageLoaded && (
        <div data-testid="hero-content-text" className={classes.heroContent}>
          {props.content.split('\n').map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </div>
      )}
      <Image
        data-testid="hero-content-image"
        src={props.imagePath}
        alt={`Photo by ${props.authorName}`}
        layout="fill"
        onLoadingComplete={() => setIsImageLoaded(true)}
      />
      <div data-testid="hero-content-credit" className={classes.credit}>
        Photo by{' '}
        <a data-testid="hero-content-credit-link" target="_blank" href={props.authorUrl} rel="noreferrer">
          {props.authorName}
        </a>{' '}
        on{' '}
        <a data-testid="hero-content-credit-link" target="_blank" href="https://unsplash.com" rel="noreferrer">
          Unsplash
        </a>
      </div>
    </div>
  )
}

export default HeroImage
