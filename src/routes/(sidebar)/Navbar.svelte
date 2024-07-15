<script lang="ts">
	import {
		DarkMode,
		NavBrand,
		NavHamburger,
		Navbar,
		Search
	} from 'flowbite-svelte';
	import '../../app.pcss';

	export let fluid = true;
	export let drawerHidden = false;
	export let list = false;
	import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from 'flowbite-svelte';

	// export let id: number = 0; // 1,
	export let name: string = ''; // "Neil Sims",
	export let avatar: string = ''; // "neil-sims.png",
	export let email: string = ''; // "neil.sims@flowbite.com",
	// export let biography: string = ''; // "I love working with React and Flowbites to create efficient and user-friendly interfaces. In my spare time, I enjoys baking, hiking, and spending time with my family.",
	// export let position: string = ''; // "Front-end developer",
	// export let country: string = ''; // "United States",
	// export let status: string = ''; // "Active"
	// Import your Prisma instance
	import { PrismaClient } from '@prisma/client';

	const prisma = new PrismaClient();

    export async function load({ request, cookies }) {
        if (request) {
            const session = cookies.get('session');
            const userResponse = await prisma.user.findUnique({
                where: { id: session },
            });
            if (userResponse) {
                const userData = userResponse;
                // Return the userData
                return {
                    props: {
                        userData
                    }
                };
            }
        }
    }
    export let userData;
	function deleteCookie(name:string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
	console.log(`Cookie "${name}" deleted.`);
  }

  async function handleClick   () {
    /*const response = await fetch("http://localhost:3000/deleteSession");
	if(response.ok)
	{
		console.log('ok');
		window.location.href="/authentification/login";
	}
	else{
		console.log(response);
		console.log('notok')
	}*/
	window.location.href = '/authentication/login';
  }
	console.log(userData);
</script>

<Navbar {fluid} class="text-black" color="default" let:NavContainer>
	<NavContainer class="mb-px mt-px px-1" {fluid}>
		<NavHamburger
			onClick={() => (drawerHidden = !drawerHidden)}
			class="m-0 me-3 md:block lg:hidden"
		/>
		<NavBrand href="/" class={list ? 'w-40' : 'lg:w-60'}>

			<img
				src="/images/logo-no-background.svg"
				class="me-2.5 h-6 sm:h-8"
				alt="Adnex Logo"
				style="margin-top:0.2rem"
			/>
			
		</NavBrand>
		<div class="hidden lg:block lg:ps-3">
				<form>
					<Search size="md" class="mt-1 w-96 border focus:outline-none" />
				</form>
		</div>
		<div class="ms-auto flex items-center text-gray-500 dark:text-gray-400 sm:order-2">
			<DarkMode />

		<button class="ms-3 rounded-full ring-gray-400 focus:ring-4 dark:ring-gray-600">
			<Avatar size="sm" src='/images/logo-no-background.svg' tabindex="0" />
		</button>
		<Dropdown placement="bottom-end">
			<DropdownHeader>
				<span class="block text-sm"></span>
				<span class="block truncate text-sm font-medium"></span>
			</DropdownHeader>
			<a href="/userprofile"><DropdownItem>Profil</DropdownItem></a>
			<DropdownDivider/>
			<button id="logoutButton" on:click={handleClick} ><DropdownItem>Ieși din cont</DropdownItem></button>
		</Dropdown>

				</div>
	</NavContainer>
</Navbar>
