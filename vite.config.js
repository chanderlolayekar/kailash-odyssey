import path from 'path'
import { fileURLToPath } from 'url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  base: '/kailash-odyssey/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@base/sdk': path.resolve(__dirname, './src/lib/openSourceSdk.js'),
      '@base44/sdk': path.resolve(__dirname, './src/lib/openSourceSdk.js'),
    },
  },
})
