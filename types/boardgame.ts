export interface BoardGame {
  id: number
  name: string
  images: string[]
  description: string
  synopsis: string
  condition: string
  retailPrice: number
  startingPrice: number
  currentPrice: number
  isSold: boolean
  soldFor?: number
  playerCount: string
  playTime: string
  weight: string
  minAge: string
  releaseYear: number
  publisher: string
  bggRating: number
  bggId?: string
  language: string
  paymentStatus?: 'pending' | 'paid'
  shippingStatus?: 'pending' | 'shipped' | 'delivered'
  notes?: string
}


export interface images {
  id: number
  url: string
}