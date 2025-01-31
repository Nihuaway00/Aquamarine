import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'dist',
        sourcemap: false,
    },
    server: {
        watch: {
            usePolling: true,
        },
        strictPort: true, // not necessary
        port: 3000, // you can replace this port with any port
    },
    host: true, // needed for the Docker Container port mapping to work
})
