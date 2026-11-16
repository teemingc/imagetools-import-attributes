# Image directives as import attributes

Prototype for typing `vite-imagetools` imports with TypeScript 7.1's attribute-keyed ambient modules.

```ts
import picture from './photo.jpg' with { as: 'picture', w: '200;400', format: 'avif;webp' };
```

- `import-attributes-plugin.js` rewrites the attributes into the query string that `vite-imagetools` already understands.
- `src/ambient.d.ts` declares `declare module '*' with { as: 'picture' }`, which matches regardless of the other attributes or their order.

```bash
npm install
npm run check      # svelte-check on typescript@7.1.0-beta, covers .ts and .svelte
npm run build
npm run dev
npm run ssr        # loads src/entry-server.ts through ssrLoadModule
npm run build:ssr
```

Set `NO_PLUGIN=1` to see the current behaviour: Vite drops the attributes and the original image is imported.

## What's covered

| Case | Runtime | Types |
| --- | --- | --- |
| Static import in `.ts` | works | works |
| Static import in `.svelte` | works | works |
| Dynamic `import(..., { with })` | works | not typed by TypeScript 7.1, falls back to `string` |
| `import.meta.glob` | no attributes option, use `query` | manual generic |
| SSR (dev and build) | works | n/a |

`svelte-check` needs TypeScript 6 and 7 installed side by side for its `--tsgo` mode, which is why
`typescript` is 6.x and `@typescript/native` is the 7.1 beta.
