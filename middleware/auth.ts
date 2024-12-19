export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()
  
  // Public routes that don't require authentication
  // const publicRoutes = ['/auth/login', '/auth/register', '/auth/forgot-password']
  const publicRoutes = ['/auth/login', '/auth/register']
  
  if (!auth.isAuthenticated && !publicRoutes.includes(to.path)) {
    return navigateTo('/auth/login')
  }
  
  if (auth.isAuthenticated && publicRoutes.includes(to.path)) {
    return navigateTo('/')
  }
})