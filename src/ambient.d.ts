/// <reference types="vite/client" />

// TypeScript 7.1+: matches any import whose attributes include `as: 'picture'`
declare module '*' with { as: 'picture' } {
	import type { Picture } from './types.js';
	const value: Picture;
	export default value;
}

// the query-string form can only be typed with a fixed suffix
declare module '*&as=picture' {
	import type { Picture } from './types.js';
	const value: Picture;
	export default value;
}

declare module '*.svelte' {
	import type { Component } from 'svelte';
	const component: Component<any>;
	export default component;
}
