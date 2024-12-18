<template>
  <div class="inline-flex">
    <div class="relative">
      <div class="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold text-2xl shadow-lg">
        {{ displayRating }}
        <span class="absolute -top-2 -right-2 bg-yellow-400 text-blue-900 text-xs font-bold px-1.5 py-0.5 rounded-full shadow-md">
          BGG
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  rating: number | null
}>()

const displayRating = computed(() => {
  if (props.rating === null || props.rating < 0) {
    return 'N/A'
  }
  return props.rating.toFixed(1)
})
</script>