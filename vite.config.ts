import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/todo-app-with-e2e-testing/',
  plugins: [react(), tailwindcss()],
})
