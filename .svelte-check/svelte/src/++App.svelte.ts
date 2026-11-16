///<reference types="svelte" />
;
import picture from './photo.jpg' with { as: 'picture', w: '250', format: 'webp' };
import query from './photo.jpg?w=250&format=webp&as=picture';

;type $$ComponentProps =  { fallback: string };function $$render() {

	
	

	let { fallback }:/*Ωignore_startΩ*/$$ComponentProps/*Ωignore_endΩ*/ = $props();
;
async () => {

 { svelteHTML.createElement("img", {        "id":`attr`,"src":picture.img.src,"width":picture.img.w,"alt":`via attributes`,});}
 { svelteHTML.createElement("img", {        "id":`query`,"src":query.img.src,"width":query.img.w,"alt":`via query`,});}
 { svelteHTML.createElement("img", {      "id":`ts`,"src":fallback,"alt":`from main.ts`,});}
};
return { props: {} as any as $$ComponentProps, exports: {}, bindings: __sveltets_$$bindings(''), slots: {}, events: {} }}
const App__SvelteComponent_ = __sveltets_2_fn_component($$render());
/*Ωignore_startΩ*/type App__SvelteComponent_ = ReturnType<typeof App__SvelteComponent_>;
/*Ωignore_endΩ*/export default App__SvelteComponent_;