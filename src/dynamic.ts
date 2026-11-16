import type { Picture } from './types.js';

/**
 * Dynamic `import()` with attributes. The plugin rewrites it, but TypeScript 7.1 does not
 * apply attribute-keyed ambient modules to `import()`, so `default` is typed as `string`.
 */
export async function load_dynamic(): Promise<Picture> {
	const module = await import('./photo.jpg', { with: { as: 'picture', w: '150', format: 'webp' } });
	return module.default as unknown as Picture;
}

/** `import.meta.glob` has no attributes option: directives go in `query` and the type is manual */
export function load_glob(): Record<string, Picture> {
	return import.meta.glob<Picture>('./*.jpg', {
		eager: true,
		import: 'default',
		query: { as: 'picture', w: '120', format: 'webp' }
	});
}
