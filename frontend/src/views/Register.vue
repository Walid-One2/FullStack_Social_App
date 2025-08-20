<template>
  <div class="auth-container">
    <div class="card">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="email" type="email" placeholder="Email" required />
        </div>
        <div class="form-group">
          <label for="username">Username</label>
          <input v-model="username" type="text" placeholder="Username" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="password" type="password" placeholder="Password" required />
        </div>
        <button type="submit" class="btn success" :disabled="loading">
          <span v-if="loading">Registering…</span>
          <span v-else>Register</span>
        </button>
        <p v-if="error" class="alert error">{{ error }}</p>
        <p v-if="success" class="alert success">{{ successMessage }}</p>
        <p class="link">
          Already have an account? <router-link to="/login">Login</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { register as apiRegister } from "../api";

const email = ref("");
const username = ref("");
const password = ref("");
const error = ref(null);
const success = ref(false);
const successMessage = ref("");
const loading = ref(false);
const router = useRouter();

const handleRegister = async () => {
  error.value = null;
  success.value = false;
  loading.value = true;
  try {
    const response = await apiRegister(password.value, email.value, username.value);
    success.value = true;
    successMessage.value = response.data.message || "Account created successfully! Please check your email to verify your account.";
    // Don't redirect automatically, let user see the message
  } catch (e) {
    error.value = e?.response?.data?.message || "Registration failed";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #eef1f5;
}

.card {
  width: 350px;
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.profile-img-card {
  width: 90px;
  height: 90px;
  margin: 0 auto 20px;
  border-radius: 50%;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
  display: block;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

input:focus {
  border-color: #28a745;
}

.btn {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
}

.btn.success {
  background: #28a745;
}

.btn.success:hover {
  background: #1e7e34;
}

.alert {
  margin-top: 10px;
  padding: 10px;
  border-radius: 4px;
  font-size: 14px;
}

.alert.error {
  background: #f8d7da;
  color: #721c24;
}

.alert.success {
  background: #d4edda;
  color: #155724;
}

/* Responsive Design */
@media (max-width: 768px) {
  .auth-container {
    padding: 20px 15px;
    min-height: calc(100vh - 50px);
  }
  
  .auth-card {
    width: 100%;
    max-width: 400px;
    padding: 30px 20px;
  }
  
  .auth-header h1 {
    font-size: 1.8rem;
    margin-bottom: 8px;
  }
  
  .auth-header p {
    font-size: 0.9rem;
  }
  
  .form-group {
    margin-bottom: 18px;
  }
  
  .form-group label {
    font-size: 14px;
    margin-bottom: 6px;
  }
  
  .form-control {
    padding: 12px 14px;
    font-size: 16px; /* Évite le zoom sur iOS */
  }
  
  .btn {
    padding: 12px 20px;
    font-size: 15px;
  }
  
  .alert {
    font-size: 13px;
    padding: 8px;
  }
}

@media (max-width: 640px) {
  .auth-container {
    padding: 15px 10px;
  }
  
  .auth-card {
    padding: 25px 15px;
  }
  
  .auth-header h1 {
    font-size: 1.6rem;
  }
  
  .auth-header p {
    font-size: 0.85rem;
  }
  
  .form-control {
    padding: 11px 12px;
    font-size: 15px;
  }
  
  .btn {
    padding: 11px 18px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .auth-container {
    padding: 10px 8px;
  }
  
  .auth-card {
    padding: 20px 12px;
    border-radius: 8px;
  }
  
  .auth-header h1 {
    font-size: 1.4rem;
  }
  
  .auth-header p {
    font-size: 0.8rem;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-control {
    padding: 10px 11px;
    font-size: 14px;
  }
  
  .btn {
    padding: 10px 16px;
    font-size: 13px;
  }
  
  .alert {
    padding: 7px;
    font-size: 12px;
  }
}
</style>

: chore: installation de Pinia pour state management - 2025-08-22T16:20:00 

: chore: configuration de Vite - 2025-08-23T10:41:00 

: feat(backend): ajout des méthodes getLikesCount et getCommentsCount - 2025-08-25T18:46:00 

: feat(backend): implémentation de l'endpoint POST /api/user/register - 2025-08-29T16:04:00 

: feat(frontend): création du fichier api.js avec Axios - 2025-09-01T11:44:00 

: style(frontend): stylisation du formulaire de connexion - 2025-09-01T16:28:00 

: feat(frontend): création de la vue Register.vue - 2025-09-01T19:20:00 

: feat(frontend): validation du formulaire d'inscription - 2025-09-02T13:37:00 

: feat(backend): liste des utilisateurs ayant liké - 2025-09-05T13:30:00 

: feat(backend): vérification de l'auteur pour suppression - 2025-09-06T17:51:00 

: feat(frontend): chargement du profil public par nom d'utilisateur - 2025-09-11T11:00:00 

: style(frontend): design du profil public - 2025-09-11T19:25:00 

: feat(backend): personnalisation des messages de notification - 2025-09-15T10:16:00 

: feat(frontend): badge nombre de notifications non lues - 2025-09-16T14:42:00 

: feat(frontend): bouton tout marquer comme lu - 2025-09-16T16:46:00 

: feat(frontend): rafraîchissement automatique des messages - 2025-09-22T16:30:00 

: feat(backend): invalidation du token après usage - 2025-09-25T15:13:00 

: feat(frontend): récupération du token depuis URL - 2025-09-25T19:16:00 

: style(frontend): design formulaire mot de passe oublié - 2025-09-26T11:28:00 
