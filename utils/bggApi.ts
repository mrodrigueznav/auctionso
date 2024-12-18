import type { BoardGame } from '~/types/boardgame'

// First, search for a game
export async function searchBGGGame(query: string): Promise<{ id: string; name: string }[]> {
  try {
    const response = await fetch(`https://boardgamegeek.com/xmlapi2/search?query=${encodeURIComponent(query)}`)
    const xmlText = await response.text()
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml')
    
    const items = Array.from(xmlDoc.querySelectorAll('item'))
    return items.map(item => ({
      id: item.getAttribute('id') || '',
      name: item.querySelector('name')?.getAttribute('value') || ''
    }))
  } catch (error) {
    console.error('Error searching BGG:', error)
    return []
  }
}

// Then, get detailed game data
export async function getBGGGameData(gameId: string): Promise<Partial<BoardGame>> {
  try {
    const response = await fetch(`https://boardgamegeek.com/xmlapi2/thing?id=${gameId}&stats=1`)
    const xmlText = await response.text()
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml')
    
    const game = xmlDoc.querySelector('item')
    if (!game) throw new Error('Game not found')
    
    const name = game.querySelector('name[type="primary"]')?.getAttribute('value') || ''
    const description = game.querySelector('description')?.textContent || ''
    const image = game.querySelector('image')?.textContent || ''
    const thumbnail = game.querySelector('thumbnail')?.textContent || ''
    const yearPublished = game.querySelector('yearpublished')?.getAttribute('value') || ''
    const minPlayers = game.querySelector('minplayers')?.getAttribute('value') || ''
    const maxPlayers = game.querySelector('maxplayers')?.getAttribute('value') || ''
    const playingTime = game.querySelector('playingtime')?.getAttribute('value') || ''
    const minAge = game.querySelector('minage')?.getAttribute('value') || ''
    const averageRating = game.querySelector('statistics ratings average')?.getAttribute('value') || ''
    const publishers = Array.from(game.querySelectorAll('link[type="boardgamepublisher"]')).map(el => {
      const publisher = el.getAttribute('value') || ''
      return { publisher: publisher }
    })
    
    return {
      name,
      description: description.substring(0, 200) + '...',
      synopsis: description.substring(0, 200) + '...',
      images: [image, thumbnail].filter(Boolean),
      playerCount: `${minPlayers}-${maxPlayers} jugadores`,
      playTime: `${playingTime} minutos`,
      minAge: `${minAge}+`,
      releaseYear: parseInt(yearPublished),
      bggRating: parseFloat(parseFloat(averageRating).toFixed(1)),
      publishers
    }
  } catch (error) {
    console.error('Error fetching BGG data:', error)
    return {}
  }
}