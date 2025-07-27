import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  define: {
    // Build-time environment variables for GitHub Pages
    // These will use .env values in development, fallbacks in production
    __EMAILJS_SERVICE_ID__: JSON.stringify(process.env.VITE_EMAILJS_SERVICE_ID || ''),
    __EMAILJS_TEMPLATE_ID__: JSON.stringify(process.env.VITE_EMAILJS_TEMPLATE_ID || ''),
    __EMAILJS_PUBLIC_KEY__: JSON.stringify(process.env.VITE_EMAILJS_PUBLIC_KEY || ''),
    __CONTACT_EMAIL__: JSON.stringify(process.env.VITE_CONTACT_EMAIL || 'aram@apra.dev'),
  },
}); 