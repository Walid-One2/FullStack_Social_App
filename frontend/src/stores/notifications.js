import { defineStore } from "pinia";
import { 
  getNotifications, 
  getUnreadNotificationsCount, 
  markAllNotificationsAsRead 
} from "../api";

export const useNotificationsStore = defineStore("notifications", {
  state: () => ({
    notifications: [],
    unreadCount: 0,
    isLoading: false,
    error: null,
  }),

  getters: {
    hasUnreadNotifications: (state) => state.unreadCount > 0,
  },

  actions: {
    async fetchNotifications() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await getNotifications();
        this.notifications = response.data;
      } catch (error) {
        console.error("Error fetching notifications:", error);
        this.error = error.response?.data?.message || "Failed to fetch notifications";
      } finally {
        this.isLoading = false;
      }
    },

    async fetchUnreadCount() {
      try {
        const response = await getUnreadNotificationsCount();
        this.unreadCount = response.data.count;
      } catch (error) {
        console.error("Error fetching unread count:", error);
      }
    },

    async markAllAsRead() {
      try {
        await markAllNotificationsAsRead();
        this.unreadCount = 0;
        // Marquer toutes les notifications comme lues dans le state
        this.notifications = this.notifications.map(notification => ({
          ...notification,
          isRead: true
        }));
      } catch (error) {
        console.error("Error marking notifications as read:", error);
      }
    },

    // Méthode pour mettre à jour le compteur en temps réel
    incrementUnreadCount() {
      this.unreadCount += 1;
    },

    // Méthode pour décrémenter le compteur (si nécessaire)
    decrementUnreadCount() {
      if (this.unreadCount > 0) {
        this.unreadCount -= 1;
      }
    },

    clearError() {
      this.error = null;
    },
  },
});

: chore: ajout du fichier docker-compose.yml - 2025-08-20T12:37:00 

: chore: installation de API Platform - 2025-08-21T16:16:00 

: feat(backend): ajout du champ name (nom d'utilisateur) à User - 2025-08-23T19:09:00 

: feat(backend): création de l'entité Post - 2025-08-24T15:28:00 

: feat(backend): configuration du fichier security.yaml - 2025-08-28T15:30:00 

: feat(backend): implémentation de l'endpoint POST /api/login - 2025-08-29T18:03:00 

: style(frontend): stylisation du formulaire d'inscription - 2025-09-02T11:30:00 

: feat(backend): vérification de l'auto-suivi (interdit) - 2025-09-08T18:45:00 

: feat(backend): ajout des relations recipient, actor, post - 2025-09-12T19:26:00 

: feat(backend): création du NotificationController - 2025-09-13T10:44:00 

: feat(backend): éviter les notifications en double - 2025-09-15T10:30:00 

: feat(frontend): distinction visuelle lues/non lues - 2025-09-16T16:07:00 

: feat(backend): création des repositories Conversation et Message - 2025-09-17T13:13:00 

: feat(frontend): affichage des messages avec bulles - 2025-09-21T15:02:00 

: feat(backend): migration pour colonnes vérification email - 2025-09-24T10:55:00 

: feat(backend): validation du token et expiration - 2025-09-25T10:33:00 

: style(frontend): design formulaire mot de passe oublié - 2025-09-26T11:28:00 

: feat(frontend): validation confirmation mot de passe - 2025-09-26T15:42:00 
