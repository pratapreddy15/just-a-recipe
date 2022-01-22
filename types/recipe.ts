export interface RecipeCategory {
  id: string
  name: string
  imageSource: string
  isFeatured: boolean
  tags: string[]
}

export interface RecipeCategoryWithCount extends RecipeCategory {
  recipesCount: number
}

export interface RecipeDetail {
  id: string
  categoryId: string
  name: string
  url: string
  imageSource: string
}

export interface RecipeCategoryGallery {
  id: string
  name: string
  recipesCount: number
  galleryPhotos: { imageSource: string; imageTitle: string }[]
}

export interface RecipeSearchResult {
  count: number
  recipes: RecipeDetail[]
}
