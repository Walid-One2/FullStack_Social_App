<template>
  <div 
    class="followers-tooltip" 
    v-if="isVisible && users.length > 0"
    :style="tooltipStyle"
    @mouseenter="emit('mouseenter')"
    @mouseleave="emit('mouseleave')"
  >
    <div class="tooltip-header">
      <h4>{{ title }}</h4>
    </div>
    <div class="tooltip-content">
      <div 
        v-for="user in users" 
        :key="user.id" 
        class="user-item"
        @click="goToUserProfile(user.username)"
      >
        <img 
          :src="user.profilePhoto || defaultAvatar" 
          :alt="user.username"
          class="user-avatar"
        />
        <span class="username">{{ user.username }}</span>
      </div>
      <div v-if="hasMore" class="more-users">
        <span>and {{ totalCount - users.length }} more...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  users: {
    type: Array,
    default: () => []
  },
  totalCount: {
    type: Number,
    default: 0
  },
  title: {
    type: String,
    default: 'Users'
  },
  position: {
    type: Object,
    default: () => ({ x: 0, y: 0 })
  }
})

const emit = defineEmits(['close', 'mouseenter', 'mouseleave'])

const router = useRouter()
const defaultAvatar = 'https://via.placeholder.com/32x32?text=Avatar'

const hasMore = computed(() => {
  return props.totalCount > props.users.length
})

const tooltipStyle = computed(() => {
  const x = props.position.x
  const y = props.position.y
  const tooltipWidth = 300 // Largeur approximative du tooltip
  const viewportWidth = window.innerWidth
  
  // Ajuster la position X si le tooltip sort de l'écran à droite
  let adjustedX = x
  if (x + tooltipWidth > viewportWidth) {
    adjustedX = viewportWidth - tooltipWidth - 10
  }
  
  // S'assurer que le tooltip ne sorte pas à gauche
  if (adjustedX < 10) {
    adjustedX = 10
  }
  
  return {
    left: `${adjustedX}px`,
    top: `${y}px`
  }
})

const goToUserProfile = (username) => {
  router.push(`/u/${encodeURIComponent(username)}`)
  emit('close')
}

// Fermer le tooltip en cliquant à l'extérieur
const handleClickOutside = (event) => {
  if (!event.target.closest('.followers-tooltip')) {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.followers-tooltip {
  position: fixed;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  border-radius: 8px;
  padding: 16px;
  max-width: 300px;
  max-height: 400px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
}

.tooltip-header {
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.tooltip-header h4 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: white;
}

.tooltip-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.user-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.username {
  font-size: 14px;
  font-weight: 500;
  color: white;
  flex: 1;
}

.more-users {
  padding: 8px;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  font-style: italic;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: 8px;
}

/* Scrollbar styling */
.followers-tooltip::-webkit-scrollbar {
  width: 4px;
}

.followers-tooltip::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

.followers-tooltip::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

.followers-tooltip::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>

: chore: création du projet Symfony 7 - 2025-08-21T14:20:00 

: docs: ajout du README.md avec instructions de démarrage - 2025-08-22T13:07:00 

: chore: installation de Pinia pour state management - 2025-08-22T16:20:00 

: chore: installation d'Axios pour les requêtes HTTP - 2025-08-22T18:39:00 

: feat(backend): configuration de la clé primaire composée - 2025-08-28T13:53:00 

: feat(backend): création de la migration initiale des entités - 2025-08-28T15:02:00 

: feat(backend): vérification de l'auteur pour l'édition - 2025-09-03T19:07:00 

: feat(backend): gestion de la suppression du like - 2025-09-04T19:38:00 

: feat(backend): liste des utilisateurs ayant liké - 2025-09-05T13:30:00 

: feat(frontend): affichage du temps relatif de publication - 2025-09-08T14:42:00 

: feat(backend): suppression des notifications en cascade - 2025-09-15T12:15:00 

: feat(frontend): création du store notifications.js - 2025-09-15T16:02:00 

: feat(frontend): bouton tout marquer comme lu - 2025-09-16T16:46:00 

: feat(backend): création de l'entité Conversation - 2025-09-16T19:47:00 

: feat(backend): ajout support stickers dans Message - 2025-09-17T11:40:00 

: feat(frontend): affichage du dernier message preview - 2025-09-20T13:21:00 

: feat(frontend): création de la vue VerifyEmail.vue - 2025-09-25T16:10:00 

: feat(backend): indexation des utilisateurs - 2025-09-27T12:21:00 
