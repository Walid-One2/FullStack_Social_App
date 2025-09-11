/**
 * Module API - Gestion de toutes les requêtes HTTP vers le backend
 * Utilise Axios avec intercepteurs pour gérer l'authentification JWT
 */

import axios from 'axios'

// URL de base de l'API backend
export const API_HOST = 'http://localhost:8000'

// Création de l'instance Axios configurée
export const api = axios.create({
    baseURL: API_HOST,
})

// Intercepteur de requêtes : Ajoute automatiquement le token JWT à chaque requête
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// =====================================
// API d'Authentification et Profil
// =====================================

/**
 * Inscription d'un nouvel utilisateur
 * @param {string} password - Mot de passe
 * @param {string} email - Email
 * @param {string} name - Nom d'utilisateur
 */
export const register = (password, email, name) => {
    return api.post('/api/user/register', { password, email, name })
}

/**
 * Récupération du profil de l'utilisateur connecté
 */
export const getProfile = () => {
    return api.get('/api/user/profile')
}

/**
 * Mise à jour du profil utilisateur
 * @param {Object} profileData - Données du profil à mettre à jour
 */
export const updateProfile = (profileData) => {
    return api.put('/api/user/profile', profileData)
}

// =====================================
// API des Posts
// =====================================

/**
 * Récupération de tous les posts (fil d'actualités)
 */
export const getPosts = () => {
    return api.get('/api/posts')
}

/**
 * Création d'un nouveau post
 * @param {Object} postData - Contenu et média du post
 */
export const createPost = (postData) => {
    return api.post('/api/posts', postData)
}

/**
 * Récupération d'un post spécifique par son ID
 * @param {number} id - ID du post
 */
export const getPost = (id) => {
    return api.get(`/api/posts/${id}`)
}

/**
 * Mise à jour d'un post existant
 * @param {number} id - ID du post
 * @param {Object} postData - Nouvelles données du post
 */
export const updatePost = (id, postData) => {
    return api.put(`/api/posts/${id}`, postData)
}

/**
 * Suppression d'un post
 * @param {number} id - ID du post à supprimer
 */
export const deletePost = (id) => {
    return api.delete(`/api/posts/${id}`)
}

/**
 * Récupération des posts d'un utilisateur spécifique
 * @param {number} userId - ID de l'utilisateur
 */
export const getUserPosts = (userId) => {
    return api.get(`/api/posts/user/${userId}`)
}

// =====================================
// API des Likes
// =====================================

/**
 * Toggle (ajouter/retirer) un like sur un post
 * @param {number} postId - ID du post
 */
export const toggleLike = (postId) => {
    return api.post(`/api/posts/${postId}/like`)
}

/**
 * Vérifier si l'utilisateur a liké un post
 * @param {number} postId - ID du post
 */
export const getLikeStatus = (postId) => {
    return api.get(`/api/posts/${postId}/like`)
}

/**
 * Récupération de la liste des utilisateurs ayant liké un post
 * @param {number} postId - ID du post
 */
export const getLikesUsers = (postId) => {
    return api.get(`/api/posts/${postId}/likes`)
}

// =====================================
// API des Commentaires
// =====================================

/**
 * Récupération des commentaires d'un post
 * @param {number} postId - ID du post
 */
export const getComments = (postId) => {
    return api.get(`/api/posts/${postId}/comments`)
}

/**
 * Ajout d'un commentaire sur un post
 * @param {number} postId - ID du post
 * @param {string} content - Contenu du commentaire
 */
export const createComment = (postId, content) => {
    return api.post(`/api/posts/${postId}/comments`, { content })
}

/**
 * Suppression d'un commentaire
 * @param {number} commentId - ID du commentaire
 */
export const deleteComment = (commentId) => {
    return api.delete(`/api/comments/${commentId}`)
}

// =====================================
// API des Utilisateurs
// =====================================

/**
 * Recherche d'utilisateurs par nom
 * @param {string} q - Terme de recherche
 */
export const searchUsers = (q) => {
    return api.get(`/api/users/search`, { params: { q } })
}

/**
 * Récupération du profil public d'un utilisateur
 * @param {string} username - Nom d'utilisateur
 */
export const getPublicProfile = (username) => {
    return api.get(`/api/users/${username}`)
}

/**
 * Toggle follow/unfollow d'un utilisateur
 * @param {number} userId - ID de l'utilisateur
 */
export const toggleFollow = (userId) => {
    return api.post(`/api/users/${userId}/follow`)
}

/**
 * Accepter une demande de suivi
 * @param {number} userId - ID de l'utilisateur
 */
export const acceptFollow = (userId) => {
    return api.post(`/api/users/${userId}/follow/accept`)
}

/**
 * Rejeter une demande de suivi
 * @param {number} userId - ID de l'utilisateur
 */
export const rejectFollow = (userId) => {
    return api.post(`/api/users/${userId}/follow/reject`)
}

/**
 * Récupération de la liste des abonnements de l'utilisateur connecté
 */
export const getFollowings = () => {
    return api.get('/api/user/followings')
}

/**
 * Récupération de la liste des abonnés d'un utilisateur
 * @param {number} userId - ID de l'utilisateur
 */
export const getFollowers = (userId) => {
    return api.get(`/api/users/${userId}/followers`)
}

/**
 * Récupération de la liste des abonnements d'un utilisateur
 * @param {number} userId - ID de l'utilisateur
 */
export const getFollowing = (userId) => {
    return api.get(`/api/users/${userId}/following`)
}

// =====================================
// API des Notifications
// =====================================

/**
 * Récupération de toutes les notifications
 */
export const getNotifications = () => {
    return api.get('/api/notifications')
}

/**
 * Récupération du nombre de notifications non lues
 */
export const getUnreadNotificationsCount = () => {
    return api.get('/api/notifications/unread-count')
}

/**
 * Marquer toutes les notifications comme lues
 */
export const markAllNotificationsAsRead = () => {
    return api.post('/api/notifications/mark-all-read')
}

// =====================================
// API de Upload
// =====================================

/**
 * Upload d'une image vers le serveur
 * @param {File} file - Fichier image à uploader
 */
export const uploadImage = (file) => {
    const formData = new FormData()
    formData.append('image', file)
    return api.post('/api/upload/image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

// =====================================
// API de Chat (Messagerie)
// =====================================

/**
 * Récupération de toutes les conversations de chat
 */
export const getChatConversations = () => {
    return api.get('/api/chat/conversations')
}

/**
 * Récupération des messages d'une conversation
 * @param {number} conversationId - ID de la conversation
 */
export const getChatMessages = (conversationId) => {
    return api.get(`/api/chat/conversations/${conversationId}/messages`)
}

/**
 * Envoi d'un message dans une conversation
 * @param {number} conversationId - ID de la conversation
 * @param {Object} messageData - Contenu du message (texte ou sticker)
 */
export const sendChatMessage = (conversationId, messageData) => {
    return api.post(`/api/chat/conversations/${conversationId}/messages`, messageData)
}

/**
 * Marquer une conversation comme lue
 * @param {number} conversationId - ID de la conversation
 */
export const markChatAsRead = (conversationId) => {
    return api.post(`/api/chat/conversations/${conversationId}/read`)
}

/**
 * Récupération de la liste des stickers disponibles
 */
export const getChatStickers = () => {
    return api.get('/api/chat/stickers')
}

/**
 * Mise à jour du statut en ligne de l'utilisateur
 */
export const updateOnlineStatus = () => {
    return api.post('/api/chat/online-status')
}
