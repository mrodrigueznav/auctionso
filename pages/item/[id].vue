<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
    </div>
    <div v-else-if="game" class="max-w-4xl mx-auto">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <!-- Image Gallery -->
        <div class="h-[400px]">
          <swiper
            :modules="[SwiperNavigation, SwiperPagination]"
            :navigation="true"
            :pagination="{ clickable: true }"
            class="h-full"
          >
            <swiper-slide v-for="image in game.images" :key="image">
              <img 
                :src="image.url" 
                :alt="game.name" 
                class="w-full h-full object-cover cursor-pointer" 
                @click="openImageModal(image.url)"
              />
            </swiper-slide>
          </swiper>
        </div>

        <!-- Game Info -->
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <h1 class="text-3xl font-bold">{{ game.name }}</h1>
            <BGGRating :rating="game.bggRating" />
          </div>
          
          <p class="text-gray-600 dark:text-gray-300 mb-6">{{ game.description }}</p>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <span class="text-gray-500 dark:text-gray-400">{{ t('Players') }}:</span>
              <span class="ml-1">{{ game.playerCount }}</span>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400">{{ t('Condition') }}:</span>
              <span class="ml-1">{{ t(game.condition) }}</span>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400">{{ t('Publisher') }}:</span>
              <span class="ml-1">{{ game.publisher }}</span>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400">{{ t('Year') }}:</span>
              <span class="ml-1">{{ game.releaseYear }}</span>
            </div>
          </div>

          <div class="flex justify-between items-center mb-6">
            <div>
              <span class="text-gray-500 dark:text-gray-400">{{ t('Retail') }}:</span>
              <span class="ml-1 text-xl font-medium">${{ game.msrp }}</span>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400">{{ t('Starting') }}:</span>
              <span class="ml-1 text-xl font-medium">${{ game.startingPrice }}</span>
            </div>
          </div>

          <div v-if="game.isSold" class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
            <p class="text-red-700 dark:text-red-300 font-medium text-center text-xl">
              {{ t('Sold for') }} ${{ game.soldFor }}
            </p>
          </div>
          <div v-else>
            <BiddingPanel :game="game" />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-12">
      <p class="text-gray-500 dark:text-gray-400">{{ t('Item not found') }}</p>
    </div>

    <!-- Image Modal -->
    <ImageModal
      :show="showImageModal"
      :image-src="selectedImage"
      :image-alt="game?.name || ''"
      @close="closeImageModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLocale } from '~/composables/useLocale'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation as SwiperNavigation, Pagination as SwiperPagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useApi, type ApiItem } from '~/composables/useApi'
import BGGRating from '~/components/BGGRating.vue'
import BiddingPanel from '~/components/BiddingPanel.vue'
import ImageModal from '~/components/ImageModal.vue'

const { getItemsById, isLoading } = useApi()
const game = ref<ApiItem | null>(null)

const { t } = useLocale()
const route = useRoute()

onMounted(async () => {
  try {
    const id = parseInt(route.params.id as string)
    const item = await getItemsById(id)
    game.value = item || null
  } catch (e) {
    console.error('Failed to fetch items:', e)
  }
})

// Image modal state
const showImageModal = ref(false)
const selectedImage = ref('')

const openImageModal = (image: string) => {
  selectedImage.value = image
  showImageModal.value = true
}

const closeImageModal = () => {
  showImageModal.value = false
  selectedImage.value = ''
}
</script>