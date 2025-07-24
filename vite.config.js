import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Uncomment the next line if deploying to a subpath, e.g. GitHub Pages
  // base: '/aram-ap.github.io/',
}); 