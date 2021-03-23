<script>
  import { onMount } from 'svelte';
  import BerryProfile from './components/Profile.svelte';
  export let berry;

  onMount(async () => {
    await getItem();
  });

  async function getItem() {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/item/${berry.item.name}`);
      berry.item = await response.json();
    } catch (e) {
      console.log(e);
    }
  }
</script>

<main>
  <BerryProfile {berry} />
</main>

<style>
</style>
