import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  // Prérendu : un dossier par route → /contact/index.html, donc l'URL
  // /contact/ exactement comme WordPress. Ne pas changer.
  ssgOptions: {
    dirStyle: 'nested',
    formatting: 'minify',
  },
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    // Le prérendu écrit un HTML par route : pas de chunk manuel à
    // forcer, Rollup découpe déjà par page grâce aux imports lazy.
  },
})
