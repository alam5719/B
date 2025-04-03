import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 5173, // Use Render's dynamic PORT if available
    host: '0.0.0.0',  // Bind to all network interfaces to allow external access
  },
});
