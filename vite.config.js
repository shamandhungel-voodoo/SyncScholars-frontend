import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    
    // Server configuration
    server: {
      port: 3000,
      host: 'localhost', // Changed from 'true' to 'localhost'
      open: true, // Automatically open browser
      cors: true, // Enable CORS
      
      // Proxy configuration for development
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
        },
        '/socket.io': {
          target: env.VITE_API_URL || 'http://localhost:5000',
          ws: true, // Important for WebSocket
          changeOrigin: true,
          secure: false
        }
      },
      
      // HMR configuration
      hmr: {
        overlay: true
      }
    },
    
    // Build configuration
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
      minify: mode === 'production' ? 'terser' : false,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['@chakra-ui/react', '@emotion/react', '@emotion/styled', 'framer-motion'],
            'utils-vendor': ['axios', 'socket.io-client', 'lucide-react']
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
        }
      },
      target: 'es2020'
    },
    
    // Preview configuration (for built app)
    preview: {
      port: 3000,
      host: true
    },
    
    // Resolve configuration
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@assets': path.resolve(__dirname, './src/assets')
      }
    },
    
    // CSS configuration
    css: {
      devSourcemap: true
    },
    
    // Environment variables
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0')
    },
    
    // Optimize dependencies
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@chakra-ui/react',
        '@emotion/react',
        '@emotion/styled',
        'framer-motion',
        'axios',
        'socket.io-client',
        'lucide-react'
      ]
    }
  }
})