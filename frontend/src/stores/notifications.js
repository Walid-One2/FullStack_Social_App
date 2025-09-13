/**
 * Store Pinia - Gestion des notifications
 * Gère la récupération, le comptage et le marquage des notifications
 * Supporte les mises à jour en temps réel via Mercure
 */

import { defineStore } from "pinia";
import {
  getNotifications,
  getUnreadNotificationsCount,
  markAllNotificationsAsRead
} from "../api";

export const useNotificationsStore = defineStore("notifications", {
  // État du store notifications
  state: () => ({
    notifications: [], // Liste de toutes les notifications
    unreadCount: 0, // Nombre de notifications non lues
    isLoading: false, // Indicateur de chargement
    error: null, // Message d'erreur
  }),

  // Getters
  getters: {
    /** Vérifie s'il y a des notifications non lues */
    hasUnreadNotifications: (state) => state.unreadCount > 0,
  },

  actions: {
    /**
     * Récupère toutes les notifications de l'utilisateur
     * Charge les notifications likes, commentaires, follows, etc.
     */
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

    /**
     * Récupère le nombre de notifications non lues
     * Utilisé pour afficher le badge dans la navbar
     */
    async fetchUnreadCount() {
      try {
        const response = await getUnreadNotificationsCount();
        this.unreadCount = response.data.count;
      } catch (error) {
        console.error("Error fetching unread count:", error);
      }
    },

    /**
     * Marque toutes les notifications comme lues
     * Réinitialise le compteur et met à jour le state local
     */
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

    /**
     * Incrémente le compteur de notifications non lues
     * Appelé lors de la réception d'une nouvelle notification en temps réel
     */
    incrementUnreadCount() {
      this.unreadCount += 1;
    },

    /**
     * Décrémente le compteur de notifications non lues
     * Utilisé lors du marquage manuel de notifications
     */
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

