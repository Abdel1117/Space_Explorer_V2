import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  // vitest config
  test: {
    // https://vitest.dev/config/
    globals: true,
    environment: 'jsdom',
    setupFiles: ['test/vitest.setup.js'],
    include: ['__tests__/**/*.[jt]s?(x)'],
    exclude: ['**/node_modules/**', '**/dist/**', 'src/test/vitest.setup.js'],

  },

  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true
    }
  }
})
