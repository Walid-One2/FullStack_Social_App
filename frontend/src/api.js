// frontend/src/api.js
import axios from 'axios'

export const API_HOST = 'http://localhost:8000' // Change to your API host

export const api = axios.create({
	baseURL: API_HOST,
})

// Ajouter le token d'authentification aux requêtes
api.interceptors.request.use((config) => {
	const token = localStorage.getItem('token')
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

export const register = (password, email, name) => {
    return api.post('/api/user/register', { password, email, name })
}

export const getProfile = () => {
	return api.get('/api/user/profile')
}

export const updateProfile = (profileData) => {
	return api.put('/api/user/profile', profileData)
}

// Posts API
export const getPosts = () => {
	return api.get('/api/posts')
}

export const createPost = (postData) => {
	return api.post('/api/posts', postData)
}

export const getPost = (id) => {
	return api.get(`/api/posts/${id}`)
}

export const updatePost = (id, postData) => {
	return api.put(`/api/posts/${id}`, postData)
}

export const deletePost = (id) => {
	return api.delete(`/api/posts/${id}`)
}

export const getUserPosts = (userId) => {
	return api.get(`/api/posts/user/${userId}`)
}

// Likes API
export const toggleLike = (postId) => {
	return api.post(`/api/posts/${postId}/like`)
}

export const getLikeStatus = (postId) => {
	return api.get(`/api/posts/${postId}/like`)
}

// Comments API
export const getComments = (postId) => {
	return api.get(`/api/posts/${postId}/comments`)
}

export const createComment = (postId, content) => {
	return api.post(`/api/posts/${postId}/comments`, { content })
}

export const deleteComment = (commentId) => {
	return api.delete(`/api/comments/${commentId}`)
}

// Users API (search/public profile/follow)
export const searchUsers = (q) => {
    return api.get(`/api/users/search`, { params: { q } })
}

export const getPublicProfile = (username) => {
    return api.get(`/api/users/${username}`)
}

export const toggleFollow = (userId) => {
    return api.post(`/api/users/${userId}/follow`)
}

export const acceptFollow = (userId) => {
    return api.post(`/api/users/${userId}/follow/accept`)
}

export const rejectFollow = (userId) => {
    return api.post(`/api/users/${userId}/follow/reject`)
}

export const getFollowings = () => {
    return api.get('/api/user/followings')
}

// Notifications API
export const getNotifications = () => {
    return api.get('/api/notifications')
}

export const getUnreadNotificationsCount = () => {
    return api.get('/api/notifications/unread-count')
}

export const markAllNotificationsAsRead = () => {
    return api.post('/api/notifications/mark-all-read')
}

// Upload API
export const uploadImage = (file) => {
    const formData = new FormData()
    formData.append('image', file)
    return api.post('/api/upload/image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

// Chat API
export const getChatConversations = () => {
    return api.get('/api/chat/conversations')
}

export const getChatMessages = (conversationId) => {
    return api.get(`/api/chat/conversations/${conversationId}/messages`)
}

export const sendChatMessage = (conversationId, messageData) => {
    return api.post(`/api/chat/conversations/${conversationId}/messages`, messageData)
}

export const markChatAsRead = (conversationId) => {
    return api.post(`/api/chat/conversations/${conversationId}/read`)
}

export const getChatStickers = () => {
    return api.get('/api/chat/stickers')
}

export const updateOnlineStatus = () => {
    return api.post('/api/chat/online-status')
}

// Followers/Following API
export const getFollowers = (userId) => {
    return api.get(`/api/users/${userId}/followers`)
}

export const getFollowing = (userId) => {
    return api.get(`/api/users/${userId}/following`)
}

// Likes API
export const getLikesUsers = (postId) => {
    return api.get(`/api/posts/${postId}/likes`)
}
: chore: configuration de la base de données MySQL - 2025-08-21T19:00:00 

: chore: installation de LexikJWTAuthenticationBundle - 2025-08-21T19:31:00 

: feat(backend): ajout des propriétés email et password à User - 2025-08-23T14:14:00 

: feat(backend): génération des clés JWT - 2025-08-28T18:01:00 

: feat(backend): génération du token JWT lors de la connexion - 2025-08-29T18:13:00 

: feat(frontend): stockage du token JWT dans localStorage - 2025-08-31T15:04:00 

: feat(frontend): configuration de l'intercepteur pour JWT - 2025-09-01T11:51:00 

: feat(backend): liste des utilisateurs ayant liké - 2025-09-05T13:30:00 

: feat(backend): implémentation de DELETE /api/comments/{id} - 2025-09-06T15:32:00 

: feat(frontend): création du store posts.js - 2025-09-06T18:03:00 

: feat(frontend): création de la vue Home.vue pour le feed - 2025-09-07T09:15:00 

: feat(frontend): affichage du contenu et média - 2025-09-08T12:09:00 

: style(frontend): design du header de profil - 2025-09-10T14:09:00 

: feat(frontend): implémentation de markAllAsRead - 2025-09-15T19:54:00 

: feat(backend): normalisation user1/user2 (id min/max) - 2025-09-16T19:50:00 

: feat(backend): création des repositories Conversation et Message - 2025-09-17T13:13:00 

: feat(frontend): affichage des messages avec bulles - 2025-09-21T15:02:00 

: feat(backend): envoi email de vérification - 2025-09-23T14:09:00 

: feat(backend): installation client Elasticsearch PHP - 2025-09-26T17:27:00 

: feat(backend): publication update lors nouveau like - 2025-09-29T16:57:00 

: feat(backend): implémentation de POST /api/upload/image - 2025-09-30T19:27:00 
