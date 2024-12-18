// Form-specific types
export interface GameFormData {
  name: string
  description: string
  startingPrice: number
  msrp: number
  condition: 'new' | 'like-new' | 'used' | 'damaged'
  bggRating: number
  playerCount: string
  publisher: string
  releaseYear: number
  imagesToDelete: number[]
  existingImages: Array<{ id: number; url: string }>
  newImages: File[]
}

export interface GameFormProps {
  initialData: GameFormData
  isLoading?: boolean
  error?: string | null
}