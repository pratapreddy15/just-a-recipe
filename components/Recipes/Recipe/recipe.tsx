import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

import { ImageLoader } from '../../'
import classes from './recipe.module.css'

interface RecipeProps {
  id: string
  categoryId: string
  name: string
  imageSource: string
  url: string
}

function Recipe(props: RecipeProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <li data-recipe data-recipeid={props.id} data-categoryid={props.categoryId} className={classes.item}>
      <div className={classes.photo}>
        {!imageLoaded && <ImageLoader />}
        <Image
          objectFit="cover"
          className={classes.image}
          src={props.imageSource}
          layout="fill"
          alt={props.name}
          onLoadingComplete={(e) => setImageLoaded(true)}
        />
      </div>
      <div className={classes.footer}>
        <Link href={props.url}>
          <a className={classes.linkToRecipe} target="_blank">
            {props.name}
          </a>
        </Link>
      </div>
    </li>
  )
}

export default Recipe
