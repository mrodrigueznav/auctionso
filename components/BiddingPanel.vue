<template>
  <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
    <div class="mb-4">
      <h3 class="text-xl font-bold">{{ t('Current bid') }}: ${{ game.currentPrice }}</h3>
    </div>
    
    <div class="space-y-4">
      <button
        @click="quickBid"
        class="w-full bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded transition-colors"
      >
        {{ t('Quick Bid') }} (+$20): ${{ game.currentPrice + 20 }}
      </button>
      
      <div class="flex space-x-2">
        <input
          v-model="customAmount"
          type="number"
          class="flex-1 border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
          :min="game.currentPrice + 1"
          :placeholder="t('Enter custom amount')"
        />
        <button
          @click="submitCustomBid"
          class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
        >
          {{ t('Bid') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuctionStore } from '~/stores/auction'

const { t } = useLocale()
const props = defineProps(['game'])
const store = useAuctionStore()
const customAmount = ref('')

const quickBid = () => {
  store.updateBid(props.game.id, props.game.currentPrice + 20)
}

const submitCustomBid = () => {
  if (customAmount.value && Number(customAmount.value) > props.game.currentPrice) {
    store.updateBid(props.game.id, Number(customAmount.value))
    customAmount.value = ''
  }
}
</script>