<template>
  <div class="home-container">
    <div class="home-layout">
      <!-- Sidebar du chat -->
      <ChatSidebar ref="chatSidebarRef" @open-conversation="openConversation" />
      
      <!-- Contenu principal -->
      <div class="home-content">
        <!-- Message de bienvenue si aucun post -->
        <div v-if="!postsStore.isLoading && postsStore.posts.length === 0" class="welcome-message">
          <h1>Welcome to LinkMe</h1>
          <p>Your social network is ready! Start by creating your first post.</p>
        </div>
        
        <!-- Liste des posts -->
        <div v-else class="posts-container">
          <PostCard 
            v-for="post in postsStore.posts" 
            :key="post.id" 
            :post="post"
          />
        </div>
        
        <!-- Loading state -->
        <div v-if="postsStore.isLoading" class="loading-container">
          <div class="loading-spinner"></div>
          <p>Loading posts...</p>
        </div>
        
        <!-- Error state -->
        <div v-if="postsStore.error" class="error-container">
          <p>{{ postsStore.error }}</p>
          <button @click="loadPosts" class="retry-btn">Retry</button>
        </div>
      </div>
      
      <!-- Sidebar des followings -->
      <FollowingsSidebar ref="followingsSidebarRef" />
    </div>
    
    <!-- Modal de chat -->
    <ChatModal 
      :is-visible="isChatModalVisible"
      :conversation="selectedConversation"
      @close="closeChatModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { usePostsStore } from '../stores/posts'
import { useAuthStore } from '../stores/auth'
import PostCard from '../components/PostCard.vue'
import FollowingsSidebar from '../components/FollowingsSidebar.vue'
import ChatSidebar from '../components/ChatSidebar.vue'
import ChatModal from '../components/ChatModal.vue'

const postsStore = usePostsStore()
const authStore = useAuthStore()
const followingsSidebarRef = ref(null)
const chatSidebarRef = ref(null)
const isChatModalVisible = ref(false)
const selectedConversation = ref(null)

const loadPosts = () => {
  postsStore.fetchPosts()
}

const openConversation = (conversation) => {
  selectedConversation.value = conversation
  isChatModalVisible.value = true
}

const closeChatModal = () => {
  isChatModalVisible.value = false
  selectedConversation.value = null
}

// Recharger les posts quand l'utilisateur se connecte
watch(() => authStore.isLoggedIn, (isLoggedIn) => {
  if (isLoggedIn) {
    loadPosts()
  }
})

onMounted(() => {
  if (authStore.isLoggedIn) {
    loadPosts()
  }
})
</script>

<style scoped>
.home-container {
  min-height: calc(100vh - 60px);
  background-color: #fafafa;
  padding: 20px;
}

.home-layout {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  max-width: 1400px;
  margin: 0 auto;
  justify-content: space-between;
}

.home-content {
  max-width: 600px;
  width: 100%;
}

.welcome-message {
  text-align: center;
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.welcome-message h1 {
  color: #333;
  margin-bottom: 16px;
  font-size: 2.5rem;
}

.welcome-message p {
  color: #666;
  margin-bottom: 30px;
  font-size: 1.1rem;
}

.posts-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #333;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-container {
  text-align: center;
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.error-container p {
  color: #dc3545;
  margin-bottom: 16px;
}

.retry-btn {
  background: #333;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.2s ease;
}

.retry-btn:hover {
  background: #555;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .home-layout {
    max-width: 1000px;
  }
}

@media (max-width: 1024px) {
  .home-layout {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
  
  .home-content {
    max-width: 100%;
    order: 1;
  }
  
  .home-container {
    padding: 15px;
  }
}

@media (max-width: 768px) {
  .home-container {
    padding: 10px;
    min-height: calc(100vh - 50px);
  }
  
  .home-layout {
    gap: 10px;
  }
  
  .home-content {
    width: 100%;
  }
  
  .posts-container {
    gap: 15px;
  }
  
  .welcome-message {
    padding: 25px 15px;
    margin: 0 5px;
  }
  
  .welcome-message h1 {
    font-size: 1.8rem;
    margin-bottom: 12px;
  }
  
  .welcome-message p {
    font-size: 1rem;
    margin-bottom: 20px;
  }
  
  .loading-container,
  .error-container {
    padding: 30px 15px;
    margin: 0 5px;
  }
  
  .retry-btn {
    padding: 8px 16px;
    font-size: 13px;
  }
}

@media (max-width: 640px) {
  .home-container {
    padding: 8px;
  }
  
  .home-layout {
    gap: 8px;
  }
  
  .posts-container {
    gap: 12px;
  }
  
  .welcome-message {
    padding: 20px 12px;
    margin: 0;
  }
  
  .welcome-message h1 {
    font-size: 1.5rem;
  }
  
  .welcome-message p {
    font-size: 0.9rem;
  }
  
  .loading-container,
  .error-container {
    padding: 25px 12px;
    margin: 0;
  }
  
  .loading-spinner {
    width: 35px;
    height: 35px;
    border-width: 3px;
  }
}

@media (max-width: 480px) {
  .home-container {
    padding: 5px;
  }
  
  .home-layout {
    gap: 5px;
  }
  
  .posts-container {
    gap: 10px;
  }
  
  .welcome-message {
    padding: 15px 10px;
  }
  
  .welcome-message h1 {
    font-size: 1.3rem;
  }
  
  .welcome-message p {
    font-size: 0.85rem;
  }
  
  .loading-container,
  .error-container {
    padding: 20px 10px;
  }
  
  .loading-spinner {
    width: 30px;
    height: 30px;
  }
}
</style>

: chore: initialisation du projet Vue.js 3 avec Vite - 2025-08-22T14:09:00 

: feat(backend): ajout des méthodes getLikesCount et getCommentsCount - 2025-08-25T18:46:00 

: feat(backend): création de l'entité Like - 2025-08-26T16:09:00 

: feat(backend): création de l'entité Follow - 2025-08-27T16:52:00 

: feat(backend): configuration du fichier security.yaml - 2025-08-28T15:30:00 

: feat(frontend): création de la vue Home.vue pour le feed - 2025-09-07T09:15:00 

: style(frontend): mise en page du feed avec grille - 2025-09-07T11:16:00 

: feat(frontend): rafraîchissement automatique du feed - 2025-09-07T11:28:00 

: feat(frontend): affichage de l'auteur avec photo - 2025-09-08T10:37:00 

: feat(backend): logique toggle follow/unfollow - 2025-09-08T17:30:00 

: feat(frontend): gestion de l'état des abonnements - 2025-09-10T10:12:00 

: feat(backend): suppression des notifications en cascade - 2025-09-15T12:15:00 

: feat(backend): ajout support stickers dans Message - 2025-09-17T11:40:00 

: feat(backend): mise à jour de lastMessageAt et preview - 2025-09-19T09:49:00 

: feat(frontend): badge messages non lus par conversation - 2025-09-20T13:23:00 

: feat(frontend): création du composant ChatModal.vue - 2025-09-20T17:54:00 

: feat(frontend): panel de sélection de stickers - 2025-09-21T19:34:00 

: feat(backend): génération token sécurisé lors inscription - 2025-09-23T13:44:00 

: feat(frontend): redirection automatique vers login après 10s - 2025-09-26T11:00:00 

: style(frontend): design formulaire mot de passe oublié - 2025-09-26T11:28:00 

: feat(backend): installation client Elasticsearch PHP - 2025-09-26T17:27:00 

: feat(frontend): mise à jour temps réel du feed - 2025-09-30T09:15:00 
