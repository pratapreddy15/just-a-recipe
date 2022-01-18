import { HeroImage, IconLeft, IconRight, IconArrowCircleDown } from '../..'
import classes from './hero.module.css'

interface HeroProps {
  heroContent: Array<{
    imagePath: string
    authorName: string
    authorUrl: string
    content: string
  }>
}

function Hero(props: HeroProps) {
  function showNextImage() {
    const activeHeroImage = document.querySelector('[data-hero-image][data-shown]')
    if (activeHeroImage) {
      activeHeroImage.removeAttribute('data-shown')
      const nextImage = activeHeroImage.nextElementSibling
      if (nextImage) {
        nextImage.setAttribute('data-shown', '')
      } else {
        const firstImage = document.querySelector('[data-hero-image-first]')
        firstImage?.setAttribute('data-shown', '')
      }
    }
  }

  function showPrevImage() {
    const activeHeroImage = document.querySelector('[data-hero-image][data-shown]')
    if (activeHeroImage) {
      activeHeroImage.removeAttribute('data-shown')
      const prevImage = activeHeroImage.previousElementSibling
      if (prevImage) {
        prevImage.setAttribute('data-shown', '')
      } else {
        const lastImage = document.querySelector('[data-hero-image-last]')
        lastImage?.setAttribute('data-shown', '')
      }
    }
  }

  function getDatasetsForHeroImageElement(heroIndex: number) {
    let datasets = {
      ['data-hero-image']: 'data-hero-image'
    }
    const isFirstImage = heroIndex === 0
    const isLastImage = heroIndex === props.heroContent.length - 1
    if (isFirstImage) {
      datasets = {
        ...datasets,
        ...{
          ['data-shown']: 'data-shown',
          ['data-hero-image-first']: 'data-hero-image-first'
        }
      }
    }
    if (isLastImage) {
      datasets = {
        ...datasets,
        ...{
          ['data-hero-image-last']: 'data-hero-image-last'
        }
      }
    }
    return datasets
  }

  function scrollDown() {
    window.scrollBy(0, window.innerHeight)
  }

  return (
    <section data-testid="hero" className={classes.hero}>
      <button
        data-testid="hero-image-nav-prev"
        onClick={showPrevImage}
        className={`${classes.prevImage} ${classes.imageNavButton} 'clear-space'`}
      >
        <IconLeft />
      </button>
      <div data-testid="hero-images" className={classes.heroImages}>
        {props.heroContent.map((data, i) => {
          const datasets = getDatasetsForHeroImageElement(i)

          return (
            <HeroImage
              datasets={datasets}
              key={i}
              imagePath={data.imagePath}
              authorName={data.authorName}
              authorUrl={data.authorUrl}
              content={data.content}
            />
          )
        })}
      </div>
      <button
        data-testid="hero-image-nav-next"
        onClick={showNextImage}
        className={`${classes.nextImage} ${classes.imageNavButton} 'clear-space'`}
      >
        <IconRight />
      </button>
      <button data-testid="hero-scroll-down" onClick={scrollDown}
        className={`${classes.scrollDownButton} 'clear-space`}>
        <IconArrowCircleDown />
      </button>
    </section>
  )
}

export default Hero
