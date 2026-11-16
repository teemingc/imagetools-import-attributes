import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { imagetools } from 'vite-imagetools';
import { import_attributes } from './import-attributes-plugin.js';

export default defineConfig({
	plugins: [svelte(), process.env.NO_PLUGIN ? null : import_attributes(), imagetools()]
});
