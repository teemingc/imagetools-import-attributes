import picture from './photo.jpg' with { as: 'picture', w: '180', format: 'webp' };
import { load_dynamic, load_glob } from './dynamic.js';

export async function render(): Promise<string> {
	const dynamic = await load_dynamic();
	const glob = Object.values(load_glob())[0];
	return JSON.stringify({ static: picture.img, dynamic: dynamic.img, glob: glob.img });
}
