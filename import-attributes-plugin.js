import MagicString from 'magic-string';

const IMAGE = /\.(avif|gif|heif|jpeg|jpg|png|tiff|webp)(\?.*)?$/;

/**
 * Rewrites `import x from './a.jpg' with { w: '400' }` to `import x from './a.jpg?w=400'`
 * so that vite-imagetools (which only reads the query string) picks up the directives.
 * Also handles `import('./a.jpg', { with: { w: '400' } })`.
 *
 * This has to be a source transform: `resolveId` is not given the attributes, and two
 * imports of the same specifier with different attributes are resolved only once.
 *
 * @returns {import('vite').Plugin}
 */
export function import_attributes() {
	return {
		name: 'imagetools-import-attributes',
		// no `enforce`: runs after TypeScript and Svelte have been compiled to JS
		transform: {
			filter: { code: /\bwith\s*[:{]/ },
			handler(code, id) {
				if (id.includes('/node_modules/')) return;

				const s = new MagicString(code);

				walk(this.parse(code), (node) => {
					if (node.type === 'ImportDeclaration' && node.attributes?.length) {
						const rewritten = add_directives(node.source.value, node.attributes);
						if (rewritten) s.overwrite(node.source.start, node.end, `${JSON.stringify(rewritten)};`);
					}

					if (node.type === 'ImportExpression' && node.options?.type === 'ObjectExpression') {
						if (node.source.type !== 'Literal') return;
						const attributes = node.options.properties.find((p) => name_of(p.key) === 'with');
						if (attributes?.value.type !== 'ObjectExpression') return;

						const rewritten = add_directives(node.source.value, attributes.value.properties);
						if (rewritten) s.overwrite(node.source.start, node.options.end, JSON.stringify(rewritten));
					}
				});

				if (!s.hasChanged()) return;
				return { code: s.toString(), map: s.generateMap({ hires: 'boundary' }) };
			}
		}
	};
}

/**
 * @param {string} specifier
 * @param {Array<{ key: any, value: any }>} attributes
 */
function add_directives(specifier, attributes) {
	if (typeof specifier !== 'string' || !IMAGE.test(specifier)) return;

	const [path, query] = specifier.split('?');
	const params = new URLSearchParams(query);
	for (const attribute of attributes) {
		params.set(name_of(attribute.key), attribute.value.value);
	}

	// imagetools splits lists on `;`, keep them readable
	return `${path}?${params.toString().replaceAll('%3B', ';')}`;
}

/** @param {any} key */
function name_of(key) {
	return key.type === 'Identifier' ? key.name : key.value;
}

/**
 * @param {any} node
 * @param {(node: any) => void} visit
 */
function walk(node, visit) {
	if (!node || typeof node.type !== 'string') return;
	visit(node);
	for (const key in node) {
		const child = node[key];
		if (Array.isArray(child)) child.forEach((c) => walk(c, visit));
		else if (child && typeof child === 'object') walk(child, visit);
	}
}
