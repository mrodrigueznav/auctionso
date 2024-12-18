<template>
  <div class="container mx-auto px-4 py-8">
    <AdminBackButton />
    <h1 class="text-3xl font-bold mb-8">Editar Juegos</h1>

    <div class="space-y-6">
      <!-- Game List -->
      <div v-for="game in items" :key="game.id" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h2 class="text-2xl font-bold mb-2">{{ game.name }}</h2>
              <BGGRating :rating="game.bggRating || 0" />
            </div>
            <div class="flex space-x-2">
              <button 
                @click="editGame(game)"
                class="btn-primary inline-flex items-center space-x-2"
              >
                <PencilSquareIcon class="w-5 h-5" />
                <span>Editar</span>
              </button>
              <button 
                @click="confirmDelete(game)"
                class="btn-primary bg-red-500 hover:bg-red-600 inline-flex items-center space-x-2"
              >
                <TrashIcon class="w-5 h-5" />
                <span>Eliminar</span>
              </button>
            </div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div>
              <span class="text-gray-500 dark:text-gray-400">Estado:</span>
              <span class="ml-1">{{ t(game.condition) }}</span>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400">Precio Original:</span>
              <span class="ml-1">${{ game.msrp }}</span>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400">Precio Inicial:</span>
              <span class="ml-1">${{ game.startingPrice }}</span>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400">Oferta Actual:</span>
              <span class="ml-1">${{ game.currentPrice }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <Modal :show="showEditModal" @close="closeEditModal">
      <template #title>Editar {{ selectedGame?.name }}</template>
      <template #content>
        <AdminFormsGameEditForm
          v-if="selectedGame"
          :game="transformGameToFormData(selectedGame)"
          :is-loading="isLoading"
          :error="error"
          @submit="handleGameUpdate"
          @cancel="closeEditModal"
        />
      </template>
    </Modal>

    <!-- Delete Confirmation Modal -->
    <Modal :show="showDeleteModal" @close="closeDeleteModal">
      <template #title>Confirmar Eliminación</template>
      <template #content>
        <p class="mb-4">Para confirmar la eliminación, escribe "eliminar" en el campo de abajo.</p>
        <input 
          v-model="deleteConfirmation" 
          type="text"
          class="form-input mb-6"
          placeholder="Escribe 'eliminar' para confirmar"
        />
        <div class="flex justify-end space-x-4">
          <button 
            @click="closeDeleteModal"
            class="btn-secondary"
          >
            Cancelar
          </button>
          <button 
            @click="handleDelete"
            :disabled="deleteConfirmation !== 'eliminar'"
            class="btn-primary bg-red-500 hover:bg-red-600 inline-flex items-center space-x-2"
          >
            <TrashIcon class="w-5 h-5" />
            <span>Eliminar</span>
          </button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useApi, type ApiItem } from '~/composables/useApi'
import type { GameFormData } from '~/types/game-form'
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'

const { t } = useLocale()
const api = useApi()
const items = ref<ApiItem[]>([])
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const selectedGame = ref<ApiItem | null>(null)
const deleteConfirmation = ref('')
const error = ref<string | null>(null)
const isLoading = ref(false)

// Transform API item to form data
function transformGameToFormData(game: ApiItem): GameFormData {
  return {
    name: game.name,
    description: game.description,
    startingPrice: game.startingPrice,
    msrp: game.msrp,
    condition: game.condition as 'new' | 'like-new' | 'used' | 'damaged',
    bggRating: game.bggRating || 0,
    playerCount: game.playerCount || '',
    publisher: game.publisher || '',
    releaseYear: game.releaseYear || 0,
    imagesToDelete: [],
    existingImages: game.images?.map(img => ({
      id: img.id,
      url: img.url
    })) || [],
    newImages: []
  }
}

const editGame = (game: ApiItem) => {
  selectedGame.value = game
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  selectedGame.value = null
  error.value = null
}

const confirmDelete = (game: ApiItem) => {
  selectedGame.value = game
  deleteConfirmation.value = ''
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  selectedGame.value = null
  deleteConfirmation.value = ''
}

const handleDelete = async () => {
  if (!selectedGame.value || deleteConfirmation.value !== 'eliminar') return
  
  isLoading.value = true
  try {
    await api.deleteItem(selectedGame.value.id)
    items.value = items.value.filter(item => item.id !== selectedGame.value?.id)
    closeDeleteModal()
  } catch (e) {
    error.value = 'Error al eliminar el juego'
  } finally {
    isLoading.value = false
  }
}

const handleGameUpdate = async (formData: FormData) => {
  if (!selectedGame.value) return
  
  isLoading.value = true
  try {
    await api.updateItem(selectedGame.value.id, formData)
    // Refresh the items list
    items.value = await api.getItems()
    closeEditModal()
  } catch (e) {
    error.value = 'Error al actualizar el juego'
  } finally {
    isLoading.value = false
  }
}

// Load items on mount
onMounted(async () => {
  isLoading.value = true
  try {
    items.value = await api.getItems()
  } catch (e) {
    error.value = 'Error al cargar los juegos'
  } finally {
    isLoading.value = false
  }
})
</script>