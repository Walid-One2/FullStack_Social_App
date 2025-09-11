/**
 * Store Pinia - Authentification et gestion de session
 * Gère la connexion, déconnexion, et la persistance de l'utilisateur
 * Maintient le statut en ligne et synchronise avec localStorage
 */

import { defineStore } from "pinia";
import axios from "axios";
import { api } from "../api";

export const useAuthStore = defineStore("auth", {
	// État global de l'authentification
	state: () => ({
		token: localStorage.getItem("token") || null, // Token JWT récupéré du localStorage
		user: null, // Données de l'utilisateur connecté
		isAuthenticated: false, // Statut d'authentification
		isLoading: false, // Indicateur de chargement pour les requêtes
	}),

	getters: {
		// Vérifier si l'utilisateur est authentifié
		isLoggedIn: (state) => {
			return !!state.token && state.isAuthenticated;
		}
	},

	actions: {
		/**
		 * Initialise l'authentification au démarrage de l'application
		 * Restaure le token et les données utilisateur depuis localStorage
		 * Récupère les données complètes du profil depuis l'API
		 */
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

		/**
		 * Connexion de l'utilisateur
		 * @param {string} email - Email de l'utilisateur
		 * @param {string} password - Mot de passe
		 * @returns {boolean} - true si conn exion réussie, false sinon
		 * @throws {Error} - Si l'email n'est pas vérifié
		 */
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

				// Vérifier si c'est une erreur de vérification d'email
				if (error.response?.data?.message?.includes('verify your email')) {
					throw new Error('Veuillez vérifier votre adresse email avant de vous connecter.');
				}

				return false;
			} finally {
				this.isLoading = false;
			}
		},

		/**
		 * Déconnexion de l'utilisateur
		 * Nettoie le state et supprime toutes les données du localStorage
		 */
		logout() {
			this.token = null;
			this.user = null;
			this.isAuthenticated = false;
			localStorage.removeItem("token");
			localStorage.removeItem("userEmail");
			localStorage.removeItem("userProfile");
		},

		/**
		 * Vérifie la validité du token JWT
		 * @returns {boolean} - true si le token est valide
		 */
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

		/**
		 * Met à jour les données du profil utilisateur
		 * Fusionne les nouvelles données avec l'existant et sauvegarde dans localStorage
		 * @param {Object} profileData - Nouvelles données du profil
		 */
		updateUserProfile(profileData) {
			this.user = {
				...this.user,
				...profileData
			};
			// Sauvegarder dans localStorage
			localStorage.setItem("userProfile", JSON.stringify(this.user));
		},

		/**
		 * Met à jour le statut en ligne de l'utilisateur
		 * Appelé périodiquement toutes les 30 secondes depuis App.vue
		 */
		async updateOnlineStatus() {
			try {
				const { updateOnlineStatus } = await import('../api');
				await updateOnlineStatus();
			} catch (error) {
				console.error('Erreur lors de la mise à jour du statut en ligne:', error);
			}
		}
	},
});

