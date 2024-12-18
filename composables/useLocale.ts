export const useLocale = () => {
  const translations = {
    'Browse Items': 'Explorar Artículos',
    'Live Auction': 'Subasta en Vivo',
    'Boardgame Charity Auction': 'Subasta Benéfica de Juegos de Mesa',
    'Players': 'Jugadores',
    'Time': 'Duración',
    'Language': 'Idioma',
    'Weight': 'Complejidad',
    'Condition': 'Estado',
    'Retail': 'Precio Sugerido',
    'Starting': 'Precio Inicial',
    'Current bid': 'Oferta Actual',
    'Sold for': 'Vendido por',
    'Quick Bid': 'Oferta Rápida',
    'Bid': 'Ofertar',
    'Enter custom amount': 'Ingrese monto personalizado',
    'Waiting for auction to start...': 'Esperando que comience la subasta...',
    'Live Stream Placeholder': 'Transmisión en Vivo',
    'Complex': 'Complejo',
    'Medium': 'Medio',
    'Heavy': 'Pesado',
    'Like New': 'Como Nuevo',
    'Excellent': 'Excelente',
    'Very Good': 'Muy Bueno',
    'New': 'Nuevo',
    'new': 'Nuevo',
    'Publisher': 'Editorial',
    'Year': 'Año',
    'Age': 'Edad',
    'Item not found': 'Artículo no encontrado',
    'Test Mode': 'Modo de Prueba',
    'Bid History': 'Historial de Ofertas',
    'Spanish': 'Español',
    'English': 'Inglés',
  }

  const t = (key: string): string => {
    return translations[key as keyof typeof translations] || key
  }

  return {
    t
  }
}