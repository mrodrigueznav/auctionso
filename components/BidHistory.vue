<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
    <h2 class="text-xl font-semibold mb-6 flex items-center">
      <ClockIcon class="w-5 h-5 mr-2 text-primary" />
      Historial de Ofertas
    </h2>
    
    <div class="space-y-4">
      <div v-if="bidHistory.length > 0">
        <div
          v-for="bid in bidHistory"
          :key="bid.id"
          class="group relative flex flex-col md:flex-row justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <div class="flex-1">
            <div class="flex items-center space-x-3 mb-2">
              <h3 class="font-medium">{{ bid.gameName }}</h3>
              <UiBidStatus :status="bid.status" />
            </div>
            <div class="flex items-center text-sm text-gray-600 dark:text-gray-400 space-x-4">
              <span class="flex items-center">
                <CalendarIcon class="w-4 h-4 mr-1" />
                {{ new Date(bid.date).toLocaleDateString() }}
              </span>
              <span class="flex items-center">
                <ClockIcon class="w-4 h-4 mr-1" />
                {{ new Date(bid.date).toLocaleTimeString() }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="text-gray-600 dark:text-gray-400">No bid history available.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { ClockIcon, CalendarIcon } from '@heroicons/vue/24/outline'
import BidStatus from './ui/BidStatus.vue';

const props = defineProps({
  bidHistory: {
    type: Array,
    required: true
  }
})
</script>