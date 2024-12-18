<template>
  <button
    @click="toggleTheme"
    class="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
    :title="$colorMode.value === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
  >
    <SunIcon v-if="$colorMode.value === 'dark'" class="w-6 h-6 text-gray-400" />
    <MoonIcon v-else class="w-6 h-6 text-gray-600" />
  </button>
</template>

<script setup lang="ts">
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'

const colorMode = useColorMode()

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>