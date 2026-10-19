import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves this repo at https://chesleyguo.github.io/deveng_portfolio/
  base: '/deveng_portfolio/',
});
