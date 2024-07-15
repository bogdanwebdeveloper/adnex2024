<script lang="ts">
	import { Label, Input } from 'flowbite-svelte';
	import { SignUp } from '$lib';
  	import MetaTag from '../../utils/MetaTag.svelte';
	import { A, Checkbox, Button, Card } from 'flowbite-svelte';

	const title = 'Înregistrează un cont';
	const site = {
		name: '',
		img: '/images/logo-no-background.svg',
		link: '/',
		imgAlt: 'Adnex Logo'
	};
	const acceptTerms = true;
	const haveAccount = true;
	const btnTitle = 'Înregistrează';
	const labelClass = 'space-y-2 dark:text-white';
	const onSubmit = (e: Event) => {
		const formData = new FormData(e.target as HTMLFormElement);

		const data: Record<string, string | File> = {};
		for (const field of formData.entries()) {
			const [key, value] = field;
			data[key] = value;
		}
		console.log(data);
	};

	const path: string = '/authentication/sign-up';
  const description: string = 'Sign up - Adnex';
	const metaTitle: string = 'Adnex - Sign up';
  const subtitle: string = 'Sign up';

  import {enhance} from '$app/forms';
  export let form;

  let thisForm:HTMLFormElement;

</script>

<MetaTag {path} {description} title={metaTitle} {subtitle} />


<SignUp
	{title}
	{site}
	{acceptTerms}
	{haveAccount}
	on:submit={onSubmit}
>
	<form method="POST" action="?/submitform">
	<div>
		<Label class={labelClass}>
			<span>Numele tau</span>
				<Input
				type="text"
				for="name"
				name="name"
				id="name"
				placeholder="John Doe"
				required
				class="border outline-none dark:border-gray-600 dark:bg-gray-700"
				value={form?.name?? ''}
				/>
		</Label>
	</div>
	<div>
		<Label class={labelClass}>
			<span>Email</span>
			<Input
				type="email"
				for="email"
				name="email"
				id="email"
				placeholder="name@company.com"
				required
				class="border outline-none dark:border-gray-600 dark:bg-gray-700"
				value={form?.email?? ''}
			/>
		</Label>
	</div>
	<div>
		<Label class={labelClass}>
			<span>Parola</span>
			<Input
				type="password"
				name="password"
				for="password"
				id="password"
				placeholder="••••••••"
				required
				class="border outline-none dark:border-gray-600 dark:bg-gray-700"
			/>
		</Label>
	</div>
	<div>
		<Label class={labelClass}>
			<span>Confirmă parola</span>
			<Input
				type="password"
				name="confirm-password"
				placeholder="••••••••"
				required
				class="border outline-none dark:border-gray-600 dark:bg-gray-700"
			/>
		</Label>
	</div>
	<br>
	<Button type="submit" size="lg">Înregistrează</Button>
	</form>
</SignUp>
