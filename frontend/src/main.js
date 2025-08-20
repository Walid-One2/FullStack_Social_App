import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
//import 'bootstrap/dist/css/bootstrap.min.css'
//import 'bootstrap'

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");

: chore: initialisation du projet Vue.js 3 avec Vite - 2025-08-22T14:09:00 

: chore: installation de Vue Router - 2025-08-22T14:49:00 

: feat(backend): création du PostRepository - 2025-08-25T14:57:00 

: feat(backend): création de la migration initiale des entités - 2025-08-28T15:02:00 

: feat(frontend): création de la vue Login.vue - 2025-09-01T16:11:00 

: feat(frontend): création de la vue Register.vue - 2025-09-01T19:20:00 

: feat(backend): vérification de l'auteur pour l'édition - 2025-09-03T19:07:00 

: feat(frontend): création de la vue Home.vue pour le feed - 2025-09-07T09:15:00 

: feat(frontend): création du composant PostCard.vue - 2025-09-07T15:27:00 

: feat(frontend): affichage de l'auteur avec photo - 2025-09-08T10:37:00 

: feat(frontend): gestion de l'état des abonnements - 2025-09-10T10:12:00 

: feat(frontend): création de la vue Profile.vue - 2025-09-10T14:02:00 

: feat(frontend): affichage des informations utilisateur - 2025-09-10T15:46:00 

: feat(frontend): création de la vue UserProfile.vue - 2025-09-11T10:57:00 

: feat(frontend): création du composant FollowingsSidebar.vue - 2025-09-12T09:24:00 

: feat(frontend): création du composant NotificationDropdown.vue - 2025-09-16T10:34:00 

: feat(frontend): badge nombre de notifications non lues - 2025-09-16T14:42:00 

: feat(frontend): création du composant ChatSidebar.vue - 2025-09-19T14:57:00 

: feat(frontend): création du composant ChatModal.vue - 2025-09-20T17:54:00 

: feat(frontend): panel de sélection de stickers - 2025-09-21T19:34:00 

: feat(backend): migration pour colonnes vérification email - 2025-09-24T10:55:00 

: feat(frontend): création de la vue VerifyEmail.vue - 2025-09-25T16:10:00 

: feat(frontend): récupération du token depuis URL - 2025-09-25T19:16:00 

: feat(frontend): création de la vue ForgotPassword.vue - 2025-09-26T11:09:00 

: feat(frontend): création de la vue ResetPassword.vue - 2025-09-26T14:11:00 

: feat(backend): installation client Elasticsearch PHP - 2025-09-26T17:27:00 

: docs: ajout instructions Kibana dans README - 2025-09-28T12:46:00 

: feat(backend): publication update lors nouveau like - 2025-09-29T16:57:00 
