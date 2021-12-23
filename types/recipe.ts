export interface RecipeCategory {
  id: string
  name: string
  isFeatured: boolean
  tags: string[]
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
  galleryPhotos: { imageSource: string; imageTitle: string }[]
}
