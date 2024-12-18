<template>
  <div class="space-y-4">
    <label class="block text-sm font-medium mb-1">Imágenes del Juego (máximo {{ maxImages }})</label>
    
    <!-- Image Preview Grid -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
      <!-- Existing Images -->
      <div
        v-for="image in existingImages"
        :key="image.id"
        class="relative aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden group"
      >
        <img
          :src="image.url"
          :alt="'Image ' + image.id"
          class="w-full h-full object-cover"
        />
        <button
          @click="removeExistingImage(image)"
          class="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <XMarkIcon class="w-4 h-4" />
        </button>
      </div>
      
      <!-- New Image Previews -->
      <div
        v-for="(preview, index) in newImagePreviews"
        :key="'new-' + index"
        class="relative aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden group"
      >
        <img
          :src="preview"
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
        v-if="canAddMoreImages"
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { XMarkIcon, PlusIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  existingImages: Array<{ id: number; url: string }>
  newImages: File[]
  imagesToDelete: number[]
  maxImages: number
}>()

const emit = defineEmits<{
  (e: 'update:existingImages', value: Array<{ id: number; url: string }>): void
  (e: 'update:newImages', value: File[]): void
  (e: 'update:imagesToDelete', value: number[]): void
}>()

const newImagePreviews = ref<string[]>([])

const canAddMoreImages = computed(() => {
  return props.existingImages.length + props.newImages.length < props.maxImages
})

const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return
  
  const remainingSlots = props.maxImages - (props.existingImages.length + props.newImages.length)
  const filesToProcess = Array.from(input.files).slice(0, remainingSlots)
  
  const newImages = [...props.newImages]
  const newPreviews = [...newImagePreviews.value]
  
  filesToProcess.forEach(file => {
    if (file.type.startsWith('image/')) {
      newImages.push(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          newPreviews.push(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  })
  
  emit('update:newImages', newImages)
  newImagePreviews.value = newPreviews
  input.value = ''
}

const removeExistingImage = (image: { id: number; url: string }) => {
  const updatedImages = props.existingImages.filter(img => img.id !== image.id)
  const updatedImagesToDelete = [...props.imagesToDelete, image.id]
  emit('update:existingImages', updatedImages)
  emit('update:imagesToDelete', updatedImagesToDelete)
}

const removeNewImage = (index: number) => {
  const newImages = [...props.newImages]
  const newPreviews = [...newImagePreviews.value]
  newImages.splice(index, 1)
  newPreviews.splice(index, 1)
  emit('update:newImages', newImages)
  newImagePreviews.value = newPreviews
}
</script>