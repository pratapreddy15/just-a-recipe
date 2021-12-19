export interface RecipeCategory {
  id: string
  name: string
  isFeatured: boolean
  tags: string[]
}

export interface RecipeCategoryGallery {
  id: string
  name: string
  galleryPhotos: { imageSource: string; imageTitle: string }[]
}
