import { Recipe } from '../'

import classes from './recipes.module.css'

interface RecipesProps {
  recipes: Array<{
    id: string
    categoryId: string
    name: string
    imageSource: string
    url: string
  }>
}

function Recipes(props: RecipesProps) {
  const { recipes } = props

  return (
    <div className={classes.recipes}>
      <ul className={classes.list}>
        {recipes.map((rec) => (
          <Recipe
            key={rec.id}
            id={rec.id}
            categoryId={rec.categoryId}
            name={rec.name}
            imageSource={rec.imageSource}
            url={rec.url}
          />
        ))}
      </ul>
    </div>
  )
}

export default Recipes
