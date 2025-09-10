/**
 * Composant principal App.vue
 * Gère l'affichage de la navbar et la modale de création de post
 * Initialise l'authentification et le statut en ligne au montage
 */

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from './stores/auth'
import Navbar from './components/Navbar.vue'
import PostModal from './components/PostModal.vue'

const route = useRoute()
const authStore = useAuthStore()

// Liste des pages qui ne doivent pas afficher la navbar (pages publiques)
const hideNavbarPages = ['/login', '/register', '/verify-email', '/forgot-password', '/reset-password']

// Calculer si la navbar doit être affichée en fonction de la route actuelle
const shouldShowNavbar = computed(() => {
  return !hideNavbarPages.includes(route.path)
})

// Gestion de l'état de la modale de création de post
const isPostModalVisible = ref(false)

// Ouvre la modale de création de post
const openPostModal = () => {
  isPostModalVisible.value = true
}

// Ferme la modale de création de post
const closePostModal = () => {
  isPostModalVisible.value = false
}

// Gestion du partage d'un nouveau post
const handlePostShare = async (postData) => {
  try {
    // Import dynamique du store pour éviter les dépendances circulaires
    const { usePostsStore } = await import('./stores/posts')
    const postsStore = usePostsStore()
    await postsStore.addPost(postData)
  } catch (error) {
    console.error('Erreur lors de la création du post:', error)
  }
}

// Initialisation au démarrage de l'application
onMounted(() => {
  // Restaurer l'authentification depuis localStorage
  authStore.initAuth()
  
  // Mise à jour périodique du statut en ligne (toutes les 30 secondes)
  if (authStore.isLoggedIn) {
    authStore.updateOnlineStatus()
    const statusInterval = setInterval(() => {
      if (authStore.isLoggedIn) {
        authStore.updateOnlineStatus()
      } else {
        // Nettoyer l'intervalle si l'utilisateur se déconnecte
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
