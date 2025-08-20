<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from './stores/auth'
import Navbar from './components/Navbar.vue'
import PostModal from './components/PostModal.vue'

const route = useRoute()
const authStore = useAuthStore()

// Pages qui ne doivent pas afficher la navbar
const hideNavbarPages = ['/login', '/register', '/verify-email', '/forgot-password', '/reset-password']
const shouldShowNavbar = computed(() => {
  return !hideNavbarPages.includes(route.path)
})

// Gestion de la modale de post
const isPostModalVisible = ref(false)

const openPostModal = () => {
  isPostModalVisible.value = true
}

const closePostModal = () => {
  isPostModalVisible.value = false
}

const handlePostShare = async (postData) => {
  try {
    const { usePostsStore } = await import('./stores/posts')
    const postsStore = usePostsStore()
    await postsStore.addPost(postData)
  } catch (error) {
    console.error('Error creating post:', error)
  }
}

// Initialiser l'authentification au démarrage de l'application
onMounted(() => {
  authStore.initAuth()
  
  // Mettre à jour le statut en ligne toutes les 30 secondes
  if (authStore.isLoggedIn) {
    authStore.updateOnlineStatus()
    const statusInterval = setInterval(() => {
      if (authStore.isLoggedIn) {
        authStore.updateOnlineStatus()
      } else {
        clearInterval(statusInterval)
      }
    }, 30000) // 30 secondes
  }
})
</script>

<template>
  <div id="app">
    <Navbar v-if="shouldShowNavbar" @open-post-modal="openPostModal" />
    <router-view />
    <PostModal 
      :is-visible="isPostModalVisible"
      @close="closePostModal"
      @share="handlePostShare"
    />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
: chore: installation de API Platform - 2025-08-21T16:16:00 

: chore: ajout de Doctrine ORM - 2025-08-21T17:09:00 

: chore: configuration de Vite - 2025-08-23T10:41:00 

: feat(backend): création de l'entité Follow - 2025-08-27T16:52:00 

: feat(backend): création du FollowRepository - 2025-08-28T13:59:00 

: feat(backend): implémentation de GET /api/posts/{id} - 2025-09-03T16:35:00 

: feat(backend): vérification de l'auteur pour l'édition - 2025-09-03T19:07:00 

: feat(backend): liste des utilisateurs ayant liké - 2025-09-05T13:30:00 

: feat(frontend): gestion de l'état de chargement - 2025-09-07T12:57:00 

: feat(frontend): chargement du profil public par nom d'utilisateur - 2025-09-11T11:00:00 

: feat(backend): création du NotificationController - 2025-09-13T10:44:00 

: feat(backend): implémentation de GET /api/notifications/unread-count - 2025-09-13T17:18:00 

: feat(backend): sérialisation des notifications avec relations - 2025-09-14T10:03:00 

: feat(frontend): création du store notifications.js - 2025-09-15T16:02:00 

: style(frontend): design du dropdown de notifications - 2025-09-16T12:15:00 

: feat(backend): génération token avec expiration 30min - 2025-09-24T11:37:00 

: feat(frontend): suggestions en temps réel - 2025-09-28T10:49:00 

: feat(backend): implémentation de POST /api/upload/image - 2025-09-30T19:27:00 
