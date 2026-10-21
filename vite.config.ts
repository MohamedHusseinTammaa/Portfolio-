import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages deploys to https://<user>.github.io/<repo>/
// Netlify serves the site from the domain root, so use '/' there
// (Netlify sets NETLIFY=true in its build environment).
export default defineConfig({
  plugins: [react()],
  base: process.env.NETLIFY ? '/' : '/Portfolio-/',
});
