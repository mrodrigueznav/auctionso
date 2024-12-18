<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-4">
    <h3 class="text-lg font-semibold mb-4">Control de Ofertas</h3>
    
    <div class="flex gap-4">
      <input
        v-model="newBid.amount"
        type="number"
        placeholder="Monto de la oferta"
        class="flex-1 px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
      />
      <input
        v-model="newBid.bidder"
        type="text"
        placeholder="Nombre del ofertante"
        class="flex-1 px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
      />
      <button
        @click="addBid"
        class="inline-flex items-center px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
      >
        <PlusIcon class="w-5 h-5 mr-2" />
        Agregar Oferta
      </button>
    </div>
    
    <!-- Bid History -->
    <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
      <h4 class="font-medium mb-3">Historial de Ofertas</h4>
      <div class="space-y-2">
        <div
          v-for="(bid, index) in bids"
          :key="index"
          class="flex justify-between items-center"
        >
          <span>{{ bid.bidder }}</span>
          <div class="flex items-center space-x-2">
            <span class="font-medium">${{ bid.amount }}</span>
            <button
              @click="removeBid(index)"
              class="text-red-500 hover:text-red-600"
            >
              <TrashIcon class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TrashIcon, PlusIcon } from '@heroicons/vue/24/outline'

interface Bid {
  bidder: string
  amount: number
}

const props = defineProps<{
  bids: Bid[]
}>()

const emit = defineEmits<{
  (e: 'add', bid: Bid): void
  (e: 'remove', index: number): void
}>()

const newBid = ref<Bid>({ bidder: '', amount: 0 })

const addBid = () => {
  if (newBid.value.bidder && newBid.value.amount > 0) {
    emit('add', { ...newBid.value })
    newBid.value = { bidder: '', amount: 0 }
  }
}

const removeBid = (index: number) => {
  emit('remove', index)
}
</script>