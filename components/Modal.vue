<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex min-h-screen items-center justify-center p-4">
          <!-- Backdrop -->
          <div class="fixed inset-0 bg-black/75" @click="$emit('close')"></div>
          
          <!-- Modal -->
          <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full">
            <!-- Header -->
            <div class="px-6 py-4 border-b dark:border-gray-700">
              <h3 class="text-xl font-semibold">
                <slot name="title"></slot>
              </h3>
            </div>
            
            <!-- Content -->
            <div class="px-6 py-4">
              <slot name="content"></slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  show?: boolean
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