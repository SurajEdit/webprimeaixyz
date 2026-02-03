
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Essential for GitHub Pages sub-directory deployment
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild', // Use built-in esbuild to avoid 'terser not found' errors
    reportCompressedSize: false,
  },
  server: {
    port: 3000,
    strictPort: true,
  }
});
