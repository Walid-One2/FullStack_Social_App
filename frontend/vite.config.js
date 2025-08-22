/**
 * Configuration Vite pour le projet LinkMe
 * Vite est l'outil de build moderne pour Vue.js 3
 * https://vite.dev/config/
 */

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Configuration de base de Vite avec le plugin Vue
export default defineConfig({
  plugins: [vue()],
})
