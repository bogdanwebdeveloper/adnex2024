<script>
	import modeobserver from '$lib/modeobserver';
	import { onMount } from 'svelte';
	import Runatics from './utils/Runatics.svelte';
  // @ts-ignore
  export let data;
  // @ts-ignore
  const analyticsId = data.ANALYTICS_ID

	onMount(modeobserver);
</script>
<Runatics {analyticsId} />
<slot />
