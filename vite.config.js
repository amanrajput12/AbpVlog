import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/v1': {
        target: 'https://abpvlog.onrender.com',
        changeOrigin: true,  // This will change the origin of the host header
         
      }
    }
  }
})
