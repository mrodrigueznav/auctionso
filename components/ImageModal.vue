<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click="$emit('close')">
        <div class="fixed inset-0 bg-black/75"></div>
        <div class="relative z-10 max-w-screen-xl w-full">
          <img :src="imageSrc" :alt="imageAlt" class="w-full h-auto rounded-lg" />
          <button
            class="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/75 transition-colors"
            @click="$emit('close')"
          >
            <XMarkIcon class="w-6 h-6" />
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline'

defineProps<{
  show: boolean
  imageSrc: string
  imageAlt: string
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>