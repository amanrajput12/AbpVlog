import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // http://localhost:4000
  server:{
    proxy:{
      '/v1':{
        target:"http://localhost:4000"
      }
    }
  }
})
