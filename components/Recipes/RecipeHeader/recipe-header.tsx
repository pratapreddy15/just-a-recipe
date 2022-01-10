import classes from './recipe-header.module.css'

interface RecipeHeaderProps {
  totalRecipesDisplayed: number
  totalRecipes: number
}

function RecipeHeader(props: RecipeHeaderProps) {
  return (
    <div data-testid="recipe-header" className={classes.headerText}>
      <h4>{`Showing ${props.totalRecipesDisplayed} recipes of ${props.totalRecipes}`}</h4>
    </div>
  )
}

export default RecipeHeader
