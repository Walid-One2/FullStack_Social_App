import { defineStore } from "pinia";
import axios from "axios";
import { api } from "../api";

export const useAuthStore = defineStore("auth", {
	state: () => ({
		token: localStorage.getItem("token") || null,
		user: null,
		isAuthenticated: false,
		isLoading: false,
	}),
	
	getters: {
		// Vérifier si l'utilisateur est authentifié
		isLoggedIn: (state) => {
			return !!state.token && state.isAuthenticated;
		}
	},
	
	actions: {
		// Initialiser l'authentification au démarrage
		async initAuth() {
			const token = localStorage.getItem("token");
			const userEmail = localStorage.getItem("userEmail");
			const savedProfile = localStorage.getItem("userProfile");
			
			if (token) {
				this.token = token;
				this.isAuthenticated = true;
				this.user = { email: userEmail };
				
				// Charger le profil sauvegardé d'abord
				if (savedProfile) {
					try {
						const profileData = JSON.parse(savedProfile);
						this.user = {
							...this.user,
							...profileData
						};
					} catch (e) {
						console.warn("Could not parse saved profile:", e);
					}
				}
				
				// Récupérer les données complètes du profil
				try {
					const profileResponse = await api.get("/api/user/profile");
					this.user = {
						...this.user,
						...profileResponse.data
					};
					// Mettre à jour le localStorage
					localStorage.setItem('userProfile', JSON.stringify(profileResponse.data));
				} catch (profileError) {
					console.warn("Could not load profile data on init:", profileError);
					// On continue même si le profil ne peut pas être chargé
				}
			}
		},
		
		async login(email, password) {
			this.isLoading = true;
			try {
				const response = await axios.post("http://localhost:8000/api/login_check", {
					email,
					password,
				});
				
				this.token = response.data.token;
				this.isAuthenticated = true;
				this.user = { email: email }; // Stocker l'email de l'utilisateur
				localStorage.setItem("token", this.token);
				localStorage.setItem("userEmail", email); // Sauvegarder l'email dans localStorage
				
				// Récupérer les données complètes du profil après login
				try {
					const profileResponse = await api.get("/api/user/profile");
					this.user = {
						...this.user,
						...profileResponse.data
					};
					// Sauvegarder les données du profil dans localStorage
					localStorage.setItem('userProfile', JSON.stringify(profileResponse.data));
				} catch (profileError) {
					console.warn("Could not load profile data after login:", profileError);
					// On continue même si le profil ne peut pas être chargé
				}
				
				return true;
			} catch (error) {
				console.error("Login failed", error);
				this.logout();
				
				// Check if it's an email verification error
				if (error.response?.data?.message?.includes('verify your email')) {
					throw new Error('Please verify your email address before logging in.');
				}
				
				return false;
			} finally {
				this.isLoading = false;
			}
		},
		
		logout() {
			this.token = null;
			this.user = null;
			this.isAuthenticated = false;
			localStorage.removeItem("token");
			localStorage.removeItem("userEmail");
			localStorage.removeItem("userProfile");
		},
		
		// Vérifier la validité du token
		async checkAuth() {
			if (!this.token) {
				this.logout();
				return false;
			}
			
			try {
				// Optionnel: vérifier avec le backend si le token est toujours valide
				// const response = await api.get("/api/user/profile");
				// this.user = response.data;
				this.isAuthenticated = true;
				return true;
			} catch (error) {
				console.error("Token validation failed", error);
				this.logout();
				return false;
			}
		},

		// Mettre à jour le profil utilisateur
		updateUserProfile(profileData) {
			this.user = {
				...this.user,
				...profileData
			};
			// Sauvegarder dans localStorage
			localStorage.setItem("userProfile", JSON.stringify(this.user));
		},

		// Mettre à jour le statut en ligne
		async updateOnlineStatus() {
			try {
				const { updateOnlineStatus } = await import('../api');
				await updateOnlineStatus();
			} catch (error) {
				console.error('Error updating online status:', error);
			}
		}
	},
});

: chore: ajout du fichier docker-compose.yml - 2025-08-20T12:37:00 

: chore: installation de LexikJWTAuthenticationBundle - 2025-08-21T19:31:00 

: chore: configuration de Vite - 2025-08-23T10:41:00 

: feat(backend): création de l'entité User - 2025-08-23T14:04:00 

: feat(backend): ajout du champ profilePhoto à User - 2025-08-24T12:34:00 

: feat(backend): ajout de la relation ManyToOne Post->User (author) - 2025-08-25T13:45:00 

: feat(backend): ajout de la propriété content à Comment - 2025-08-26T09:07:00 

: feat(backend): ajout de la relation Comment->User (author) - 2025-08-26T11:53:00 

: feat(backend): configuration des firewalls login et api - 2025-08-28T16:26:00 

: feat(backend): configuration des providers utilisateur - 2025-08-28T19:23:00 

: feat(backend): création du AuthController - 2025-08-29T13:33:00 

: feat(backend): implémentation de l'endpoint POST /api/login - 2025-08-29T18:03:00 

: feat(backend): gestion des erreurs d'authentification - 2025-08-29T18:48:00 

: test(backend): ajout de tests pour AuthController - 2025-08-30T09:53:00 

: feat(frontend): création du store auth.js avec Pinia - 2025-08-31T12:35:00 

: feat(frontend): implémentation de l'action login - 2025-08-31T13:36:00 

: feat(frontend): création des méthodes API d'authentification - 2025-09-01T12:48:00 

: feat(frontend): création de la vue Login.vue - 2025-09-01T16:11:00 

: feat(frontend): gestion des erreurs d'authentification - 2025-09-02T13:44:00 

: feat(frontend): implémentation de fetchFollowings - 2025-09-09T18:43:00 

: feat(frontend): chargement du profil public par nom d'utilisateur - 2025-09-11T11:00:00 

: feat(backend): tri par date décroissante - 2025-09-13T15:56:00 

: feat(frontend): création du composant NotificationDropdown.vue - 2025-09-16T10:34:00 

: style(frontend): design du dropdown de notifications - 2025-09-16T12:15:00 

: feat(backend): génération token avec expiration 30min - 2025-09-24T11:37:00 

: feat(frontend): redirection automatique vers login après 10s - 2025-09-26T11:00:00 
