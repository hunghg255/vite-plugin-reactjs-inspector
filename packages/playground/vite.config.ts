import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import VitePluginReactInspector from 'vite-plugin-reactjs-inspector/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePluginReactInspector()],
})
