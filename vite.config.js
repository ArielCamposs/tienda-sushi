import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // Mejorar code splitting para reducir JavaScript no utilizado
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar vendors grandes en chunks individuales
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'framer-motion': ['framer-motion'],
          'swiper': ['swiper'],
          'marquee': ['react-fast-marquee'],
        },
      },
    },
    // Optimizar tamaño de chunks
    chunkSizeWarningLimit: 500,
  },
})
