import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
    root: resolve(__dirname, './src/frontend'),
    plugins: [react(), tailwindcss()],
    build: {
        rollupOptions: {
            input: {
                home: resolve(__dirname, 'src/frontend/index.html'),
                generator: resolve(
                    __dirname,
                    'src/frontend/generator/index.html'
                ),
                // about: resolve(__dirname, './src/routes/about/about.html'),
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src/frontend'),
        },
    },
});
