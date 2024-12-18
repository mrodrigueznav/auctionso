<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Panel de Administración</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <NuxtLink
        to="/admin/add-game"
        class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
      >
        <div class="flex items-center space-x-4">
          <PlusCircleIcon class="w-8 h-8 text-primary" />
          <div>
            <h2 class="text-xl font-semibold">Agregar Juego</h2>
            <p class="text-gray-600 dark:text-gray-400">Añadir nuevo juego a la subasta</p>
          </div>
        </div>
      </NuxtLink>
      
      <NuxtLink
        to="/admin/edit-games"
        class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
      >
        <div class="flex items-center space-x-4">
          <PencilSquareIcon class="w-8 h-8 text-primary" />
          <div>
            <h2 class="text-xl font-semibold">Editar Juegos</h2>
            <p class="text-gray-600 dark:text-gray-400">Modificar información de juegos existentes</p>
          </div>
        </div>
      </NuxtLink>
      
      <NuxtLink
        to="/admin/live-auctions"
        class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
      >
        <div class="flex items-center space-x-4">
          <BoltIcon class="w-8 h-8 text-primary" />
          <div>
            <h2 class="text-xl font-semibold">Subastas en Vivo</h2>
            <p class="text-gray-600 dark:text-gray-400">Gestionar subastas activas</p>
          </div>
        </div>
      </NuxtLink>
      
      <NuxtLink
        to="/admin/sold-items"
        class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
      >
        <div class="flex items-center space-x-4">
          <ClipboardDocumentCheckIcon class="w-8 h-8 text-primary" />
          <div>
            <h2 class="text-xl font-semibold">Items Vendidos</h2>
            <p class="text-gray-600 dark:text-gray-400">Gestionar pagos y envíos</p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  PlusCircleIcon,
  BoltIcon,
  ClipboardDocumentCheckIcon,
  PencilSquareIcon
} from '@heroicons/vue/24/outline'
</script>