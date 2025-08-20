import { defineStore } from 'pinia'
import { getFollowings } from '../api'

export const useFollowingsStore = defineStore('followings', {
  state: () => ({
    followings: [],
    isLoading: false,
    error: null
  }),

  actions: {
    async fetchFollowings() {
      this.isLoading = true
      this.error = null
      try {
        const response = await getFollowings()
        this.followings = response.data
        console.log('Followings loaded:', this.followings)
      } catch (error) {
        console.error('Error loading followings:', error)
        this.error = error.response?.data?.message || 'Failed to load followings'
      } finally {
        this.isLoading = false
      }
    },

    async refreshFollowings() {
      await this.fetchFollowings()
    },

    clearError() {
      this.error = null
    }
  }
})

: chore: configuration de la base de données MySQL - 2025-08-21T19:00:00 

: chore: installation d'Axios pour les requêtes HTTP - 2025-08-22T18:39:00 

: chore: ajout du Makefile pour automatisation - 2025-08-23T14:01:00 

: feat(backend): création de l'entité Follow - 2025-08-27T16:52:00 

: feat(backend): ajout de la relation follower->User - 2025-08-27T19:59:00 

: feat(backend): ajout de la relation followed->User - 2025-08-28T09:36:00 

: feat(backend): création du FollowRepository - 2025-08-28T13:59:00 

: style(frontend): stylisation du formulaire d'inscription - 2025-09-02T11:30:00 

: feat(frontend): rafraîchissement automatique du feed - 2025-09-07T11:28:00 

: feat(backend): implémentation de POST /api/users/{id}/follow - 2025-09-08T15:17:00 

: feat(backend): logique toggle follow/unfollow - 2025-09-08T17:30:00 

: feat(backend): implémentation de GET /api/user/followings - 2025-09-09T09:50:00 

: feat(backend): implémentation de GET /api/users/{id}/followers - 2025-09-09T11:17:00 

: feat(backend): implémentation de GET /api/users/{id}/following - 2025-09-09T15:55:00 

: feat(backend): comptage des followers/following - 2025-09-09T16:05:00 

: feat(frontend): création du store followings.js - 2025-09-09T17:25:00 

: feat(frontend): implémentation de fetchFollowings - 2025-09-09T18:43:00 

: feat(frontend): affichage des compteurs (posts, followers, following) - 2025-09-10T19:10:00 

: feat(frontend): affichage de la liste des followers/following - 2025-09-11T10:57:00 

: feat(frontend): bouton follow/unfollow - 2025-09-11T11:53:00 

: feat(frontend): création du composant FollowingsSidebar.vue - 2025-09-12T09:24:00 

: style(frontend): design de la sidebar followings - 2025-09-12T11:15:00 

: feat(backend): création du NotificationController - 2025-09-13T10:44:00 

: feat(backend): création de notification lors d'un follow - 2025-09-15T09:03:00 

: feat(backend): création de notification lors d'un follow - 2025-09-15T09:03:00 

: feat(backend): pagination des messages - 2025-09-18T12:52:00 

: feat(backend): implémentation de POST /api/chat/conversations/{id}/read - 2025-09-19T12:19:00 

: feat(frontend): création du composant ChatModal.vue - 2025-09-20T17:54:00 

: style(frontend): design de l'interface de chat - 2025-09-21T11:25:00 

: feat(frontend): marquer conversation comme lue à l'ouverture - 2025-09-22T13:32:00 

: feat(backend): validation du token et expiration - 2025-09-25T10:33:00 

: feat(backend): invalidation du token après usage - 2025-09-25T15:13:00 

: feat(frontend): création de la vue VerifyEmail.vue - 2025-09-25T16:10:00 

: feat(backend): création du service ElasticsearchService - 2025-09-27T09:10:00 

: feat: création d'index patterns dans Kibana - 2025-09-28T13:34:00 

: feat(backend): publication update lors nouveau like - 2025-09-29T16:57:00 
