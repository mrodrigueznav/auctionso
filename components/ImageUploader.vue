<template>
  <div class="space-y-4">
    <label class="block text-sm font-medium mb-1">Imágenes del Juego (máximo {{ maxImages }})</label>
    
    <!-- Image Preview Grid -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
      <!-- Existing Images -->
      <div
        v-for="(image, index) in existingImages"
        :key="'existing-' + index"
        class="relative aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden group"
      >
        <img
          :src="image"
          :alt="'Image ' + (index + 1)"
          class="w-full h-full object-cover"
        />
        <button
          @click="removeExistingImage(index)"
          class="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <XMarkIcon class="w-4 h-4" />
        </button>
      </div>
      
      <!-- New Image Previews -->
      <div
        v-for="(image, index) in newImagePreviews"
        :key="'new-' + index"
        class="relative aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden group"
      >
        <img
          :src="image"
          :alt="'New Image ' + (index + 1)"
          class="w-full h-full object-cover"
        />
        <button
          @click="removeNewImage(index)"
          class="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <XMarkIcon class="w-4 h-4" />
        </button>
      </div>
      
      <!-- Upload Button -->
      <label
        v-if="totalImages < maxImages"
        class="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex flex-col items-center justify-center"
      >
        <input
          type="file"
          accept="image/*"
          class="hidden"
          @change="handleImageUpload"
          multiple
        />
        <PlusIcon class="w-8 h-8 text-gray-400" />
        <span class="text-sm text-gray-500 mt-2">Agregar Imágenes</span>
      </label>
    </div>
    
    <!-- Error Message -->
    <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { XMarkIcon, PlusIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  existingImages: string[]
  newImages: File[]
  maxImages: number
}>()

const emit = defineEmits<{
  (e: 'update:existingImages', value: string[]): void
  (e: 'update:newImages', value: File[]): void
}>()

const error = ref('')
const newImagePreviews = ref<string[]>([])

const totalImages = computed(() => props.existingImages.length + props.newImages.length)

const handleImageUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return
  
  const remainingSlots = props.maxImages - totalImages.value
  const filesToProcess = Array.from(input.files).slice(0, remainingSlots)
  
  const newImages = [...props.newImages]
  const newPreviews = [...newImagePreviews.value]
  
  for (const file of filesToProcess) {
    if (!file.type.startsWith('image/')) {
      error.value = 'Solo se permiten archivos de imagen'
      continue
    }
    
    try {
      const preview = await readFileAsDataURL(file)
      newImages.push(file)
      newPreviews.push(preview)
      error.value = ''
    } catch (err) {
      error.value = 'Error al cargar la imagen'
    }
  }
  
  emit('update:newImages', newImages)
  newImagePreviews.value = newPreviews
  
  // Reset input
  input.value = ''
}

const removeExistingImage = (index: number) => {
  const newImages = [...props.existingImages]
  newImages.splice(index, 1)
  emit('update:existingImages', newImages)
}

const removeNewImage = (index: number) => {
  const newImages = [...props.newImages]
  const newPreviews = [...newImagePreviews.value]
  newImages.splice(index, 1)
  newPreviews.splice(index, 1)
  emit('update:newImages', newImages)
  newImagePreviews.value = newPreviews
}

const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
</script>