<template>
  <div class="text-white font-medium">
    <span>Inicia en: </span>
    <span class="font-bold">
      {{ days }}d {{ hours }}h {{ minutes }}m {{ seconds }}s
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const targetDate = new Date('2024-12-21T12:00:00')
const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

let timer: NodeJS.Timeout

const updateCountdown = () => {
  const now = new Date()
  const difference = targetDate.getTime() - now.getTime()

  if (difference > 0) {
    days.value = Math.floor(difference / (1000 * 60 * 60 * 24))
    hours.value = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    minutes.value = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    seconds.value = Math.floor((difference % (1000 * 60)) / 1000)
  }
}

onMounted(() => {
  updateCountdown()
  timer = setInterval(updateCountdown, 1000)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>