/**
 * Point d'entrée principal de l'application Vue.js 3
 * Configure Pinia (state management) et Vue Router
 */

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

// Import de Bootstrap (désactivé pour utiliser du CSS custom)
//import 'bootstrap/dist/css/bootstrap.min.css'
//import 'bootstrap'

// Création de l'instance de l'application
const app = createApp(App);

// Intégration de Pinia pour la gestion d'état globale
app.use(createPinia());

// Intégration du routeur Vue Router
app.use(router);

// Montage de l'application sur l'élément #app
app.mount("#app");
