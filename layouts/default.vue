<template>
  <NavBar/>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import  NavBar from '@/components/layout/NavBar.vue'
</script>