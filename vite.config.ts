import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
      '@app': path.resolve(__dirname, 'app'),
      '@shared': path.resolve(__dirname, 'app/shared'),
      '@backend': path.resolve(__dirname, 'app/backend'),
      '@renderer': path.resolve(__dirname, 'app/renderer'),
      '@components': path.resolve(__dirname, 'app/renderer/components'),
      '@hooks': path.resolve(__dirname, 'app/renderer/hooks'),
      '@views': path.resolve(__dirname, 'app/renderer/views'),
      '@assets': path.resolve(__dirname, 'assets')
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['zustand', 'date-fns', 'lodash', 'clsx', 'lucide-react'],
          utils: ['axios', 'zod', 'uuid', 'immer'],
          electron: ['electron-store', 'electron-log']
        }
      }
    }
  },
  server: {
    port: 3000,
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost'
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
})
