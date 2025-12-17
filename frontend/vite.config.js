import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: '/',
    build: {
        outDir: 'dist',
    },
    test: {
        globals: true,
        environment: 'jsdom',
        include: ['spec/**/*.test.{js,ts,jsx,tsx}'],
        setupFiles: './spec/setupTests.js',
        coverage: {
            provider: 'c8',
            reporter: ['text', 'json', 'html'],
        },
    },
})
