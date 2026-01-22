
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    define: {
      // Garante que process.env.API_KEY exista no build, mesmo que vazio
      'process.env.API_KEY': JSON.stringify(env.API_KEY || '')
    }
  };
});