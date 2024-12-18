<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">{{ t('Live Auction') }}</h1>
      <div class="flex items-center space-x-4">
        <span class="text-sm text-gray-600 dark:text-gray-400">{{ t('Test Mode') }}:</span>
        <button
          @click="toggleTestMode"
          class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          :class="isTestMode ? 'bg-primary' : 'bg-gray-200'"
        >
          <span
            class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
            :class="isTestMode ? 'translate-x-5' : 'translate-x-0'"
          />
        </button>
      </div>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Video Stream Section -->
      <div class="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
        <div class="aspect-w-16 aspect-h-9 relative">
          <img
            src="https://placehold.co/1920x1080/2563eb/ffffff?text=Transmisión+en+Vivo"
            alt="Transmisión en Vivo"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-white text-center">
              <div class="text-2xl font-bold mb-2">{{ t('Live Stream Placeholder') }}</div>
              <p class="text-sm opacity-75">La transmisión comenzará cuando inicie la subasta</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Current Item Section -->
      <div v-if="currentItem" class="space-y-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <!-- Reduced height for the image section -->
          <div class="h-36">
            <swiper
              v-if="currentItem.images.length > 0"
              :modules="[SwiperNavigation, SwiperPagination]"
              :navigation="true"
              :pagination="{ clickable: true }"
              class="h-full"
              @swiper="onSwiper"
              @slideChange="onSlideChange"
            >
              <swiper-slide v-for="image in currentItem.images" :key="image">
                <img 
                  :src="image" 
                  :alt="currentItem.name" 
                  class="w-full h-full object-contain cursor-pointer" 
                  @click="openImageModal(image)"
                />
              </swiper-slide>
            </swiper>
          </div>
          
          <div class="p-4">
            <h2 class="text-2xl font-bold mb-2">{{ currentItem.name }}</h2>
            <p class="text-gray-600 dark:text-gray-400 mb-4">{{ currentItem.description }}</p>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <span class="text-gray-500 dark:text-gray-400">{{ t('Condition') }}:</span>
                <span class="ml-1">{{ t(currentItem.condition) }}</span>
              </div>
              <div>
                <span class="text-gray-500 dark:text-gray-400">{{ t('Retail') }}:</span>
                <span class="ml-1">${{ currentItem.retailPrice }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <BiddingPanel :game="currentItem" />

        <!-- Bid History -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
          <h3 class="text-lg font-semibold mb-4">{{ t('Bid History') }}</h3>
          <div class="space-y-2">
            <div v-for="(bid, index) in bidHistory" :key="index" class="flex justify-between items-center text-sm">
              <span class="text-gray-600 dark:text-gray-400">{{ bid.user }}</span>
              <span class="font-medium">${{ bid.amount }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="flex items-center justify-center h-64 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p class="text-gray-500">{{ t('Waiting for auction to start...') }}</p>
      </div>
    </div>

    <ImageModal
      :show="showImageModal"
      :image-src="selectedImage"
      :image-alt="currentItem?.name || ''"
      @close="showImageModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useAuctionStore } from '~/stores/auction'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation as SwiperNavigation, Pagination as SwiperPagination } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const { t } = useLocale()
const store = useAuctionStore()
const isTestMode = ref(false)
const currentItem = computed(() => store.currentAuctionItem)

// Image modal state
const showImageModal = ref(false)
const selectedImage = ref('')

// Swiper instance
let swiperInstance: SwiperType | null = null

const openImageModal = (image: string) => {
  selectedImage.value = image
  showImageModal.value = true
}

const onSwiper = (swiper: SwiperType) => {
  swiperInstance = swiper
}

const onSlideChange = () => {
  // We don't need to track the current slide anymore since we're not auto-opening the modal
}

// Mock bid history
const bidHistory = ref([
  { user: 'Ana', amount: 95 },
  { user: 'Roberto', amount: 85 },
  { user: 'Carlos', amount: 80 }
])

const toggleTestMode = () => {
  isTestMode.value = !isTestMode.value
  if (isTestMode.value) {
    store.setCurrentAuctionItem(store.games[0])
  } else {
    store.setCurrentAuctionItem(null)
  }
}

onBeforeUnmount(() => {
  if (swiperInstance) {
    swiperInstance.destroy()
    swiperInstance = null
  }
})
</script>