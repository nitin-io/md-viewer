import { defineConfig } from 'vite'
import pkg from './package.json'

export default defineConfig({
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
  base: '/md-viewer/',
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  }
})