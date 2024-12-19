<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="!user">
      <p>Loading user data...</p>
    </div>
    <div v-else>
      <!-- Profile Header -->
      <div class="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div class="relative">
            <div class="w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary/20">
              <img 
                :src="user.avatar" 
                :alt="user.name"
                class="w-full h-full object-cover"
              />
            </div>
            <button 
              class="absolute bottom-2 right-2 bg-primary text-white p-2 rounded-full hover:bg-primary-dark transition-colors shadow-lg"
              @click="uploadAvatar"
            >
              <CameraIcon class="w-5 h-5" />
            </button>
          </div>
          <div class="text-center md:text-left">
            <h1 class="text-3xl font-bold mb-2">{{ user.name }}</h1>
            <div class="flex items-center justify-center md:justify-start space-x-2">
              <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                {{ user.isAdmin ? 'Administrador' : 'Usuario' }}
              </span>
              <span class="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-sm">
                Verificado
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column: Personal Info & Settings -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Personal Information -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 class="text-xl font-semibold mb-4 flex items-center">
              <UserIcon class="w-5 h-5 mr-2 text-primary" />
              Información Personal
            </h2>
            <div class="space-y-4">
              <UiFormField label="Nombre">
                <input
                  v-model="profileForm.name"
                  type="text"
                  class="form-input"
                  placeholder="Tu nombre"
                />
              </UiFormField>
              
              <UiFormField label="Email">
                <input
                  v-model="profileForm.email"
                  type="email"
                  class="form-input"
                  placeholder="tu@email.com"
                />
              </UiFormField>

              <UiFormField label="Teléfono">
                <input
                  v-model="profileForm.phone"
                  type="tel"
                  class="form-input"
                  placeholder="+34 XXX XXX XXX"
                />
              </UiFormField>
            </div>
          </div>

          <!-- Notification Settings -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 class="text-xl font-semibold mb-4 flex items-center">
              <BellIcon class="w-5 h-5 mr-2 text-primary" />
              Notificaciones
            </h2>
            <div class="space-y-4">
              <label class="flex items-start space-x-3 cursor-pointer">
                <input
                  v-model="profileForm.notifications.email"
                  type="checkbox"
                  class="mt-1 form-checkbox h-5 w-5 text-primary rounded"
                />
                <div>
                  <span class="block font-medium">Notificaciones por email</span>
                  <span class="text-sm text-gray-500 dark:text-gray-400">
                    Recibe actualizaciones sobre tus subastas
                  </span>
                </div>
              </label>
              
              <label class="flex items-start space-x-3 cursor-pointer">
                <input
                  v-model="profileForm.notifications.bid"
                  type="checkbox"
                  class="mt-1 form-checkbox h-5 w-5 text-primary rounded"
                />
                <div>
                  <span class="block font-medium">Alertas de ofertas</span>
                  <span class="text-sm text-gray-500 dark:text-gray-400">
                    Notificación cuando alguien supere tu oferta
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Right Column: Bid History -->
        <div class="lg:col-span-2">
          <BidHistory :bidHistory="bidHistory" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { 
  CameraIcon, 
  UserIcon,
  BellIcon,
  ClockIcon,
  CalendarIcon,
  CheckIcon,
  ArrowTopRightOnSquareIcon,
  ShoppingBagIcon,
  ArrowRightIcon
} from '@heroicons/vue/24/outline'
import BidHistory from '@/components/BidHistory.vue'
import UserInfo from '@/components/UserInfo.vue'

const fullUser = useAuthStore()
const user = fullUser.user
const isSaving = ref(false)
const initialFormState = {
  name: user?.name || '',
  email: 'usuario@example.com',
  phone: '',
  notifications: {
    email: true,
    bid: true
  }
}

const profileForm = ref({ ...initialFormState })

// Mock bid history with status
const bidHistory = ref([
  { 
    id: 1, 
    gameName: 'Catan', 
    amount: 45, 
    date: '2024-01-15T14:30:00',
    status: 'won' as const,
    finalPrice: 45
  },
  { 
    id: 2, 
    gameName: 'Ticket to Ride', 
    amount: 35, 
    date: '2024-01-10T16:45:00',
    status: 'lost' as const,
    finalPrice: 40
  },
  { 
    id: 3, 
    gameName: 'Pandemic', 
    amount: 30, 
    date: '2024-01-20T09:15:00',
    status: 'ongoing' as const
  }
])

const hasChanges = computed(() => {
  return JSON.stringify(profileForm.value) !== JSON.stringify(initialFormState)
})

const uploadAvatar = () => {
  // Implement avatar upload logic
  console.log('Upload avatar')
}

const saveProfile = async () => {
  isSaving.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    if (user) {
      user.name = profileForm.value.name
      Object.assign(initialFormState, profileForm.value)
    }
  } catch (error) {
    console.error('Error saving profile:', error)
  } finally {
    isSaving.value = false
  }
}
</script>