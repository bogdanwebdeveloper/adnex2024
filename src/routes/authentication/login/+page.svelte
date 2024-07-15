<script lang="ts">
	import { Label, Input ,Button} from 'flowbite-svelte';
	import { SignIn } from '$lib';
  import MetaTag from '../../utils/MetaTag.svelte';
	let title = 'Loghează-te în contul tău';
	export let site = {
		name: '',
		img: '/images/logo-no-background.svg',
		link: '/',
		imgAlt: 'Adnex'
	};
	let rememberMe = true;
	let lostPassword = true;
	let createAccount = true;
	let loginTitle = 'Login to your account';

	const onSubmit = (e: Event) => {
		const formData = new FormData(e.target as HTMLFormElement);

		const data: Record<string, string | File> = {};
		for (const field of formData.entries()) {
			const [key, value] = field;
			data[key] = value;
		}
		console.log(data);
	};

	const path: string = '/authentication/signin';
  const description: string = 'Sign In';
	const metaTitle: string = 'TeamForge - Sign In';
  const subtitle: string = 'Sign in';

  
</script>

<MetaTag {path} {description} title={metaTitle} {subtitle} />

<SignIn
	{title}
	{site}
	{rememberMe}
	{lostPassword}
	{createAccount}
	on:submit={onSubmit}
>	<form method="POST" action="?/submitform">
	<div>
		<Label for="email" class="mb-2 dark:text-white">Email</Label>
		<Input
			type="email"
			name="email"
			id="email"
			placeholder="name@company.com"
			required
			class="border outline-none dark:border-gray-600 dark:bg-gray-700"
		/>
	</div>
	<div>
		<Label for="password" class="mb-2 dark:text-white">Parola</Label>
		<Input
			type="password"
			name="password"
			id="password"
			placeholder="••••••••"
			required
			class="border outline-none dark:border-gray-600 dark:bg-gray-700"
		/>
	</div>
	<br>
	<Button type="submit" size="lg">Loghează-te</Button>
</form>
</SignIn>
