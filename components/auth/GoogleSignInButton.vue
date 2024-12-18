<template>
  <button
    @click="handleSignIn"
    :disabled="isLoading"
    class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
  >
    <img src="/icons/google.svg" alt="Google" class="w-5 h-5 mr-3" />
    <span>{{ isLoading ? 'Iniciando sesión...' : 'Continuar con Google' }}</span>
  </button>
</template>

<script setup lang="ts">
const { signInWithGoogle, isLoading, error } = useFirebaseAuth()

const handleSignIn = async () => {
  await signInWithGoogle()
  if (error.value) {
    // Handle error (you might want to emit this to the parent)
    console.error('Sign in error:', error.value)
  }
}
</script>