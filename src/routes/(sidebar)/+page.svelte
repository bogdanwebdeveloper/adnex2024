<script lang="ts">
	import { Heading, P, Button } from 'flowbite-svelte';
  	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import MetaTag from '../utils/MetaTag.svelte';

	const path: string = '';
  const description: string = 'Admin Dashboard example using Flowbite Svelte';
  const title: string = 'Flowbite Svelte Admin Dashboard - Home';
  const subtitle: string = 'Admin Dashboard';

    import { onMount } from 'svelte';
  
    /**
	 * @type {string | any[]}
	 */
    let posts: any[] = [];
  
    onMount(async () => {
      try {
        const response = await fetch('http://localhost:3000/get');
		  if (response.ok) {
			  posts = await response.json();
			  console.log(posts);
		  } else {
			  throw new Error('Failed to fetch data');
		  }
	  } catch (error) {
        console.error('Error fetching data:', error);
      }
    });
</script>

<MetaTag {path} {description} {title} {subtitle} />
<main class="p-4">
	<br>
	<div style="margin-top:3rem;"></div>
	<div class="text-center">
		<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl">Găsește imobilul potrivit pentru tine!</Heading>
		<P class="mb-6 text-lg lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-center">Aici, la Adnex te ajutăm să îti găsești locul perfect.</P>
		<Button class="mb-5 text-lg" href="/createPost">
		  Postează și tu
		  <ArrowRightOutline class="w-6 h-6 ms-2" />
		</Button>
		<br>
		<Button  class="mb-5 text-lg" href="/allPosts">
			Vezi mai multe
			<ArrowRightOutline class="w-6 h-6 ms-2" />
		  </Button>
	  </div>
	  <div style="margin-top:1rem;"></div>
	  <section>
		<div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
		  <header class="text-center">
			<h2 class="text-xl font-bold text-gray-900 sm:text-3xl">Iată câteva anunțuri!</h2>
	  
			<p class="mx-auto mt-4 max-w-md text-gray-500">
			  Vezi apartamente, proprietăți si garsoniere. La noi găsești de toate, iar tu poți lua legătura cu proprietarul chiar pe pagina anunțului.
			</p>
		  </header>
	  
		  <section id="Projects"
  class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">

  {#each posts.slice(0, 6) as post}
  <div class="w-72 bg-white dark:bg-gray-800 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
    <a href="/allPosts/{post.slug}">
      <img src="/images/{post.images[0]}" alt="Imagine postare" class="h-80 w-72 object-cover rounded-t-xl" />
      <div class="px-4 py-3 w-72">
        <p class="text-lg font-bold text-black dark:text-white truncate block capitalize">{post.titlu}</p>
        <span class="text-gray-500 dark:text-gray-300 mr-3 text-xs block" style="margin-top:0.1rem">Oras: {post.oras}</span>
        <span class="text-gray-500 dark:text-gray-300 mr-3 text-xs block" style="margin-top:0.1rem">Adresa: {post.adresa}</span>
        <span class="text-gray-500 dark:text-gray-300 mr-3 text-xs block" style="margin-top:0.1rem">Suprafata: {post.suprafata}</span>
        <span class="text-gray-500 dark:text-gray-300 mr-3 text-xs block" style="margin-top:0.1rem">Camere: {post.camere}</span>
        <span class="text-gray-500 dark:text-gray-300 mr-3 text-xs block" style="margin-top:0.1rem">Mobilat: {post.mobilat}</span>
        <span class="text-gray-500 dark:text-gray-300 mr-3 text-xs block" style="margin-top:0.1rem">Descriere: Vezi pe pagina anunțului</span>
        <span class="text-gray-500 dark:text-gray-300 mr-3 text-xs block" style="margin-top:0.5rem">Mobil: {post.mobil}</span>
        <div class="flex items-center">
          <p class="text-lg font-semibold text-black dark:text-white cursor-auto my-3 block">{post.pret}</p>
          <div class="ml-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bag-plus" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"/>
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 1 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
            </svg>
          </div>
        </div>
      </div>
    </a>
  </div>
  
  {/each}
</section>
		</div>
	  </section>
</main>
