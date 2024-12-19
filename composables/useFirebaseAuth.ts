import { updateProfile, GoogleAuthProvider, signInWithPopup, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import type { User as FirebaseUser } from 'firebase/auth'
import { useAuthStore } from '~/stores/auth'
import { useUserStore } from '~/stores/user'

export function useFirebaseAuth() {
  const { $firebase } = useNuxtApp()
  const authStore = useAuthStore()
  const userStore = useUserStore()
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
          token: firebaseUser.accessToken  // Firebase handles tokens internally
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
      const userExists = await authStore.getUser(
        result.user?.uid || '',
        result.user?.email || '',
        result.user?.displayName || '',
        result.user?.photoURL || '',
        result.user?.accessToken || ''
      )
      console.log(userExists)

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

  const signInWithEmail = async (email: string, password: string) => {
    isLoading.value = true
    error.value = null
    try {
      const result = await signInWithEmailAndPassword($firebase.auth, email, password)
      // await useApi.
      
      if (result.user) {
        router.push('/')
      }
    } catch (e: any) {
      error.value = e.message
      console.error('Email sign-in error:', e)
    } finally {
      isLoading.value = false
    }
  }

  const signUpWithEmail = async (email: string, password: string) => {
    isLoading.value = true
    error.value = null
    // console.log('Hola', $firebase.auth)
    try {
      const result = await createUserWithEmailAndPassword($firebase.auth, email, password)
      
      if (result) {
      const appUser = await authStore.createAppUser(result.user.uid, result.user.email, result.user.accessToken)
      console.log(appUser)
        await updateUserProfile(
          appUser.newUser.username, 
          'https://mykindofmeeple.com/wp-content/uploads/2019/01/many-meeples-1602-27042020.jpg.webp')

        router.push('/')
      }
    } catch (e: any) {
      error.value = e.message
      console.error('Email sign-up error:', e)
    } finally {
      isLoading.value = false
    }
  }

  const updateUserProfile = async (displayName: string, photoURL: string) => {
    if (user.value) {
      isLoading.value = true
      error.value = null
      try {
        await updateProfile(user.value, { displayName, photoURL })
        // Update auth store with new user info
        authStore.setAuth({
          user: {
            id: user.value.uid,
            name: displayName,
            email: user.value.email || '',
            avatar: photoURL,
            isAdmin: false, // Set based on your requirements
            createdAt: user.value.metadata.creationTime || '',
            updatedAt: user.value.metadata.lastSignInTime || ''
          },
          token: ''  // Firebase handles tokens internally
        })
      } catch (e: any) {
        error.value = e.message
        console.error('Profile update error:', e)
      } finally {
        isLoading.value = false
      }
    }
  }

  const logout = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      await signOut($firebase.auth)
      authStore.logout()
      userStore.logout()
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
    signInWithEmail,
    signUpWithEmail,
    logout
  }
}