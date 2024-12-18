<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Subasta Wontolla Decembrina</h1>
    
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
    </div>
    
    <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mb-8">
      <p class="text-red-600 dark:text-red-400">{{ error }}</p>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
      <ClientOnly>
        <GameCard
          v-for="item in items"
          :key="item.id"
          :game="{
            id: item.id,
            name: item.name,
            description: item.description,
            startingPrice: item.startingPrice,
            currentPrice: item.currentPrice,
            retailPrice: item.msrp,
            condition: item.condition,
            isSold: item.status === 'sold',
            images: item.images,
            playerCount: item.playerCount,
            language: item.language,
            releaseYear: item.releaseYear,
            publisher: item.publisher,
            bggRating: item.bggRating,
          }"
        />
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useApi, type ApiItem } from '~/composables/useApi'

const { getItems, error, isLoading } = useApi()
const items = ref<ApiItem[]>([])

onMounted(async () => {
  try {
    items.value = await getItems()
    console.log(items.value)
  } catch (e) {
    console.error('Failed to fetch items:', e)
  }
})
</script>