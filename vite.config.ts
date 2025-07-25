/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,     // permite usar describe, it, expect sem importar
    environment: 'jsdom', // simula navegador para testes React etc
  }
})
