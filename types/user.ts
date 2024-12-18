export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  isAdmin: boolean
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  user: User
  token: string
}