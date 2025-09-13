/**
 * Store Pinia - Gestion des abonnements (followings)
 * Maintient la liste des utilisateurs suivis par l'utilisateur connecté
 * Affichée dans la sidebar FollowingsSidebar
 */

import { defineStore } from 'pinia'
import { getFollowings } from '../api'

export const useFollowingsStore = defineStore('followings', {
  // État du store followings
  state: () => ({
    followings: [], // Liste des utilisateurs suivis
    isLoading: false, // Indicateur de chargement
    error: null // Message d'erreur
  }),

  actions: {
    /**
     * Récupère la liste des utilisateurs suivis
     * Charge les informations basiques pour affichage dans la sidebar
     */
    async fetchFollowings() {
      this.isLoading = true
      this.error = null
      try {
        const response = await getFollowings()
        this.followings = response.data
        console.log('Abonnements chargés:', this.followings)
      } catch (error) {
        console.error('Erreur de chargement des abonnements:', error)
        this.error = error.response?.data?.message || 'Échec du chargement des abonnements'
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Rafraîchit la liste des abonnements
     * Appelé après un follow/unfollow
     */
    async refreshFollowings() {
      await this.fetchFollowings()
    },

    /**
     * Efface le message d'erreur
     */
    clearError() {
      this.error = null
    }
  }
})

