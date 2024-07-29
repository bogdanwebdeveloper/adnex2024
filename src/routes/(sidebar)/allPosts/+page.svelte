<script>
    import { onMount } from 'svelte';
  
    /**
	 * @type {string | any[]}
	 */
    let posts = [];
  
    onMount(async () => {
      try {
        const response = await fetch('http://localhost:3000/get');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        posts = await response.json();
        console.log(posts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });

</script>


<div class="text-center p-10">
  <h1 class="font-bold text-4xl mb-4 dark:text-gray-300">Exploreaza optiunile tale!</h1>
  <h1 class="text-xl" style="color:#7e22ce">Aici poți găsi toate anunțurile postate.</h1>
</div>

<!-- ✅ Grid Section - Starts Here 👇 -->
<section id="Projects"
  class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">

  {#each posts as post}
  <div class="w-72 bg-white dark:bg-gray-800 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
    <a href="/allPosts/{post.slug}">
      <img src='/images/{post.images[0]}' alt="Imagini indisponibile / Eroare" class="h-80 w-72 object-cover rounded-t-xl" />
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
              <path fill-rule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  </div>
  
  {/each}
  <!--   🛑 Product card 1 - Ends Here  -->
</section>
<!-- 🛑 Grid Section - Ends Here -->




