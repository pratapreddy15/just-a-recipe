import Image from 'next/image'
import Link from 'next/link'

import classes from './recipe.module.css'

interface RecipeProps {
  id: string
  categoryId: string
  name: string
  imageSource: string
  url: string
}

function Recipe(props: RecipeProps) {
  return (
    <li className={classes.item}>
      <div className={classes.photo}>
        <Image className={classes.image} src={props.imageSource} layout="fill" alt={props.name} />
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
