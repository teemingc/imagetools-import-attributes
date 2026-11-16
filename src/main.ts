import { mount } from 'svelte';
import App from './App.svelte';
import { load_dynamic, load_glob } from './dynamic.js';
import url from './photo.jpg' with { w: '300', format: 'webp' };
import picture from './photo.jpg' with { as: 'picture', w: '200;400', format: 'avif;webp' };

// type checks: these lines fail `npm run check` if the attributes are not typed
const typed_url: string = url;
const fallback: string = picture.img.src;

console.log('ts url', typed_url);
console.log('ts picture', JSON.stringify(picture));

console.log('dynamic', JSON.stringify((await load_dynamic()).img));
console.log('glob', JSON.stringify(Object.values(load_glob())[0].img));

mount(App, { target: document.getElementById('app')!, props: { fallback } });
