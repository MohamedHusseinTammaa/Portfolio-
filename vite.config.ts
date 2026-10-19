import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages deploys to https://<user>.github.io/<repo>/
// Change this to match your repo name (or '/' for a user/org site).
export default defineConfig({
  plugins: [react()],
  base: '/Portfolio-/',
});
