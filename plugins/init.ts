import { useAuctionStore } from '~/stores/auction'

export default defineNuxtPlugin(async (nuxtApp) => {
  const store = useAuctionStore()

  // Initialize store on both server and client
  if (!store.isInitialized) {
    await store.initializeStore()
  }

  // Update BGG data only on client side
  if (process.client) {
    nuxtApp.hook('app:mounted', async () => {
      // await store.updateBGGData()
    })
  }
})