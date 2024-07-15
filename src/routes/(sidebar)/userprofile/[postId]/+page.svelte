<script lang="ts">
    export let data: {
      post: {
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
      }
    };
    
    let postid = data.post.id;
    let files: any[] = [];
    const uploadFiles = async () => {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('images', file);
      });

      const response = await fetch(`http://localhost:3000/upload/${postid}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Files uploaded successfully.');
      } else {
        alert('Error uploading files.');
      }
  };
  const handleFileChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    if (input?.files) {
      files = Array.from(input.files);
    }
    if (input.files) {
      files = Array.from(input.files);
    }
  };
    
  </script>
  

  <section class="py-12 sm:py-16">
    <div class="container mx-auto px-4">
      <nav class="flex">
        <ol role="list" class="flex items-center">
          <li class="text-left">
            <div class="-m-1">
              <a href="/" class="rounded-md p-1 text-sm font-medium text-gray-600 dark:text-gray-300 focus:text-gray-900 dark:focus:text-white focus:shadow hover:text-gray-800 dark:hover:text-gray-100"> Home </a>
            </div>
          </li>
  
          <li class="text-left">
            <div class="flex items-center">
              <span class="mx-2 text-gray-400 dark:text-gray-500">/</span>
              <div class="-m-1">
                <a href="/AllPosts/" class="rounded-md p-1 text-sm font-medium text-gray-600 dark:text-gray-300 focus:text-gray-900 dark:focus:text-white focus:shadow hover:text-gray-800 dark:hover:text-gray-100"> All Posts </a>
              </div>
            </div>
          </li>
  
          <li class="text-left">
            <div class="flex items-center">
              <span class="mx-2 text-gray-400 dark:text-gray-500">/</span>
              <div class="-m-1">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-300">{data.post.slug}</span>
              </div>
            </div>
          </li>
          
        </ol>
      </nav>
      <div class="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
        <div class="lg:col-span-3 lg:row-end-1">
          <div class="lg:flex lg:items-start">
            <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
            <div class="relative min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 bg-transparent relative items-center">
              <div class="absolute bg-transparent inset-0 z-0"></div>
              <div class="sm:max-w-lg w-full p-10 bg-white dark:bg-gray-800 rounded-xl z-10">
                <div class="text-center">
                  <h2 class="mt-5 text-3xl font-bold text-gray-900 dark:text-white">
                    Adaugă imagini pentru postarea ta!
                  </h2>
                </div>
                <form class="mt-8 space-y-3">
                  <div class="grid grid-cols-1 space-y-2">
                    <label class="text-sm font-bold text-gray-500 dark:text-gray-300 tracking-wide">Atașează imaginea</label>
                    <div class="flex items-center justify-center w-full">
                      <label class="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                        <div class="h-full w-full text-center flex flex-col items-center justify-center items-center">
                          <div class="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                            <img class="has-mask h-36 object-center" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="freepik image">
                          </div>
                          <p class="pointer-none text-gray-500 dark:text-gray-400"><span class="text-sm">Drag and drop</span> files here <br /> or <a href="" id="" class="text-purple-600 dark:text-purple-400 hover:underline">select a file</a> from your computer</p>
                        </div>
                        <input type="file" class="hidden" multiple on:change={handleFileChange}>
                      </label>
                    </div>
                  </div>
                  <p class="text-sm text-gray-300 dark:text-gray-500">
                    <span>File type: types of images</span>
                  </p>
                  <div>
                    <button on:click={uploadFiles} type="submit" class="my-5 w-full flex justify-center bg-purple-500 dark:bg-purple-700 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 dark:hover:bg-blue-500 shadow-lg cursor-pointer transition ease-in duration-300">
                      Upload
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <style>
              .has-mask {
                position: absolute;
                clip: rect(10px, 150px, 130px, 10px);
              }
            </style>
          </div>
        </div>
  
        <div class="lg:col-span-2 lg:row-span-2 lg:row-end-2">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">{data.post.titlu}</h1>
  
          <ul class="mt-8 space-y-2">
            <li class="flex items-center text-left text-sm font-medium text-gray-700 dark:text-gray-400">
              Oras: {data.post.oras}
            </li>
  
            <li class="flex items-center text-left text-sm font-medium text-gray-700 dark:text-gray-400">
              Adresa: {data.post.adresa}
            </li>
  
            <li class="flex items-center text-left text-sm font-medium text-gray-700 dark:text-gray-400">
              Suprafata: {data.post.camere}
            </li>
  
            <li class="flex items-center text-left text-sm font-medium text-gray-700 dark:text-gray-400">
              Camere: {data.post.camere}
            </li>
  
            <li class="flex items-center text-left text-sm font-medium text-gray-700 dark:text-gray-400">
              Mobilat: {data.post.mobilat}
            </li>
  
            <li class="flex items-center text-left text-sm font-medium text-gray-700 dark:text-gray-400">
              Descriere: Vezi mai jos
            </li>
          </ul>
  
          <div class="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
            <div class="flex items-end">
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{data.post.pret}</h1>
            </div>
          </div>
          <div style="margin-top:2rem"></div>
          <button type="button" class="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 dark:bg-gray-700 px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800 dark:hover:bg-gray-600">
            {data.post.mobil}
          </button>
          <div style="margin-top: 2rem"></div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white sm:text-2xl">Detaliile autorului:</h3>
          <ul class="mt-8 space-y-2">
            <li class="flex items-center text-left text-sm font-medium text-gray-600 dark:text-gray-300">
              Nume: {data.post.nume}
            </li>
  
            <li class="flex items-center text-left text-sm font-medium text-gray-600 dark:text-gray-300">
              Prenume: {data.post.prenume}
            </li>
  
            <li class="flex items-center text-left text-sm font-medium text-gray-600 dark:text-gray-300">
              Organizatie: {data.post.organizatie}
            </li>
  
            <li class="flex items-center text-left text-sm font-medium text-gray-600 dark:text-gray-300">
              Email: {data.post.email}
            </li>
  
            <li class="flex items-center text-left text-sm font-medium text-gray-600 dark:text-gray-300">
              Mobil: {data.post.mobil}
            </li>
          </ul>
          <div style="margin-top:1.4rem"></div>
        </div>
      </div>
    </div>
  </section>
  