import { defineConfig } from 'vite';

export default defineConfig({
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif'],
    build: {
        rollupOptions: {
            input: {
                main: './index.html',
            },
        },
    },
    preview: {
        port: process.env.PORT ? Number(process.env.PORT) : 4173,
        host: true,
        allowedHosts: ['uniqueleverage-main.onrender.com']  // 👈 Add this line
    }
});