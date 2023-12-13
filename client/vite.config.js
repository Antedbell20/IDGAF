import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3009,
    open: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:8099',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
