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
});