import Image from 'next/image'
import classes from './hero-image.module.css'

interface HeroImageProps {
  datasets: { [key: string]: string }
  content: string
  imagePath: string
  authorName: string
  authorUrl: string
}

function HeroImage(props: HeroImageProps) {
  return (
    <div {...props.datasets} className={classes.imageContainer}>
      <div className={classes.heroContent}>
        {props.content.split('\n').map((text, i) => (
          <span key={i}>{text}</span>
        ))}
      </div>
      <Image src={props.imagePath} alt={`Photo by ${props.authorName}`} layout="fill" />
      <div className={classes.credit}>
        Photo by{' '}
        <a target="_blank" href={props.authorUrl}>
          {props.authorName}
        </a>{' '}
        on{' '}
        <a target="_blank" href="https://unsplash.com">
          Unsplash
        </a>
      </div>
    </div>
  )
}

export default HeroImage
