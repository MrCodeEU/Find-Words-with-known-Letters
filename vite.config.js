import { paraglide } from '@inlang/paraglide-sveltekit/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		paraglide({
			project: './project.inlang',
			outdir: './src/lib/paraglide'
		})
	],
    build: {
        target: 'esnext',
        rollupOptions: {
            output: {
                // Remove inlineDynamicImports
                // Instead, configure manualChunks to bundle dependencies
                manualChunks: (id) => {
                    // Bundle node_modules into a single chunk
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                }
            }
        }
    },
    ssr: {
        noExternal: true
    },
    // Ensure optimization includes all dependencies
    optimizeDeps: {
        include: ['@sveltejs/kit']
    }
});
