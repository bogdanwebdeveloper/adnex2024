<script lang="ts">
	import { Heading, P} from 'flowbite-svelte';
	import MetaTag from '../../utils/MetaTag.svelte';

	import type { ActionData } from './$types'

	import { Button, Input, Label, type InputType } from 'flowbite-svelte';
	import Card from '$lib/widgets/Card.svelte';

    import {Fileupload } from 'flowbite-svelte';

    let fileuploadprops = {
    id: 'postimages'
    };
	let files: any;

	$: if(files)
	{

	}


	const path: string = '';
  const description: string = 'Adnex';
  const title: string = 'Adnex';
  const subtitle: string = 'Adnex';
</script>

<MetaTag {path} {description} {title} {subtitle} />
<main class="p-4">
	<br>
	<div style="margin-top:3rem;"></div>
	<div class="text-center">
		<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl">Creează un anunț nou!</Heading>
		<P class="mb-6 text-lg lg:text-xl sm:px-19 xl:px-48 dark:text-gray-500 text-center " style="color: #7e22ce">Anunțul tău va fi vizibil în câteva minute.</P>
	  </div>
	  <section>
		<div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
		  <header class="text-center">
			<p class="mx-auto mt-4 max-w-md text-gray-500">
			  Te rog să introduci detalii și specificații cu atenție, altfel anunțul tău nu va fi postat!
			</p>
		  </header>
          <div style="margin-top:3.3rem"></div>
          <div class="col-span-2 space-y-4">
			<Card title="Te rog să introduci următoarele date:" class="-mt-px max-w-none">
				<form action="?/submitform" class="grid grid-cols-6 gap-6" method="POST">
						<Label class="col-span-6 space-y-2 sm:col-span-3" for="name">
							<span>Nume</span>
							<Input name="nume" type="text" placeholder="Joe" class="border font-normal outline-none" />
						</Label>
						<Label class="col-span-6 space-y-2 sm:col-span-3">
							<span>Prenume</span>
							<Input name="prenume" type="text" placeholder="Doe" class="border font-normal outline-none" />
						</Label>
						<Label class="col-span-6 space-y-2 sm:col-span-3">
							<span>Nr. Mobil</span>
							<Input name="nrmobil" type="text" placeholder="+40741923165" class="border font-normal outline-none" />
						</Label>
						<!--<Label class="col-span-6 space-y-2 sm:col-span-3">
							<span>Email</span>
							<Input name="email" type="text" placeholder="example@company.ro" class="border font-normal outline-none" />
						</Label>-->
						<Label class="col-span-6 space-y-2 sm:col-span-3">
							<span>Titlu</span>
							<Input name="titlu" type="text" placeholder="Apartament 3 camere" class="border font-normal outline-none" />
						</Label>
						<Label class="col-span-6 space-y-2 sm:col-span-3">
							<span>Organizatie (daca exista)</span>
							<Input name="organizatie" type="text" placeholder="Imobiliare Grivita" class="border font-normal outline-none" />
						</Label>
						<Label class="col-span-6 space-y-2 sm:col-span-3">
							<span>Oras</span>
							<Input name="oras" type="text" placeholder="Botosani" class="border font-normal outline-none" />
						</Label>
						<Label class="col-span-6 space-y-2 sm:col-span-3">
							<span>Adresa imobilului</span>
							<Input name="adresa" type="text" placeholder="Blvd. Mihai Eminescu" class="border font-normal outline-none" />
						</Label>
						<Label class="col-span-6 space-y-2 sm:col-span-3">
							<span>Suprafata</span>
							<Input name="suprafata" type="text" placeholder="100 metri patrati" class="border font-normal outline-none" />
						</Label>
						<Label class="col-span-6 space-y-2 sm:col-span-3">
							<span>Camere</span>
							<Input name="camere" type="text" placeholder="3 camere" class="border font-normal outline-none" />
						</Label>
						<Label class="col-span-6 space-y-2 sm:col-span-3">
							<span>Mobilat</span>
							<Input name="mobilat" type="text" placeholder="Mobilat/Nemobilat/Partial mobilat" class="border font-normal outline-none" />
						</Label>
						<Label class="col-span-6 space-y-2 sm:col-span-3">
							<span>Pret</span>
							<Input name="pret" type="text" placeholder="100.000 RON" class="border font-normal outline-none" />
						</Label>
						<Label class="col-span-6 w-full">
							<span>Descriere</span>
							<Input name="descriere" type="text" placeholder="Apartamentul are..." class="border font-normal outline-none" />
						</Label>
						<p style="width:20rem">Vei putea adăuga imagini dupa ce vei posta anuntul.</p>
					<Button type="submit" class="col-span-6 w-full" style="width: 50%;">Postează anunțul tău!</Button>
				</form>
			</Card>
		</div>
	  </section>
</main>
