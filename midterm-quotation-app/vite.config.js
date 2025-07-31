import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: 'notingcap.github.io/midterm-quotation-app/', // repo name
  plugins: [react()],
  build: {
    outDir: 'docs', // this puts built files in the docs/ folder
  },
})