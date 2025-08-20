<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>Post</h3>
        <button class="close-btn" @click="closeModal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <div class="modal-body">
        <PostCard :post="post" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  post: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 16px;
  border-bottom: 1px solid #e1e5e9;
}

.modal-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  transition: background-color 0.2s ease;
}

.close-btn:hover {
  background-color: #f5f5f5;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 0;
}

/* Animation d'ouverture */
.modal-overlay {
  animation: fadeIn 0.2s ease-out;
}

.modal-content {
  animation: slideUp 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .modal-content {
    margin: 0 16px;
    max-height: 95vh;
  }
  
  .modal-header {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>

: feat(backend): implémentation de UserInterface pour sécurité - 2025-08-24T13:08:00 

: feat(frontend): création du fichier api.js avec Axios - 2025-09-01T11:44:00 

: feat(backend): implémentation de GET /api/posts/{id}/like - 2025-09-05T11:13:00 

: feat(backend): vérification de l'auteur pour suppression - 2025-09-06T17:51:00 

: feat(frontend): rafraîchissement automatique du feed - 2025-09-07T11:28:00 

: feat(frontend): création du composant FollowingsSidebar.vue - 2025-09-12T09:24:00 

: feat(backend): création de notification lors d'un follow - 2025-09-15T09:03:00 

: feat(frontend): affichage du statut en ligne - 2025-09-20T16:18:00 

: feat(backend): génération token avec expiration 30min - 2025-09-24T11:37:00 

: feat(backend): mise à jour du mot de passe - 2025-09-25T13:46:00 

: feat(frontend): redirection automatique vers login après 10s - 2025-09-26T11:00:00 

: feat(backend): installation client Elasticsearch PHP - 2025-09-26T17:27:00 

: feat(backend): recherche par nom partiel - 2025-09-27T18:38:00 

: feat(backend): installation symfony/mercure-bundle - 2025-09-29T12:33:00 

: feat(backend): publication update lors nouveau post - 2025-09-29T16:12:00 

: feat(backend): publication update lors nouveau like - 2025-09-29T16:57:00 
