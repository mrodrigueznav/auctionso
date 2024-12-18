import { ref } from 'vue'

export interface ApiItem {
  id: number
  name: string
  description: string
  startingPrice: number
  currentPrice: number
  msrp: number
  condition: string
  status: string
  createdAt: string
  updatedAt: string
  bggRating?: number
  playerCount?: string
  publisher?: string
  releaseYear?: number
  images?: string[]
}

interface CreateItemPayload {
  name: string
  description: string
  startingPrice: number
  msrp: number
  condition: string
}

interface UpdateItemPayload {
  description?: string
  startingPrice?: number
  msrp?: number
  condition?: string
  bggRating?: number
  playerCount?: string
  publisher?: string
  releaseYear?: number
  existingImages?: string[]
  images?: File[]
}

export function useApi() {
  // const baseUrl = 'http://localhost:3001/api'
  // const baseUrl = 'https://api.example
  const baseUrl = 'https://wontauct.onrender.com/api'
  const error = ref<string | null>(null)
  const isLoading = ref(false)

  const getItems = async (): Promise<ApiItem[]> => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await fetch(`${baseUrl}/items`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
      throw e
    } finally {
      isLoading.value = false
    }
  }

  const getItemsById = async (id: number): Promise<ApiItem> => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await fetch(`${baseUrl}/items/${id}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
      throw e
    } finally {
      isLoading.value = false
    }
  }

  const createItem = async (payload: FormData, headers: any) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await fetch(`${baseUrl}/items`, {
        method: 'POST',
        headers,
        body: payload,
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
      throw e
    } finally {
      isLoading.value = false
    }
  }

  const deleteItem = async (id: number) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await fetch(`${baseUrl}/items/${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
      throw e
    } finally {
      isLoading.value = false
    }
  }

  const updateItem = async (id: number, payload: FormData) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await fetch(`${baseUrl}/items/${id}`, {
        method: 'PUT',
        body: payload,
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
      throw e
    } finally {
      isLoading.value = false
    }
  }

  return {
    getItems,
    getItemsById,
    createItem,
    deleteItem,
    updateItem,
    error,
    isLoading
  }
}
