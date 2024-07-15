<script lang="ts">
  import GeneralInfo from '$lib/settings/GeneralInfo.svelte';
  import ProfilePicture from '$lib/settings/ProfilePicture.svelte';
  import { Breadcrumb, BreadcrumbItem, Heading } from 'flowbite-svelte';
  import { Button, Input, Label } from 'flowbite-svelte';
  import Card from '../../../lib/widgets/Card.svelte';

  const path: string = '/settings';
  const description: string = 'Settings example - Flowbite Svelte Admin Dashboard';
  const title: string = 'Flowbite Svelte Admin Dashboard - Settings';
  const subtitle: string = 'Settings';

  export let data: {
    posts: Array<{
      id: string;
      slug: string;
      email: string;
      titlu: string;
      nume: string;
      prenume: string;
      organizatie: string;
      oras: string;
      adresa: string;
      mobil: string;
      suprafata: string;
      camere: string;
      mobilat: string;
      descriere: string;
      pret: string;
      images: string[];
    }>;
    userData: {
      userId: string;
      email: string;
      name: string;
    };
  };

  const inputs = [
    { label: 'Name', placeholder: `${data.userData.name}`, value: data.userData.name},
    { label: 'Email', placeholder: `${data.userData.email}`, value: data.userData.email },
    { label: 'ID', placeholder: `${data.userData.userId}`, value: data.userData.userId }
  ];

  // Function to toggle dark mode
  function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
  }
</script>

<main class="p-4">
  <div class="grid grid-cols-1 space-y-2 dark:bg-gray-900 xl:grid-cols-3 xl:gap-3.5">
    <div class="col-span-full xl:mb-0 flex justify-between items-center">
      <Breadcrumb class="mb-6">
        <BreadcrumbItem home>Home</BreadcrumbItem>
        <BreadcrumbItem
          class="inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white"
          href="/curd/users">Users</BreadcrumbItem>
        <BreadcrumbItem>Settings</BreadcrumbItem>
      </Breadcrumb>

    </div>

    <div class="col-span-full space-y-4 xl:col-auto">
      <Card title="General Information" class="-mt-px max-w-none dark:bg-gray-800 dark:text-white">
        <form class="grid grid-cols-6 gap-6">
          {#each inputs as { label, placeholder }}
            <Label class="col-span-6 space-y-2 sm:col-span-3 dark:text-white">
              <span>{label}</span>
              <Input {placeholder} class="border font-normal outline-none dark:bg-gray-700 dark:text-white" />
            </Label>
          {/each}
        </form>
      </Card>
    </div>

    <div class="col-span-2 space-y-4">
      <section id="Projects" class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {#each data.posts as post}
          <div class="w-72 bg-white dark:bg-gray-800 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
            <a href="/userprofile/{post.id}">
              <img src="/images/{post.images[0]}" alt="Post" class="h-80 w-72 object-cover rounded-t-xl" />
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
  </div>
</main>
