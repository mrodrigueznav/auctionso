<template>
  <div class="bg-red-600 dark:bg-red-800 text-white py-2">
    <div class="container mx-auto px-4 flex items-center justify-center space-x-4">
      <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L9 9H15L12 2ZM12 10L7 22H17L12 10ZM11 12H13V16H11V12ZM11 17H13V19H11V17Z"/>
      </svg>
      <span class="font-medium">¡Subasta Navideña 2024!</span>
      <CountdownTimer />
      <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L9 9H15L12 2ZM12 10L7 22H17L12 10ZM11 12H13V16H11V12ZM11 17H13V19H11V17Z"/>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import CountdownTimer from './CountdownTimer.vue'
</script>