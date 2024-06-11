import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Listen on all network interfaces
    port: 5173, // You can change this port if needed
    strictPort: true, // Make sure the port is used, otherwise exit
  },
});