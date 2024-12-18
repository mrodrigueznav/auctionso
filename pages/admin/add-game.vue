<template>
  <div class="container mx-auto px-4 py-8">
    <AdminBackButton />
    <h1 class="text-3xl font-bold mb-8">Agregar Juego</h1>

    <div class="max-w-3xl mx-auto">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <!-- BGG Search Toggle -->
        <div class="mb-6">
          <label class="flex items-center space-x-3">
            <input type="checkbox" v-model="useBGG"
              class="form-checkbox h-5 w-5 text-primary rounded border-gray-300 dark:border-gray-600" />
            <span>Buscar en BoardGameGeek</span>
          </label>
        </div>

        <!-- BGG Search Section -->
        <div v-if="useBGG" class="mb-6">
          <div class="flex space-x-4">
            <div class="flex-1">
              <input type="text" v-model="searchQuery" placeholder="Buscar juego en BGG..."
                class="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                @keyup.enter="searchBGG" />
            </div>
            <button @click="searchBGG"
              class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              :disabled="isLoading">
              <span v-if="isLoading">Buscando...</span>
              <span v-else>Buscar</span>
            </button>
          </div>

          <!-- Search Results -->
          <div v-if="showResults && searchResults.length > 0" class="mt-4">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 class="text-lg font-semibold mb-3">Resultados:</h3>
              <div class="space-y-2">
                <button v-for="result in searchResults" :key="result.id" @click="selectGame(result)"
                  class="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  {{ result.name }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Game Form -->
        <form @submit.prevent="saveGame" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Basic Info -->
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-1">Nombre</label>
                <input v-model="gameData.name" type="text" required
                  class="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">BGG Rating</label>
                <input v-model="gameData.bggRating" type="text" required
                  class="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" disabled />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">No de Jugadores</label>
                <input v-model="gameData.playerCount" type="text" required
                  class="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" disabled />
              </div>

              <div>
                <label class="block text-sm font-medium mb-1">Editorial</label>
                <select v-model="gameData.publisher" required
                  class="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600">
                  <option value="default" disabled>Selecciona una editorial</option>
                  <option v-for="publisher in bggPublishers" :key="publisher.publisher" :value="publisher.publisher">
                    {{ publisher.publisher }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Año de lanzamiento</label>
                <input v-model="gameData.releaseYear" type="text" required
                  class="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" disabled />
              </div>


              <div>
                <label class="block text-sm font-medium mb-1">Descripción</label>
                <textarea v-model="gameData.description" rows="3" required
                  class="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"></textarea>
              </div>
            </div>

            <!-- Pricing -->
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-1">Precio Original (MSRP)</label>
                <input v-model.number="gameData.msrp" type="number" required min="0"
                  class="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" />
              </div>

              <div>
                <label class="block text-sm font-medium mb-1">Precio Inicial</label>
                <input v-model.number="gameData.startingPrice" type="number" required min="0"
                  class="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" />
              </div>

              <div>
                <label class="block text-sm font-medium mb-1">Idioma</label>
                <select v-model="gameData.language" required
                  class="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600">
                  <option value="es">Espanol</option>
                  <option value="en">Ingles</option>
                  <!-- <option value="fr"">Muy Bueno</option> -->
                  <!-- <option value="ge">Bueno</option> -->
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium mb-1">Estado</label>
                <select v-model="gameData.condition" required
                  class="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600">
                  <option value="new">Nuevo</option>
                  <option value="like-new">Como Nuevo</option>
                  <option value="very-good">Muy Bueno</option>
                  <option value="good">Bueno</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Image Upload Section -->
          <div class="space-y-4">
            <label class="block text-sm font-medium mb-1">Imágenes</label>
            <input type="file" multiple accept="image/*" @change="handleImageUpload"
              class="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" />
            <div class="flex flex-wrap gap-4 mt-4">
              <div v-for="(image, index) in imagePreviews" :key="index" class="relative w-24 h-24">
                <img :src="image" alt="Game Image" class="w-full h-full object-cover rounded-lg" />
                <button @click="removeImage(index)"
                  class="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1">
                  &times;
                </button>
              </div>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
            <p class="text-red-600 dark:text-red-400">{{ error }}</p>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end">
            <button type="submit"
              class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              :disabled="isLoading">
              {{ isLoading ? 'Guardando...' : 'Guardar Juego' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import BGGRating from '~/components/BGGRating.vue';
import { useApi } from '~/composables/useApi'
import { searchBGGGame, getBGGGameData } from '~/utils/bggApi'

const router = useRouter()
const api = useApi()

const useBGG = ref(true)
const searchQuery = ref('')
const searchResults = ref<{ id: string; name: string }[]>([])
const isLoading = ref(false)
const showResults = ref(false)
const error = ref('')

const gameData = reactive({
  name: '',
  description: '',
  msrp: 0,
  startingPrice: 0,
  condition: 'new',
  playerCount: '',
  language: 'es',
  bggRating: 0,
  publisher: 'Desconocido',
  releaseYear: 0,
  images: [] as File[]
})

const imagePreviews = ref<string[]>([])
const bggPublishers = ref<{ publisher: string }[]>([])


const searchBGG = async () => {
  if (!searchQuery.value) return

  isLoading.value = true
  try {
    searchResults.value = await searchBGGGame(searchQuery.value)
    showResults.value = true
  } catch (error) {
    console.error('Error searching BGG:', error)
  } finally {
    isLoading.value = false
  }
}

const selectGame = async (result: { id: string; name: string }) => {
  isLoading.value = true
  showResults.value = false
  try {
    const gameInfo = await getBGGGameData(result.id)
    console.log(gameInfo)
    gameData.name = gameInfo.name || ''
    gameData.bggRating = gameInfo.bggRating || 0
    gameData.description = gameInfo.description || ''
    gameData.playerCount = gameInfo.playerCount || ''
    gameData.publisher = gameInfo.publisher || ''
    gameData.releaseYear = gameInfo.releaseYear || 0
    
    // Update publishers list directly
    bggPublishers.value = gameInfo.publishers || []
    console.log(bggPublishers)

    searchQuery.value = ''
  } catch (error) {
    console.error('Error fetching BGG data:', error)
  } finally {
    isLoading.value = false
  }
}

const handleImageUpload = (event: Event) => {
  const files = (event.target as HTMLInputElement).files
  if (files) {
    for (let i = 0; i < files.length && gameData.images.length < 10; i++) {
      const file = files[i]
      gameData.images.push(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          imagePreviews.value.push(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }
}

const removeImage = (index: number) => {
  gameData.images.splice(index, 1)
  imagePreviews.value.splice(index, 1)
}

const saveGame = async () => {
  const formData = new FormData()
  formData.append('name', gameData.name)
  formData.append('description', gameData.description)
  formData.append('startingPrice', gameData.startingPrice.toString())
  formData.append('msrp', gameData.msrp.toString())
  formData.append('condition', gameData.condition)
  formData.append('language', gameData.language)
  formData.append('bggRating', gameData.bggRating.toString())
  formData.append('playerCount', gameData.playerCount)
  formData.append('publisher', gameData.publisher)
  formData.append('releaseYear', gameData.releaseYear.toString())

  gameData.images.forEach((image) => {
    formData.append('images', image)
  })

  try {
    await api.createItem(formData, {
      // No need to set 'Content-Type' header for FormData
    })

    router.push('/admin')
  } catch (e) {
    error.value = api.error.value || 'Error saving game'
  }
}
</script>