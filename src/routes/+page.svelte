<script>
	import * as m from '$lib/paraglide/messages';
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
    import { Segment } from '@skeletonlabs/skeleton-svelte';
	import { derived } from 'svelte/store';

    let letters = $state('');
    /**
     * @type {string[]}
     */
    let results = $state([]);
    let loading = $state(false);
    let initialLoad = $state(false);
    let selectedLang = $state("de")

    async function findWords() {
        loading = true;
        if (!letters) return;

        //check that letters are single chars separated by commas
        const regex = /^[a-zA-Z](,[a-zA-Z])*$/;
        if (!regex.test(letters)) {
            alert('Please enter a comma separated list of letters');
            return;
        }

        const encodedLetters = encodeURIComponent(letters);

        try {
            const response = await fetch(`/api/findwords/${selectedLang}/${encodedLetters}`);
            if (!response.ok) throw new Error('Failed to fetch words');
            const data = await response.json();
            results = data.words;
        } catch (error) {
            console.error('Error:', error);
            results = [];
        }
        loading = false;
        initialLoad = true;
    }

    function addCommas(){
        // add comma between each letter (if not already there)
        letters = letters.split('').filter(l => l !== ',').join(',');
    }

</script>

<AppBar>Placeholder for homepage navbar (when conversion to svelt finished)</AppBar>
<div class="flex justify-center">
	<h1 class="h1 font-bold uppercase">
		<span
			class="bg-gradient-radial from-tertiary-500 to-primary-500 box-decoration-clone bg-clip-text text-transparent"
		>
			{m.title()}
		</span>
	</h1>
</div>

<div class="width-screen flex justify-center pt-20">
	<div class="card w-1/2 border-[1px] p-4 border-surface-200-800 preset-filled-surface-100-900">
		<label class="label">
			<span class="label-text type-scale-8">{m.search()}</span>
			<input
				class="input p-2 type-scale-5"
				type="text"
				placeholder="b,n,h,g"
				bind:value={letters}
                oninput={addCommas}
			/>
		</label>
		<button onclick={findWords}> Find Words </button>
        <Segment name="lang" bind:value={selectedLang}>
            <Segment.Item value="en">
                English
            </Segment.Item>
            <Segment.Item value="de">
              Deutsch
            </Segment.Item>
          </Segment>
	</div>
</div>

<div class="width-screen flex justify-center pt-10">
    <div class="card w1/2">
        {#if loading}
            <div class="flex w-screen justify-center">
                <div class="grid w-1/2 grid-cols-4 gap-4 pt-16">
                    <div class="placeholder animate-pulse"></div>
                    <div class="placeholder animate-pulse"></div>
                    <div class="placeholder animate-pulse col-span-2"></div>
                    <div class="placeholder animate-pulse"></div>
                    <div class="placeholder animate-pulse"></div>
                    <div class="placeholder animate-pulse "></div>
                    <div class="placeholder animate-pulse col-span-3"></div>
                    <div class="placeholder animate-pulse"></div>
                    <div class="placeholder animate-pulse"></div>
                    <div class="placeholder animate-pulse"></div>
                    <div class="placeholder animate-pulse"></div>
                    <div class="placeholder animate-pulse"></div>
                </div>
            </div>
        {:else}
            {#if results.length > 0}
            <ul>
                {#each results as word}
                    <li>{word}</li>
                {/each}
            </ul>
            {:else}
                {#if initialLoad}
                    <p>No words found</p>
                {/if}
            {/if}
        {/if}
    </div>
</div>