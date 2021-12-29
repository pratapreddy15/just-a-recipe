import classes from './recipe-footer.module.css'

interface RecipeFooterProps {
  isRecipesLoading: boolean
  loadRecipesHandler: () => void
}

function RecipeFooter(props: RecipeFooterProps) {
  return (
    <div className={classes.recipesFooter}>
      <button className={classes.loadMoreButton} onClick={props.loadRecipesHandler} disabled={props.isRecipesLoading}>
        {props.isRecipesLoading ? 'Loading...' : 'Load More Recipes'}
      </button>
    </div>
  )
}

export default RecipeFooter
