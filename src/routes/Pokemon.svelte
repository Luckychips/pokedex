<script>
  import { onMount } from 'svelte';

  let pokemons = [];

  onMount(async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=200');
      const json = await response.json();
      if (json.hasOwnProperty('results')) {
        pokemons = json.results;
      }
    } catch (e) {
      console.log(e);
    }
  });
</script>

<main>
  <ul>
    {#each pokemons as pokemon}
      <li>
        <label>{pokemon.name}</label>
      </li>
    {/each}
  </ul>
</main>

<style>
  main {
  }

  ul {
    list-style: none;
    padding-bottom: 30px;
  }
</style>
