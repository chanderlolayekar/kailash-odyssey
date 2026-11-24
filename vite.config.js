import path from 'path'
import { fileURLToPath } from 'url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const openSourceSdkPath = path.resolve(__dirname, './src/lib/openSourceSdk.js')

// https://vite.dev/config/
export default defineConfig({
  base: '/kailash-odyssey/',
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      { find: /^@base\/sdk(\/.*)?$/, replacement: openSourceSdkPath },
      { find: /^@base44\/sdk(\/.*)?$/, replacement: openSourceSdkPath },
    ],
  },
})
