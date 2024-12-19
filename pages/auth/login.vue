<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <WontollaLogo class="mx-auto" />
        <h2 class="mt-6 text-3xl font-bold">Iniciar Sesión</h2>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          O <NuxtLink to="/auth/register" class="text-primary hover:text-primary-dark">crear una cuenta nueva</NuxtLink>
        </p>
      </div>

      <div class="mt-8 space-y-6">
        <!-- Social Login Button -->
        <div class="space-y-4">
          <AuthGoogleSignInButton />
        </div>

        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-gray-50 dark:bg-gray-900 text-gray-500">O</span>
          </div>
        </div>

        <!-- Email Login Form -->
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <UiFormField label="Email" :error="errors.email">
            <input
              v-model="form.email"
              type="email"
              required
              class="form-input"
              :class="{ 'border-red-500': errors.email }"
            />
          </UiFormField>

          <UiFormField label="Contraseña" :error="errors.password">
            <input
              v-model="form.password"
              type="password"
              required
              class="form-input"
              :class="{ 'border-red-500': errors.password }"
            />
          </UiFormField>

          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input type="checkbox" class="form-checkbox" v-model="form.remember" />
              <span class="ml-2 text-sm">Recordarme</span>
            </label>

            <!-- <NuxtLink to="/auth/forgot-password" class="text-sm text-primary hover:text-primary-dark">
              ¿Olvidaste tu contraseña?
            </NuxtLink> -->
          </div>

          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-primary hover:bg-primary-dark transition-colors"
            :disabled="isLoading"
          >
            <span v-if="isLoading">Iniciando sesión...</span>
            <span v-else>Iniciar Sesión</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useFirebaseAuth } from '~/composables/useFirebaseAuth'

definePageMeta({
  layout: 'empty'
})

const auth = useAuthStore()
const { signInWithEmail, isLoading, error } = useFirebaseAuth()

const form = reactive({
  email: '',
  password: '',
  remember: false
})

const errors = reactive({
  email: '',
  password: ''
})

const handleSubmit = async () => {
  errors.email = ''
  errors.password = ''
  isLoading.value = true

  try {
    await signInWithEmail(form.email, form.password)
    // router.push('/')
  } catch (error: any) {
    if (error.field) {
      errors[error.field] = error.message
    }
  } finally {
    isLoading.value = false
  }
}
</script>