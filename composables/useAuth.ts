import { useAuthStore } from '~/stores/auth'

export function useAuth() {
  const auth = useAuthStore()
  const router = useRouter()

  const requireAuth = async () => {
    if (!auth.isAuthenticated) {
      return navigateTo('/auth/login')
    }
  }

  const requireGuest = async () => {
    if (auth.isAuthenticated) {
      return navigateTo('/')
    }
  }

  return {
    requireAuth,
    requireGuest
  }
}