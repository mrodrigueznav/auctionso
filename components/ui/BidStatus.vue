<template>
  <span
    class="px-2 py-1 text-sm font-medium rounded-full"
    :class="statusClasses"
  >
    {{ statusText }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  status: 'won' | 'lost' | 'ongoing'
}>()

const statusClasses = computed(() => ({
  'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400': props.status === 'won',
  'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400': props.status === 'lost',
  'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400': props.status === 'ongoing'
}))

const statusText = computed(() => {
  switch (props.status) {
    case 'won':
      return 'Ganada'
    case 'lost':
      return 'Perdida'
    case 'ongoing':
      return 'En curso'
    default:
      return ''
  }
})
</script>