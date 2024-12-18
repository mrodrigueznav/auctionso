<template>
  <div class="min-h-screen">
    <ChristmasBanner />
    <nav class="bg-white dark:bg-gray-800 shadow-sm">
      <div class="container mx-auto px-4">
        <div class="flex justify-between h-16">
          <div class="flex items-center space-x-8">
            <NuxtLink to="/" class="text-gray-900 dark:text-white hover:text-primary">
              <WontollaLogo />
            </NuxtLink>
            <NuxtLink to="/" class="text-gray-900 dark:text-white hover:text-primary">
              {{ t('Browse Items') }}
            </NuxtLink>
            <NuxtLink to="/live" class="text-gray-900 dark:text-white hover:text-primary">
              {{ t('Live Auction') }}
            </NuxtLink>
          </div>
          <div class="flex items-center space-x-4">
            <ThemeSwitcher />
            <UserProfile />
          </div>
        </div>
      </div>
    </nav>
    
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const { t } = useLocale()
</script>