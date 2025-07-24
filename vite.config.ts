import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
    root: resolve(__dirname, 'src'),
    plugins: [react(), tailwindcss()],
    build: {
        rollupOptions: {
            input: {
                generator: resolve(
                    __dirname,
                    'src',
                    'generator',
                    'generator.html'
                ),
                // about: resolve(__dirname, './src/routes/about/about.html'),
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
