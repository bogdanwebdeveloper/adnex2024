<script lang="ts">
	import { Label, Input } from 'flowbite-svelte';
	import { ResetPassword } from '$lib';
	import MetaTag from '../../utils/MetaTag.svelte';
	const title = 'Resetează-ti parola';
	export let site = {
		name: '',
		img: '/images/logo-no-background.svg',
		link: '/',
		imgAlt: 'Adnex'
	};
	const acceptTerms = true;
	const termsLink = '/';
	const labelClass = 'mb-2 dark:text-white';
	const inputClass = 'border outline-none dark:border-gray-600 dark:bg-gray-700';
	const onSubmit = (e: Event) => {
		const formData = new FormData(e.target as HTMLFormElement);

		const data: Record<string, string | File> = {};
		for (const field of formData.entries()) {
			const [key, value] = field;
			data[key] = value;
		}
		console.log(data);
	};
	
	const path: string = '/authentication/reset-password';
  const description: string = 'Reset password';
	const metaTitle: string = 'TeamForge - Reset password';
  const subtitle: string = 'Reset password';
</script>

<MetaTag {path} {description} title={metaTitle} {subtitle} />

<ResetPassword {title} {site} {acceptTerms} {termsLink} on:submit={onSubmit}>
	<div>
		<Label for="email" class={labelClass}>Email</Label>
		<Input
			type="email"
			name="email"
			id="email"
			placeholder="name@company.com"
			required
			class={inputClass}
		/>
	</div>
	<div>
		<Label for="password" class={labelClass}>Parola</Label>
		<Input
			type="password"
			name="password"
			id="password"
			placeholder="••••••••"
			required
			class={inputClass}
		/>
	</div>
	<div>
		<Label for="confirm-password" class={labelClass}>Confirmă parola</Label>
		<Input
			type="password"
			name="confirm-password"
			id="confirm-password"
			placeholder="••••••••"
			required
			class={inputClass}
		/>
	</div>
</ResetPassword>
