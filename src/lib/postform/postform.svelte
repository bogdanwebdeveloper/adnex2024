<script lang="ts">
	import { Button, Input, Label, type InputType } from 'flowbite-svelte';
	import Card from '../widgets/Card.svelte';

    import {Fileupload } from 'flowbite-svelte';

    let fileuploadprops = {
    id: 'postimages'
    };

	const inputs: { label: string; type: InputType; placeholder: string }[] = [
		{ label: 'Nume', type: 'text', placeholder: 'Bogdan' },
		{ label: 'Prenume', type: 'text', placeholder: 'Baiceanu' },
        { label: 'Email', type: 'text', placeholder: 'example@company.com' },
        { label: 'Organizație (daca exista)', type: 'text', placeholder: 'Nu este cazul' },
        { label: 'Titlu', type: 'text', placeholder: 'Apartament zona Primaverii' },
		{ label: 'Oraș', type: 'text', placeholder: 'e.g.Botosani' },
		{ label: 'Adresa imobilului', type: 'text', placeholder: 'e.g. Blvd. Mihai Eminescu..' },
		{ label: 'Numar mobil', type: 'text', placeholder: 'e.g. +40741923165' },
		{ label: 'Suprafața utilă', type: 'text', placeholder: '100mp' },
        { label: 'Camere', type: 'text', placeholder: '3' },
        { label: 'Status mobilare', type: 'text', placeholder: 'Nemobilat / Mobilat / Partial Mobilat' },
        { label: 'Descrierea completă', type: 'text', placeholder: 'Scrie aici detaliat despre imobilul tău..' },
	];
</script>

<Card title="Te rog să introduci următoarele date:" class="-mt-px max-w-none">
	<form action="/submitform" class="grid grid-cols-6 gap-6">
		{#each inputs as { label, type, placeholder }}
			<Label class="col-span-6 space-y-2 sm:col-span-3">
				<span>{label}</span>
				<Input {type} {placeholder} class="border font-normal outline-none" />
			</Label>
		{/each}
        <Label class="col-span-6 space-y-2 sm:col-span-3">
            <span>Încarcă pozele:</span>
        </Label>
        <input id="many" multiple type="file" class="border font-normal outline-none" style="width: 7.2rem;"/>
        <div style="margin-right: 1rem;"></div>
		<Button class="w-fit whitespace-nowrap">Postează anunțul tău!</Button>
	</form>
</Card>
