import type { GameFormData } from '~/types/game-form'

export function createGameFormData(formData: GameFormData): FormData {
  const data = new FormData()
  
  // Add basic fields
  data.append('name', formData.name)
  data.append('description', formData.description)
  data.append('startingPrice', formData.startingPrice.toString())
  data.append('msrp', formData.msrp.toString())
  data.append('condition', formData.condition)
  data.append('bggRating', formData.bggRating.toString())
  data.append('playerCount', formData.playerCount)
  data.append('publisher', formData.publisher)
  data.append('releaseYear', formData.releaseYear.toString())
  
  // Add image-related fields
  if (formData.imagesToDelete.length > 0) {
    data.append('imagesToDelete', JSON.stringify(formData.imagesToDelete))
  }
  
  // Add URLs of existing images that aren't being deleted
  const remainingImages = formData.existingImages
    .filter(img => !formData.imagesToDelete.includes(img.id))
    .map(img => img.url)
  
  if (remainingImages.length > 0) {
    data.append('existingImages', JSON.stringify(remainingImages))
  }
  
  // Add new image files
  formData.newImages.forEach((file) => {
    data.append('images', file)
  })
  
  return data
}