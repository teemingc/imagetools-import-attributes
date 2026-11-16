<script lang="ts">
	import picture from './photo.jpg' with { as: 'picture', w: '250', format: 'webp' };
	import query from './photo.jpg?w=250&format=webp&as=picture';

	let { fallback }: { fallback: string } = $props();
</script>

<img id="attr" src={picture.img.src} width={picture.img.w} alt="via attributes" />
<img id="query" src={query.img.src} width={query.img.w} alt="via query" />
<img id="ts" src={fallback} alt="from main.ts" />
