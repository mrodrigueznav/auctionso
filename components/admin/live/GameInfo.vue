<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Image Gallery -->
      <div class="h-[300px]">
        <swiper
          :modules="[SwiperNavigation, SwiperPagination]"
          :navigation="true"
          :pagination="{ clickable: true }"
          class="h-full"
        >
          <swiper-slide v-for="image in game.images" :key="image.id">
            <img 
              :src="image.url" 
              :alt="game.name"
              class="w-full h-full object-cover rounded-lg"
            />
          </swiper-slide>
        </swiper>
      </div>

      <!-- Game Details -->
      <div class="space-y-4">
        <div class="flex justify-between items-start">
          <h3 class="text-xl font-bold">{{ game.name }}</h3>
          <BGGRating :rating="game.bggRating || 0" />
        </div>

        <p class="text-gray-600 dark:text-gray-400">{{ game.description }}</p>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <span class="text-gray-500 dark:text-gray-400">{{ t('Players') }}:</span>
            <span class="ml-1">{{ game.playerCount }}</span>
          </div>
          <div>
            <span class="text-gray-500 dark:text-gray-400">{{ t('Publisher') }}:</span>
            <span class="ml-1">{{ game.publisher }}</span>
          </div>
          <div>
            <span class="text-gray-500 dark:text-gray-400">{{ t('Condition') }}:</span>
            <span class="ml-1">{{ t(game.condition) }}</span>
          </div>
          <div>
            <span class="text-gray-500 dark:text-gray-400">{{ t('Language') }}:</span>
            <span class="ml-1">{{ t(game.language === 'es' ? 'Spanish' : 'English') }}</span>
          </div>
        </div>

        <div class="flex justify-between items-center pt-4 border-t dark:border-gray-700">
          <div>
            <span class="text-gray-500 dark:text-gray-400">{{ t('Retail') }}:</span>
            <span class="ml-1 text-lg font-medium">${{ game.msrp }}</span>
          </div>
          <div>
            <span class="text-gray-500 dark:text-gray-400">{{ t('Starting') }}:</span>
            <span class="ml-1 text-lg font-medium">${{ game.startingPrice }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation as SwiperNavigation, Pagination as SwiperPagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import type { ApiItem } from '~/composables/useApi'

const { t } = useLocale()

defineProps<{
  game: ApiItem
}>()
</script>