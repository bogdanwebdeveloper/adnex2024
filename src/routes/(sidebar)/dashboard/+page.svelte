<script lang="ts">
	import Dashboard from '$lib/dashboard/Dashboard.svelte';
	import MetaTag from '../../utils/MetaTag.svelte';
	import Footer from '../Footer.svelte';
	export let data;

	const path: string = '/dashboard';
  const description: string = 'Dashboard';
  const title: string = 'Dashboard';
  const subtitle: string = 'Admin Dashboard';
</script>

<MetaTag {path} {description} {title} {subtitle} />

<main class="p-4">
	<Dashboard {data} />
</main>
<Footer />