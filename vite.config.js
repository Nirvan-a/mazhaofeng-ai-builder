import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.ASSETS_CDN_PATH || './',
});
