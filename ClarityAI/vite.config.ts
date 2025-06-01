import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import Checker from 'vite-plugin-checker';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Checker({
      typescript: true, 
      overlay: true}),
  ],
})
