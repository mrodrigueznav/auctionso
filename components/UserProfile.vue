<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <img
        :src="user.avatar"
        :alt="user.name"
        class="w-8 h-8 rounded-full"
      />
      <span class="text-gray-800 dark:text-gray-200">{{ user.name }}</span>
      <ChevronDownIcon class="w-4 h-4 text-gray-500" />
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50"
    >
      <NuxtLink
        v-if="user.isAdmin"
        to="/admin"
        class="flex items-center space-x-2 px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <Cog6ToothIcon class="w-5 h-5" />
        <span>Administración</span>
      </NuxtLink>
      <NuxtLink
        to="/profile"
        class="flex items-center space-x-2 px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <UserIcon class="w-5 h-5" />
        <span>Perfil</span>
      </NuxtLink>
      <div class="h-px bg-gray-200 dark:bg-gray-700 my-1"></div>
      <button
        @click="logout"
        class="flex items-center space-x-2 w-full px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <ArrowRightOnRectangleIcon class="w-5 h-5" />
        <span>Cerrar Sesión</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '~/stores/user'
import {
  ChevronDownIcon,
  Cog6ToothIcon,
  UserIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/vue/24/outline'

const userStore = useUserStore()
const user = computed(() => userStore)
const isOpen = ref(false)

const logout = () => {
  userStore.logout()
  isOpen.value = false
}

// Close dropdown when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target?.closest('.relative')) {
      isOpen.value = false
    }
  })
})
</script>