import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Remove the `external` option or only use it if you have a specific reason.
    }
  },
  define: {
    'process.env': process.env
  }
});