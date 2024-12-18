<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Image Management -->
    <ImageManager
      v-model:existingImages="formData.existingImages"
      v-model:newImages="formData.newImages"
      v-model:imagesToDelete="formData.imagesToDelete"
      :maxImages="10"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Basic Info -->
      <div class="space-y-4">
        <FormField label="Nombre">
          <input
            v-model="formData.name"
            type="text"
            required
            class="form-input"
          />
        </FormField>
        
        <FormField label="Editorial">
          <input
            v-model="formData.publisher"
            type="text"
            required
            class="form-input"
          />
        </FormField>

        <FormField label="Estado">
          <select
            v-model="formData.condition"
            required
            class="form-select"
          >
            <option value="new">Nuevo</option>
            <option value="like-new">Como Nuevo</option>
            <option value="used">Usado</option>
            <option value="damaged">Dañado</option>
          </select>
        </FormField>
      </div>

      <!-- Pricing -->
      <div class="space-y-4">
        <FormField label="Precio Original ($)">
          <input
            v-model.number="formData.msrp"
            type="number"
            required
            min="0"
            class="form-input"
          />
        </FormField>
        
        <FormField label="Precio Inicial ($)">
          <input
            v-model.number="formData.startingPrice"
            type="number"
            required
            min="0"
            class="form-input"
          />
        </FormField>

        <FormField label="BGG Rating">
          <input
            v-model.number="formData.bggRating"
            type="number"
            required
            min="0"
            max="10"
            step="0.1"
            class="form-input"
          />
        </FormField>
      </div>
    </div>

    <FormField label="Descripción">
      <textarea
        v-model="formData.description"
        rows="3"
        class="form-textarea"
      ></textarea>
    </FormField>

    <!-- Error Message -->
    <div v-if="error" class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
      <p class="text-red-600 dark:text-red-400">{{ error }}</p>
    </div>

    <!-- Form Actions -->
    <div class="flex justify-end space-x-4">
      <button
        type="button"
        @click="$emit('cancel')"
        class="btn-secondary"
      >
        Cancelar
      </button>
      <button
        type="submit"
        :disabled="isLoading"
        class="btn-primary"
      >
        {{ isLoading ? 'Guardando...' : 'Guardar Cambios' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { GameFormData } from '~/types/game-form'
import { createGameFormData } from '~/utils/form-helpers'

const props = defineProps<{
  game: GameFormData
  isLoading?: boolean
  error?: string | null
}>()

const emit = defineEmits<{
  (e: 'submit', data: FormData): void
  (e: 'cancel'): void
}>()

const formData = reactive<GameFormData>({
  ...props.game,
  imagesToDelete: [],
  newImages: []
})

const handleSubmit = () => {
  const formDataToSend = createGameFormData(formData)
  emit('submit', formDataToSend)
}
</script>