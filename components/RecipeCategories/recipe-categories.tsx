import Link from 'next/link'
import React from 'react'
import { RecipeCategory } from '..'
import { RecipeCategoryGallery } from '../../types/recipe'

import classes from './recipe-categories.module.css'

function RecipeCategories(props: { categoriesGallery: RecipeCategoryGallery[]; addBrowseAllCategoriesLink: boolean }) {
  const { categoriesGallery } = props

  return (
    <div className={classes.recipeCategories}>
      <h3 className={classes.header}>Recipe Categories</h3>
      <div className={classes.grid}>
        <ul className={classes.category__list}>
          {categoriesGallery.map((cat, i) => (
            <li className={classes['category__list--item']} key={i}>
              <RecipeCategory
                key={cat.id}
                id={cat.id}
                category={cat.name.toLowerCase()}
                recipesCount={cat.recipesCount}
                photos={cat.galleryPhotos}
              />
            </li>
          ))}
        </ul>
      </div>
      {props.addBrowseAllCategoriesLink && (
        <div className={classes.linkBrowseCategories}>
          <Link href="/categories">
            <a>
              Browse all categories <div className={classes.rightArrow}>&#8594;</div>
            </a>
          </Link>
        </div>
      )}
    </div>
  )
}

export default RecipeCategories
