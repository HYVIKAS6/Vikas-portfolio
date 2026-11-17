import {defineConfig} from 'vite'; import react from '@vitejs/plugin-react'; import tailwind from '@tailwindcss/vite'
// GitHub Pages uses a repository subpath; Vercel serves this site from the domain root.
export default defineConfig({base: process.env.VERCEL ? '/' : '/Vikas-portfolio/', plugins:[react(),tailwind()]})
