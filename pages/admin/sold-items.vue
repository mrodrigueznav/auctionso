<template>
  <div class="container mx-auto px-4 py-8">
    <AdminBackButton />
    <h1 class="text-3xl font-bold mb-8">Gestión de Items Vendidos</h1>
    
    <div class="grid gap-6">
      <div
        v-for="game in soldGames"
        :key="game.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
      >
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-xl font-semibold mb-2">{{ game.name }}</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Vendido por: ${{ game.soldFor }}
            </p>
          </div>
          
          <div class="space-y-2">
            <!-- Payment Status -->
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-600 dark:text-gray-400">Pago:</span>
              <select
                v-model="game.paymentStatus"
                class="px-3 py-1 rounded border dark:bg-gray-700 dark:border-gray-600"
                @change="updateGameStatus(game)"
              >
                <option value="pending">Pendiente</option>
                <option value="paid">Pagado</option>
              </select>
            </div>
            
            <!-- Shipping Status -->
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-600 dark:text-gray-400">Envío:</span>
              <select
                v-model="game.shippingStatus"
                class="px-3 py-1 rounded border dark:bg-gray-700 dark:border-gray-600"
                @change="updateGameStatus(game)"
              >
                <option value="pending">Pendiente</option>
                <option value="shipped">Enviado</option>
                <option value="delivered">Entregado</option>
              </select>
            </div>
          </div>
        </div>
        
        <!-- Notes Section -->
        <div class="mt-4">
          <textarea
            v-model="game.notes"
            placeholder="Notas adicionales..."
            class="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:border-gray-600"
            rows="2"
            @change="updateGameStatus(game)"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuctionStore } from '~/stores/auction'

const store = useAuctionStore()

// Extend the BoardGame type with additional properties for sold items
const soldGames = computed(() => {
  return store.games
    .filter(game => game.isSold)
    .map(game => ({
      ...game,
      paymentStatus: game.paymentStatus || 'pending',
      shippingStatus: game.shippingStatus || 'pending',
      notes: game.notes || ''
    }))
})

const updateGameStatus = (game: any) => {
  // In a real application, this would update the backend
  console.log('Updated game status:', game)
}
</script>