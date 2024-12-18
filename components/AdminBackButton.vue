<template>
  <NuxtLink
    to="/admin"
    class="inline-flex items-center space-x-2 mb-6 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
  >
    <ArrowLeftIcon class="w-5 h-5" />
    <span>Volver al Panel de Administración</span>
  </NuxtLink>
</template>

<script setup lang="ts">
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
</script>