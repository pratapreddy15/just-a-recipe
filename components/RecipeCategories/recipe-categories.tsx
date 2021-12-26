import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { RecipeCategory, LoadableCard } from '..'
import { RecipeCategoryGallery } from '../../types/recipe'

import classes from './recipe-categories.module.css'

function RecipeCategories(props: { categoriesGallery: RecipeCategoryGallery[]; addBrowseAllCategoriesLink: boolean }) {
  const router = useRouter()
  const { categoriesGallery } = props

  const isHomePage = router.pathname === '/'

  const categoryHeaderText = isHomePage ? 'Recipe Categories' : `${props.categoriesGallery.length} Recipe Categories`

  return (
    <div className={classes.recipeCategories}>
      <h3 className={classes.header}>{categoryHeaderText}</h3>
      <div className={classes.grid}>
        <ul className={classes.category__list}>
          {categoriesGallery.map((cat, i) => {
            const footerText = `${new Intl.NumberFormat().format(cat.recipesCount)} ${cat.name}`

            return (
              <li className={classes['category__list--item']} key={i}>
                {isHomePage ? (
                  <RecipeCategory
                    key={cat.id}
                    id={cat.id}
                    category={cat.name.toLowerCase()}
                    recipesCount={cat.recipesCount}
                    photos={cat.galleryPhotos}
                  />
                ) : (
                  <LoadableCard
                    cardImage={cat.galleryPhotos[0]}
                    footer={
                      <>
                        <div className={classes.footerText}>{footerText}</div>
                        <div>
                          <Link href={`/categories/${cat.id}`}>
                            <a className={classes.footerLink}>
                              <img src="./images/btn-browse-recipes.svg" alt="Browse Recipes" />
                            </a>
                          </Link>
                        </div>
                      </>
                    }
                  />
                )}
              </li>
            )
          })}
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
