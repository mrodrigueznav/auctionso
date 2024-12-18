<template>
  <NuxtLink :to="`/item/${game.id}`" class="block w-full max-w-[360px]">
    <div class="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden h-[600px] transform hover:scale-102 transition-transform">
      <!-- Top half with image -->
      <div class="h-[300px]">
        <swiper
          :modules="[SwiperNavigation, SwiperPagination]"
          :navigation="true"
          :pagination="{ clickable: true }"
          class="h-full"
        >
          <swiper-slide v-for="gameImage  in game.images" :key="gameImage.id">
            <img :src="gameImage.url" :alt="game.name" class="w-full h-full object-cover" />
          </swiper-slide>
        </swiper>
      </div>
      
      <!-- Bottom half with game info -->
      <div class="p-4 h-[300px] flex flex-col">
        <h3 class="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-white">{{ game.name }}</h3>
        
        <!-- BGG Rating -->
        <div class="flex justify-center mb-4">
          <BGGRating :rating="game.bggRating" />
        </div>
        
        <div class="flex-1">
          <div class="grid grid-cols-2 gap-2 text-sm mb-3">
            <div>
              <span class="text-gray-600 dark:text-gray-400">{{ t('Players') }}:</span>
              <span class="ml-1 text-gray-900 dark:text-gray-200">{{ game.playerCount }}</span>
            </div>
            <div>
              <span class="text-gray-600 dark:text-gray-400">{{ t('Language') }}:</span>
              <span class="ml-1 text-gray-900 dark:text-gray-200">{{ fullLanguage }}</span>
            </div>
            <div>
              <span class="text-gray-600 dark:text-gray-400">{{ t('Publisher') }}:</span>
              <span class="ml-1 text-gray-900 dark:text-gray-200">{{ t(game.publisher) }}</span>
            </div>
            <div>
              <span class="text-gray-600 dark:text-gray-400">{{ t('Condition') }}:</span>
              <span class="ml-1 text-gray-900 dark:text-gray-200">{{ fullCondition }}</span>
            </div>
          </div>
          
          <div class="flex justify-between items-center text-sm mb-3">
            <div>
              <span class="text-gray-600 dark:text-gray-400">{{ t('Retail') }}:</span>
              <span class="ml-1 font-medium text-gray-900 dark:text-gray-200">${{ game.retailPrice }}</span>
            </div>
            <div>
              <span class="text-gray-600 dark:text-gray-400">{{ t('Starting') }}:</span>
              <span class="ml-1 font-medium text-gray-900 dark:text-gray-200">${{ game.startingPrice }}</span>
            </div>
          </div>
        </div>
        
        <div v-if="game.isSold" class="bg-red-100 dark:bg-red-900/20 p-2 rounded text-sm mt-auto">
          <p class="font-medium text-center text-red-700 dark:text-red-300">
            {{ t('Sold for') }} ${{ game.soldFor }}
          </p>
        </div>
        <div v-else class="bg-green-100 dark:bg-green-900/20 p-2 rounded text-sm mt-auto">
          <p class="font-medium text-center text-green-700 dark:text-green-300">
            {{ t('Current bid') }}: ${{ game.currentPrice }}
          </p>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation as SwiperNavigation, Pagination as SwiperPagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import type { BoardGame } from '~/types/boardgame'

const { t } = useLocale()
const props = defineProps<{
  game: BoardGame
}>()

const fullLanguage = computed(() => {
  switch (props.game.language) {
    case 'en':
      return t('English')
    case 'es':
      return t('Spanish')
    default:
      return t('Unknown')
  }
})

const fullCondition = computed(() => {
  switch (props.game.condition) {
    case 'new':
      return t('New')
    case 'like-new':
      return t('Like New')
    case 'very-good':
      return t('Very Good')
    case 'good':
      return t('Good')
    default:
      return t('Unknown')
  }
})

</script>

<style scoped>
.hover\:scale-102:hover {
  transform: scale(1.02);
}
</style>