<template>
  <div class="user-dropdown" v-if="isVisible" @click.stop>
    <div class="dropdown-content">
      <button class="dropdown-item" @click="goToProfile">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        Profil
      </button>
      
      <button class="dropdown-item" @click="handleLogout">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16,17 21,12 16,7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
        Logout
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])
const router = useRouter()
const auth = useAuthStore()

const goToProfile = () => {
  emit('close')
  router.push('/profile')
}

const handleLogout = () => {
  emit('close')
  auth.logout()
  router.push('/login')
}
</script>

<style scoped>
.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid #e1e5e9;
  z-index: 1000;
  min-width: 160px;
  overflow: hidden;
}

.dropdown-content {
  padding: 8px 0;
}

.dropdown-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s ease;
  text-align: left;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

.dropdown-item svg {
  color: #666;
  flex-shrink: 0;
}
</style>

: chore: installation de API Platform - 2025-08-21T16:16:00 

: feat(backend): création de l'entité Like - 2025-08-26T16:09:00 

: feat(backend): création du FollowRepository - 2025-08-28T13:59:00 

: feat(backend): configuration du fichier security.yaml - 2025-08-28T15:30:00 

: feat(backend): configuration des providers utilisateur - 2025-08-28T19:23:00 

: feat(backend): implémentation de GET /api/users/search - 2025-08-31T09:15:00 

: feat(frontend): création du fichier api.js avec Axios - 2025-09-01T11:44:00 

: feat(frontend): validation du formulaire de connexion - 2025-09-01T18:47:00 

: feat(backend): implémentation de POST /api/posts (création) - 2025-09-02T18:02:00 

: feat(backend): implémentation de GET /api/posts/{id}/like - 2025-09-05T11:13:00 

: feat(backend): liste des utilisateurs ayant liké - 2025-09-05T13:30:00 

: feat(frontend): implémentation de fetchFollowings - 2025-09-09T18:43:00 

: feat(frontend): gestion de l'état des abonnements - 2025-09-10T10:12:00 

: feat(frontend): chargement des posts de l'utilisateur - 2025-09-11T09:10:00 

: feat(backend): tri par date décroissante - 2025-09-13T15:56:00 

: feat(backend): méthode getTimeAgo pour temps relatif - 2025-09-14T11:25:00 

: feat(backend): création de notification lors d'un like - 2025-09-14T14:12:00 

: feat(frontend): affichage de la liste des notifications - 2025-09-16T15:59:00 

: feat(backend): création du ChatController - 2025-09-17T17:31:00 

: feat(backend): implémentation de POST /api/chat/online-status - 2025-09-19T14:14:00 

: feat(frontend): badge messages non lus par conversation - 2025-09-20T13:23:00 

: feat(frontend): affichage des messages avec bulles - 2025-09-21T15:02:00 

: feat(frontend): zone de saisie de message - 2025-09-21T16:51:00 

: feat(backend): génération token sécurisé lors inscription - 2025-09-23T13:44:00 

: feat(backend): mise à jour du mot de passe - 2025-09-25T13:46:00 

: feat(backend): invalidation du token après usage - 2025-09-25T15:13:00 

: feat(frontend): redirection automatique vers login après 10s - 2025-09-26T11:00:00 

: feat(frontend): validation confirmation mot de passe - 2025-09-26T15:42:00 

: feat(backend): installation client Elasticsearch PHP - 2025-09-26T17:27:00 
