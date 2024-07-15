<script lang="ts">
	import Footer from '../Footer.svelte';
    import Transactions from '$lib/dashboard/Transactions.svelte';
	import { imagesPath } from '$lib/variables';
	import Users from '../../data/users.json';
	import MetaTag from '../../utils/MetaTag.svelte';

	const path: string = '/transactions';
  const description: string = 'Transactions';
  const title: string = 'Transactions';
  const subtitle: string = 'Salary Overview';
</script>

<MetaTag {path} {description} {title} {subtitle} />

<main class="p-4">
    <Transactions />
</main>
<Footer />