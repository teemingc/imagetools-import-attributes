import { createServer } from 'vite';
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
const { render } = await server.ssrLoadModule('/src/entry-server.ts');
console.log(await render());
await server.close();
