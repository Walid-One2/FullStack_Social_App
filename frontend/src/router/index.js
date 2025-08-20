import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Profile from "../views/Profile.vue";
import UserProfile from "../views/UserProfile.vue";
import VerifyEmail from "../views/VerifyEmail.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import ResetPassword from "../views/ResetPassword.vue";

const routes = [
	{ path: "/", component: Home, meta: { requiresAuth: true } },
	{ path: "/login", component: Login, meta: { requiresGuest: true } },
	{ path: "/register", component: Register, meta: { requiresGuest: true } },
  { path: "/profile", component: Profile, meta: { requiresAuth: true } },
  { path: "/u/:username", component: UserProfile, meta: { requiresAuth: true } },
  { path: "/verify-email", component: VerifyEmail, meta: { requiresGuest: true } },
  { path: "/forgot-password", component: ForgotPassword, meta: { requiresGuest: true } },
  { path: "/reset-password", component: ResetPassword, meta: { requiresGuest: true } }
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	const authStore = useAuthStore();
	const isLoggedIn = authStore.isLoggedIn;
	
	// Pages qui nécessitent une authentification
	if (to.meta.requiresAuth) {
		if (!isLoggedIn) {
			// Pas connecté, rediriger vers login
			next("/login");
			return;
		}
		// Connecté, autoriser l'accès
		next();
		return;
	}
	
	// Pages qui nécessitent d'être un invité (non connecté)
	if (to.meta.requiresGuest) {
		if (isLoggedIn) {
			// Déjà connecté, rediriger vers la page d'accueil
			next("/");
			return;
		}
		// Pas connecté, autoriser l'accès aux pages login/register
		next();
		return;
	}
	
	// Pour toutes les autres pages, vérifier l'authentification
	if (!isLoggedIn) {
		next("/login");
		return;
	}
	
	next();
});

export default router;

: chore: création du Dockerfile backend - 2025-08-22T12:53:00 

: chore: installation de Pinia pour state management - 2025-08-22T16:20:00 

: feat(backend): ajout du champ media à Post - 2025-08-25T09:37:00 

: feat(backend): ajout des méthodes getLikesCount et getCommentsCount - 2025-08-25T18:46:00 

: feat(backend): configuration du fichier security.yaml - 2025-08-28T15:30:00 

: feat(backend): génération des clés JWT - 2025-08-28T18:01:00 

: feat(frontend): configuration de l'intercepteur pour JWT - 2025-09-01T11:51:00 

: style(frontend): stylisation du formulaire de connexion - 2025-09-01T16:28:00 

: feat(frontend): création de la vue Register.vue - 2025-09-01T19:20:00 

: style(frontend): stylisation du formulaire d'inscription - 2025-09-02T11:30:00 

: feat(frontend): affichage du temps relatif de publication - 2025-09-08T14:42:00 

: feat(backend): ajout des relations recipient, actor, post - 2025-09-12T19:26:00 

: feat(backend): création du NotificationController - 2025-09-13T10:44:00 

: feat(frontend): distinction visuelle lues/non lues - 2025-09-16T16:07:00 

: feat(backend): ajout support stickers dans Message - 2025-09-17T11:40:00 

: feat(backend): tri des conversations par dernière activité - 2025-09-18T09:52:00 

: feat(frontend): affichage du statut en ligne - 2025-09-20T16:18:00 

: feat(frontend): affichage des messages avec bulles - 2025-09-21T15:02:00 

: feat(frontend): zone de saisie de message - 2025-09-21T16:51:00 

: feat(frontend): marquer conversation comme lue à l'ouverture - 2025-09-22T13:32:00 

: feat(backend): implémentation de POST /api/user/reset-password - 2025-09-24T17:58:00 

: feat(backend): validation du token et expiration - 2025-09-25T10:33:00 

: feat(frontend): récupération du token depuis URL - 2025-09-25T19:16:00 

: feat(backend): recherche par nom partiel - 2025-09-27T18:38:00 

: feat: création d'index patterns dans Kibana - 2025-09-28T13:34:00 

: feat(backend): installation symfony/mercure-bundle - 2025-09-29T12:33:00 

: feat(backend): création du UploadController - 2025-09-30T18:46:00 

: feat(backend): implémentation de POST /api/upload/image - 2025-09-30T19:27:00 
