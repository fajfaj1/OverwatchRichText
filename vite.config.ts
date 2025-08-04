import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
    root: resolve(__dirname, './src'),
    plugins: [react(), tailwindcss()],
    build: {
        outDir: '../dist',
        rollupOptions: {
            input: {
                home: resolve(__dirname, 'src/index.html'),
                generator: resolve(__dirname, 'src/generator/index.html'),
                glyphViewer: resolve(__dirname, 'src/glyph_viewer/index.html'),
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
