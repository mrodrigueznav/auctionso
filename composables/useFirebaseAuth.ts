import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import type { User as FirebaseUser } from 'firebase/auth'
import { useAuthStore } from '~/stores/auth'

export function useFirebaseAuth() {
  const { $firebase } = useNuxtApp()
  const authStore = useAuthStore()
  const router = useRouter()

  const user = ref<FirebaseUser | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Initialize auth state
  onMounted(() => {
    $firebase.auth.onAuthStateChanged((firebaseUser) => {
      user.value = firebaseUser
      if (firebaseUser) {
        // Update auth store with user info
        authStore.setAuth({
          user: {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || '',
            email: firebaseUser.email || '',
            avatar: firebaseUser.photoURL || '',
            isAdmin: false, // Set based on your requirements
            createdAt: firebaseUser.metadata.creationTime || '',
            updatedAt: firebaseUser.metadata.lastSignInTime || ''
          },
          token: ''  // Firebase handles tokens internally
        })
      }
    })
  })

  const signInWithGoogle = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup($firebase.auth, provider)
      
      if (result.user) {
        router.push('/')
      }
    } catch (e: any) {
      error.value = e.message
      console.error('Google sign-in error:', e)
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      await signOut($firebase.auth)
      authStore.logout()
      router.push('/auth/login')
    } catch (e: any) {
      error.value = e.message
      console.error('Logout error:', e)
    } finally {
      isLoading.value = false
    }
  }

  return {
    user,
    isLoading,
    error,
    signInWithGoogle,
    logout
  }
}