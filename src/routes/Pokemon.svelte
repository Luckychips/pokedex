<script>
  import { onMount } from 'svelte';

  let pokemons = [];

  onMount(async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
      const json = await response.json();
      if (json.hasOwnProperty('results')) {
        pokemons = json.results;
      }
    } catch (e) {
      console.log(e);
    }
  });

  onMount(async () => {
    console.log('on mount...');
  });

  function getPokemon() {
    console.log('get pokemon');
  }
</script>

<main class="container">
  <div class="side-bar inline-block overflow-y-scroll">
    <ul>
      {#each pokemons as pokemon}
        <li on:click={getPokemon}>
          <label>{pokemon.name}</label>
        </li>
      {/each}
    </ul>
  </div>
  <div class="content inline-block">

  </div>
</main>

<style type="text/scss">
  main {
    .side-bar {
      width: 250px;
      height: calc(100vh - 45px);
    }

    .content {
      width: calc(100% - 255px);
      height: calc(100vh - 45px);
    }
  }

  ul {
    li {
      padding: 10px;
    }
  }
</style>
