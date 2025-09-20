import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'projects.html'),
      },
    },
  },
})