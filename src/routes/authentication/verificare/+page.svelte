<script lang="ts">
	import { Label, Input, Checkbox, A } from 'flowbite-svelte';
	import MetaTag from '../../utils/MetaTag.svelte';
	const onSubmit = (e: Event) => {
		const formData = new FormData(e.target as HTMLFormElement);

		const data: Record<string, string | File> = {};
		for (const field of formData.entries()) {
			const [key, value] = field;
			data[key] = value;
		}
		console.log(data);
	};

	const path: string = '/authentication/verificare';
  const description: string = 'Forgot password form';
  const subtitle: string = 'Forgot password';

  import { Button, Card, P } from 'flowbite-svelte';
	export let title = 'Verifică EMAIL';
	export let site = {
		name: '',
		img: '/images/logo-no-background.svg',
		link: '/',
		imgAlt: 'Adnex'
	};
	export let btnTitle = 'Confirmă';
	export let pageDescription =
		"Te rog să introduci codul primit in email la înregistrarea contului";
	export let mainClass = 'bg-gray-50 dark:bg-gray-900';
	export let mainDivClass =
		'flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900';
	export let siteLinkClass =
		'flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white';
	export let siteImgClass = 'mr-4 h-11';
	export let cardH1Class = 'mb-3 text-2xl font-bold text-gray-900 dark:text-white';
	
</script>

<MetaTag {path} {description} {title} {subtitle} />

<main class={mainClass}>
	<div class={mainDivClass}>
		<a href={site.link} class={siteLinkClass}>
			<img src={site.img} class={siteImgClass} alt={site.imgAlt} />
			<span>{site.name}</span>
		</a>
		<!-- Card -->
		<Card class="w-full max-w-md" border={false}>
			<h1 class={cardH1Class}>{title}</h1>
			<P class="text-base font-normal text-gray-500 dark:text-gray-400">
				{pageDescription}
			</P>
			<form class="mt-8 space-y-6" method="POST" action="?/submitverificare">
				<div>
					<Label for="cod" class="mb-2">EMAIL</Label>
					<Input
						type="text"
						name="email"
						id="cod"
						placeholder="EMAILUL TĂU"
						required
						class="border outline-none"
					/>
					<Label for="cod" class="mb-2">COD DE VERIFICARE</Label>
					<Input
						type="text"
						name="codverificare"
						id="cod"
						placeholder="CODUL DIN EMAIL"
						required
						class="border outline-none"
					/>
				</div>
				<Button type="submit" size="lg">{btnTitle}</Button>
			</form>
		</Card>
	</div>
</main>
	
