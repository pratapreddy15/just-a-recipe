import classes from './recipe-footer.module.css'

interface RecipeFooterProps {
  isRecipesLoading: boolean
  loadRecipesHandler: () => void
}

function RecipeFooter(props: RecipeFooterProps) {
  return (
    <div data-testid="recipe-footer" className={classes.recipesFooter}>
      <button
        data-testid="load-more-button"
        className={classes.loadMoreButton}
        onClick={props.loadRecipesHandler}
        disabled={props.isRecipesLoading}
      >
        {props.isRecipesLoading ? 'Loading...' : 'Load More Recipes'}
      </button>
    </div>
  )
}

export default RecipeFooter
