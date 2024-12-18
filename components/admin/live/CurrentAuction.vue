<template>
  <div class="space-y-6">
    <!-- Current Auction Header -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-semibold mb-4">Subasta Actual</h2>
      
      <div v-if="currentItem" class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-xl font-medium">{{ currentItem.name }}</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Oferta actual: ${{ currentItem.currentPrice }}
            </p>
          </div>
          <button
            @click="$emit('end')"
            class="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <PlayIcon class="w-5 h-5 mr-2" />
            Iniciar Subasta
          </button>
        </div>
        
        <!-- Game Information -->
        <GameInfo :game="currentItem" />
        
        <!-- Bidding Controls -->
        <AuctionControls
          :bids="bids"
          @add="handleAddBid"
          @remove="handleRemoveBid"
        />
      </div>
      
      <div v-else>
        <p class="text-gray-500 dark:text-gray-400 mb-4">No hay subasta activa</p>
        <div class="space-y-4">
          <select
            v-model="selectedGameId"
            class="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">Seleccionar juego...</option>
            <option
              v-for="game in availableGames"
              :key="game.id"
              :value="game.id"
            >
              {{ game.name }}
            </option>
          </select>
          
          <button
            @click="startAuction"
            :disabled="!selectedGameId"
            class="inline-flex items-center px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            <PlayIcon class="w-5 h-5 mr-2" />
            Iniciar Subasta
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PlayIcon } from '@heroicons/vue/24/outline'
import type { ApiItem } from '~/composables/useApi'
import AuctionControls from './AuctionControls.vue'
import GameInfo from './GameInfo.vue'

interface Bid {
  bidder: string
  amount: number
}

const props = defineProps<{
  currentItem: ApiItem | null
  availableGames: ApiItem[]
}>()

const emit = defineEmits<{
  (e: 'start', gameId: number): void
  (e: 'end'): void
  (e: 'bid-added', bid: Bid): void
  (e: 'bid-removed', index: number): void
}>()

const selectedGameId = ref('')
const bids = ref<Bid[]>([])

const startAuction = () => {
  if (selectedGameId.value) {
    emit('start', parseInt(selectedGameId.value))
    selectedGameId.value = ''
    bids.value = []
  }
}

const handleAddBid = (bid: Bid) => {
  bids.value.unshift(bid)
  bids.value.sort((a, b) => b.amount - a.amount)
  emit('bid-added', bid)
}

const handleRemoveBid = (index: number) => {
  bids.value.splice(index, 1)
  emit('bid-removed', index)
}
</script>