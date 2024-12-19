import { defineStore } from 'pinia'
import type { User } from '~/types/user'
import { useApi } from '~/composables/useApi'

const { checkUser, createUser,  error, isLoading } = useApi()

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    isAuthenticated: false
  }),

  actions: {
    async login(credentials: { email: string; password: string; remember?: boolean }) {
      // Implement API login call here
      const response = await fetch('https://api.example.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })

      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      const data = await response.json()
      console.log('LOL', data)
      this.setAuth(data)
    },

    async loginWithGoogle() {
      // Implement Google OAuth login
      window.location.href = 'https://api.example.com/auth/google'
    },

    async loginWithFacebook() {
      // Implement Facebook OAuth login
      window.location.href = 'https://api.example.com/auth/facebook'
    },

    async getUser( uid: string, email: string, name: string, photoURL: string, accessToken: string) {
  
      const localUser = await checkUser(
        uid, 
        email,
        name,
        photoURL,
        accessToken,
      )
      return localUser

    },

    async createAppUser( uid: string, email: string, token: string) {
      const localUser = await createUser(
        uid, 
        email,
        token
      )
      return localUser
    },

    async logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      // Additional cleanup if needed
    },

    setAuth(data: { user: User; token: string }) {
      this.user = data.user
      this.token = data.token
      this.isAuthenticated = true
      // Use localstorage if client
      if (process.client) {
        localStorage.setItem('auth', 'true')
      }
    }
  }
})