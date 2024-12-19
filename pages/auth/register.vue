<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
    <div class="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Register</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 dark:text-gray-300">Email</label>
          <input
            v-model="form.email"
            type="email"
            id="email"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-gray-300"
            required
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700 dark:text-gray-300">Password</label>
          <input
            v-model="form.password"
            type="password"
            id="password"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-gray-300"
            required
          />
        </div>
        <div v-if="error" class="mb-4 text-red-500">{{ error }}</div>
        <button
          type="submit"
          class="w-full py-2 px-4 bg-primary text-white rounded-md shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          :disabled="isLoading"
        >
          Register
        </button>
      </form>
      <p class="mt-4 text-gray-600 dark:text-gray-400">
        Already have an account?
        <NuxtLink to="/auth/login" class="text-primary hover:underline">Login</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useFirebaseAuth } from '~/composables/useFirebaseAuth'

const { signUpWithEmail, isLoading, error } = useFirebaseAuth()

definePageMeta({
  layout: 'empty'
})

const form = ref({
  email: '',
  password: ''
})

const handleSubmit = async () => {
  try {
    await signUpWithEmail(form.value.email, form.value.password)
  } catch (e) {
    console.error('Registration error:', e)
  }
}
</script>