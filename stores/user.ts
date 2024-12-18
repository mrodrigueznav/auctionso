import { defineStore } from 'pinia'

interface UserState {
  isAdmin: boolean
  name: string
  avatar: string
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isAdmin: true, // For testing purposes, this user is an admin
    name: 'Felix',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
  }),
  
  actions: {
    logout() {
      this.isAdmin = false
    }
  }
})