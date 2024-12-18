<template>
  <div class="relative inline-flex">
    <div class="flex items-center space-x-2 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1.5 rounded-full">
      <div class="flex">
        <template v-for="i in 5" :key="i">
          <StarIcon
            :class="[
              'w-5 h-5',
              i <= Math.round(rating / 2)
                ? 'text-yellow-400'
                : 'text-gray-300 dark:text-gray-600'
            ]"
            :fill="i <= Math.round(rating / 2) ? 'currentColor' : 'none'"
            class="stroke-2"
          />
        </template>
      </div>
      <span class="text-sm font-semibold text-yellow-700 dark:text-yellow-400">
        {{ rating.toFixed(1) }}/10
      </span>
    </div>
    <div class="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
      BGG
    </div>
  </div>
</template>

<script setup lang="ts">
import { StarIcon } from '@heroicons/vue/24/solid'

defineProps<{
  rating: number
}>()
</script>