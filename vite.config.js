import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/scholar-publications': {
        target: 'https://serpapi.com',
        changeOrigin: true,
        rewrite: path => {
          // Extract query string (e.g., ?start=20)
          const match = path.match(/\?(.+)$/);
          const query = match ? '&' + match[1] : '';
          return `/search.json?engine=google_scholar_author&author_id=3KZSSEIAAAAJ&api_key=6dd34653f360994172dd9f0d1e6496d087b4afc6553379a0ebb85ec2d9b0b55e${query}`;
        }
      }
    }
  }
})
