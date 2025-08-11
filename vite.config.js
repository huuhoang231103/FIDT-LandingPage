import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/services': {
        target: 'http://localhost/be-ld',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})