import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5555
  },
  resolve: {
    alias: {
      assets: '/src/assets',
      components: '/src/components',
      data: '/src/data',
      pages: '/src/pages',
      layouts: '/src/layouts',
      types: '/src/types',
      services: '/src/services',
      store: '/src/store',
    }
  }
})
