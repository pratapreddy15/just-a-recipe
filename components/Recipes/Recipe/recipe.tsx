import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { ImageLoader, LoadableCard } from '../../'
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
    <li
      data-testid="recipe-card"
      data-recipe
      data-recipeid={props.id}
      data-categoryid={props.categoryId}
      className={classes.item}
    >
      <LoadableCard
        cardImage={{ imageSource: props.imageSource, imageTitle: props.name }}
        footer={
          <>
            <div className={classes.footerText}>
              <Link href={props.url}>
                <a data-testid="recipe-card-link" target="_blank" className={classes.footerLink} rel="noreferrer">
                  {props.name}
                </a>
              </Link>
            </div>
          </>
        }
      />
    </li>
  )
}

export default Recipe
