import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [sveltekit(), Icons({ autoInstall: true, compiler: 'svelte' }), enhancedImages()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
});
