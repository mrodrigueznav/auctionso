import { defineStore } from 'pinia'
import type { BoardGame } from '~/types/boardgame'
import { getBGGGameData, searchBGGGame } from '~/utils/bggApi'

export const useAuctionStore = defineStore('auction', {
  state: () => ({
    games: [] as BoardGame[],
    currentAuctionItem: null as BoardGame | null,
    isInitialized: false,
    isLoading: false
  }),
  
  actions: {
    async initializeStore() {
      if (this.isInitialized) return
      
      const initialGames = [
        {
          id: 1,
          bggId: "13",
          name: "Catan",
          images: [],
          description: "El juego de mesa moderno más influyente",
          synopsis: "",
          condition: "Excelente - Completo",
          retailPrice: 55,
          startingPrice: 35,
          currentPrice: 40,
          isSold: false,
          playerCount: "",
          playTime: "",
          weight: "Medium",
          minAge: "",
          releaseYear: 0,
          publisher: "DEVIR",
          bggRating: 0
        }
      ]

      this.games = initialGames
      this.isInitialized = true
    },

    async updateBGGData() {
      if (!process.client) return

      this.isLoading = true
      try {
        for (const game of this.games) {
          if (game.bggId) {
            try {
              const bggData = await getBGGGameData(game.bggId)
              Object.assign(game, {
                ...game,
                ...bggData,
                id: game.id,
                condition: game.condition,
                retailPrice: game.retailPrice,
                startingPrice: game.startingPrice,
                currentPrice: game.currentPrice,
                isSold: game.isSold,
                soldFor: game.soldFor,
                publisher: game.publisher,
                weight: game.weight
              })
            } catch (error) {
              console.error(`Error updating BGG data for ${game.name}:`, error)
            }
          }
        }
      } finally {
        this.isLoading = false
      }
    },

    updateBid(gameId: number, amount: number) {
      const game = this.games.find(g => g.id === gameId)
      if (game && !game.isSold && amount > game.currentPrice) {
        game.currentPrice = amount
      }
    },
    
    markAsSold(gameId: number) {
      const game = this.games.find(g => g.id === gameId)
      if (game) {
        game.isSold = true
        game.soldFor = game.currentPrice
      }
    },

    setCurrentAuctionItem(game: BoardGame | null) {
      this.currentAuctionItem = game
    }
  }
})