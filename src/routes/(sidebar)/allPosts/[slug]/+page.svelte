<script>
  // @ts-nocheck
  import { page } from "$app/stores";
  import { onMount } from 'svelte';
  //import { form, invalidate } from '$app/forms';
  
    import { get } from 'svelte/store';

  let alert = '';
  $: console.log({ slug: $page.params.slug });
  export const SLUG = $page.params.slug;
  let slug;
  const handleDelete = (e) => {
    // Handle delete functionality
    e.preventDefault();
    const url = new URL(get(page).url);
  }

  let userCookie;
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  export let posts = [];
  export let comment = [];
  onMount(async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/${SLUG}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      posts = data.post;
      comment = data.comment;
      console.log('Post:', posts);
      console.log('Comments:', comment);
      console.log(posts.slug);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });
  let activeImage;
  $: if (posts.images && posts.images.length > 0) {
    activeImage = `/images/${posts.images[0]}`;
  }
</script>

<section class="py-12 sm:py-16 dark:bg-gray-800"> 
  <div class="container mx-auto px-4">
    <nav class="flex">
      <ol role="list" class="flex items-center">
        <li class="text-left">
          <div class="-m-1">
            <a href="/" class="rounded-md p-1 text-sm font-medium text-gray-600 dark:text-gray-300 focus:text-gray-900 dark:focus:text-white focus:shadow hover:text-gray-800 dark:hover:text-gray-400"> Home </a>
          </div>
        </li>
        <li class="text-left">
          <div class="flex items-center">
            <span class="mx-2 text-gray-400 dark:text-gray-500">/</span>
            <div class="-m-1">
              <a href="/AllPosts/" class="rounded-md p-1 text-sm font-medium text-gray-600 dark:text-gray-300 focus:text-gray-900 dark:focus:text-white focus:shadow hover:text-gray-800 dark:hover:text-gray-400"> All Posts </a>
            </div>
          </div>
        </li>
        <li class="text-left">
          <div class="flex items-center">
            <div class="mx-2 text-gray-400 dark:text-gray-500">/</div>
            <div class="-m-1 text-gray-900 dark:text-gray-500">
              {posts.slug}
            </div>
        </li>
      </ol>
    </nav>

    <div class="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
      <div class="lg:col-span-3 lg:row-end-1">
        <div class="lg:flex lg:items-start">
          <div class="lg:order-2 lg:ml-5">
            <div class="max-w-xl overflow-hidden rounded-lg">
              <img class="h-full w-full max-w-full object-cover" src={activeImage} alt="" />
            </div>
          </div>
          <div class="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
            <div class="flex flex-row items-start lg:flex-col">
              {#if posts.images && posts.images.length > 0}
              {#each posts.images as image}
                <button type="button" class="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center" on:click={() => activeImage = `/images/${image}`}>
                  <img class="h-full w-full object-cover" src={`/images/${image}`} alt="" />
                </button>
              {/each}
            {/if}
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-2 lg:row-span-2 lg:row-end-2">
        <h1 class="sm:text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">{posts.titlu}</h1>
        <ul class="mt-8 space-y-2">
          <li class="flex items-center text-left text-sm font-medium text-gray-700 dark:text-gray-300">
            Oras: {posts.oras}
          </li>
          <li class="flex items-center text-left text-sm font-medium text-gray-700 dark:text-gray-300">
            Adresa: {posts.adresa}
          </li>
          <li class="flex items-center text-left text-sm font-medium text-gray-700 dark:text-gray-300">
            Suprafata: {posts.suprafata}
          </li>
          <li class="flex items-center text-left text-sm font-medium text-gray-700 dark:text-gray-300">
            Camere: {posts.camere}
          </li>
          <li class="flex items-center text-left text-sm font-medium text-gray-700 dark:text-gray-300">
            Mobilat: {posts.mobilat}
          </li>
          <li class="flex items-center text-left text-sm font-medium text-gray-700 dark:text-gray-300">
            Descriere: Vezi mai jos
          </li>
        </ul>

        <div class="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0 border-gray-300 dark:border-gray-600">
          <div class="flex items-end">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{posts.pret}</h1>
          </div>
        </div>

        <div style="margin-top:2rem"></div>
        <button type="button" class="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600">
          {posts.mobil}
        </button>

        <div style="margin-top: 2rem"></div>
        <h3 class="sm:text-2xl font-bold text-gray-900 dark:text-white sm:text-2xl">Detaliile autorului:</h3>
        <ul class="mt-8 space-y-2">
          <li class="flex items-center text-left text-sm font-medium text-gray-600 dark:text-gray-300">
            Nume: {posts.nume}
          </li>
          <li class="flex items-center text-left text-sm font-medium text-gray-600 dark:text-gray-300">
            Prenume: {posts.prenume}
          </li>
          <li class="flex items-center text-left text-sm font-medium text-gray-600 dark:text-gray-300">
            Organizatie: {posts.organizatie}
          </li>
          <li class="flex items-center text-left text-sm font-medium text-gray-600 dark:text-gray-300">
            Email: {posts.email}
          </li>
          <li class="flex items-center text-left text-sm font-medium text-gray-600 dark:text-gray-300">
            Mobil: {posts.mobil}
          </li>
        </ul>

        <div style="margin-top:1.4rem"></div>
        <form method="post" action='?/delete'>
          <input type="hidden" name="message" value={SLUG}/>
          <button type="submit" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Șterge</button>
        </form>
      </div>

      <div class="lg:col-span-3">
        <div class="border-b border-gray-300 dark:border-gray-600">
          <nav class="flex gap-4">
            <p class="border-b-2 border-gray-900 dark:border-white py-4 text-sm font-medium text-gray-900 dark:text-white hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-800 dark:hover:text-gray-400"> Description </p>
          </nav>
        </div>
        <div class="mt-8 flow-root sm:mt-12">
          <p class="mt-4 text-gray-700 dark:text-gray-300">{posts.descriere}</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
  <div class="max-w-2xl mx-auto px-4">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussions {comment.length}</h2>
    </div>
    <form action="?/submitComment" method="POST" class="mb-6" >
      <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <label for="comment" class="sr-only">Your comment</label>
        <textarea name="comment" id="comment" rows="6" class="px-0 w-full text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-0 focus:ring-0 focus:outline-none" placeholder="Write a comment..." required></textarea>
      </div>
      <button type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
        Post comment
      </button>
    </form>
    {#each comment as item}
    <article class="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
      <footer class="flex justify-between items-center mb-2">
        <div class="flex items-center">
          <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"><img class="mr-2 w-6 h-6 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="Bonnie Green"/>{item.username}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-03-12" title="March 12th, 2022"></time></p>
        </div>
      </footer>
      <p class="text-gray-500 dark:text-gray-400">{item.comment}</p>
    </article>
    {/each}
  </section>