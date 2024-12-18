<template>
  <div class="container mx-auto px-4 py-8">
    <AdminBackButton />
    <h1 class="text-3xl font-bold mb-8">Gestión de Subastas en Vivo</h1>
    
    <div v-if="isLoading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
    </div>
    
    <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mb-8">
      <p class="text-red-600 dark:text-red-400">{{ error }}</p>
    </div>
    
    <div v-else>
      <CurrentAuction
        :current-item="currentAuctionItem"
        :available-games="availableGames"
        @start="startAuction"
        @end="endCurrentAuction"
        @bid-added="handleBidAdded"
        @bid-removed="handleBidRemoved"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useApi, type ApiItem } from '~/composables/useApi'
import CurrentAuction from '~/components/admin/live/CurrentAuction.vue'

const api = useApi()
const { isLoading, error } = api

// State
const items = ref<ApiItem[]>([])
const currentAuctionItem = ref<ApiItem | null>(null)

// Computed
const availableGames = computed(() => {
  return items.value.filter(item => !item.isSold && item.id !== currentAuctionItem.value?.id)
})

// Methods
const fetchItems = async () => {
  try {
    items.value = await api.getItems()
  } catch (e) {
    console.error('Failed to fetch items:', e)
  }
}

const startAuction = (gameId: number) => {
  const game = items.value.find(item => item.id === gameId)
  if (game) {
    currentAuctionItem.value = game
  }
}

const endCurrentAuction = async () => {
  if (!currentAuctionItem.value) return
  
  try {
    // Update the item status in the API
    await api.updateItem(currentAuctionItem.value.id, new FormData())
    
    // Refresh the items list
    await fetchItems()
    
    // Clear current auction
    currentAuctionItem.value = null
  } catch (e) {
    console.error('Error ending auction:', e)
  }
}

const handleBidAdded = async (bid: { bidder: string; amount: number }) => {
  if (!currentAuctionItem.value) return
  
  try {
    const formData = new FormData()
    formData.append('currentPrice', bid.amount.toString())
    
    await api.updateItem(currentAuctionItem.value.id, formData)
    currentAuctionItem.value.currentPrice = bid.amount
  } catch (e) {
    console.error('Error updating bid:', e)
  }
}

const handleBidRemoved = async (index: number) => {
  if (!currentAuctionItem.value) return
  
  try {
    // If there are remaining bids, update to the highest one
    const formData = new FormData()
    formData.append('currentPrice', currentAuctionItem.value.startingPrice.toString())
    
    await api.updateItem(currentAuctionItem.value.id, formData)
    currentAuctionItem.value.currentPrice = currentAuctionItem.value.startingPrice
  } catch (e) {
    console.error('Error removing bid:', e)
  }
}

// Initialize
onMounted(fetchItems)
</script>