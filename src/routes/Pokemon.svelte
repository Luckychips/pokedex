<script>
  import { onMount } from 'svelte';
  import DetailPokemon from '../components/DetailPokemon.svelte';
  import LoadingIndicator from '../components/LoadingIndicator.svelte';

  let pokemons = [];
  let pokemon = null;

  onMount(async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=400');
      const json = await response.json();
      if (json.hasOwnProperty('results')) {
        pokemons = json.results;
      }
    } catch (e) {
      console.log(e);
    }
  });

  onMount(async () => {
    await getPokemon('1');
  });

  async function getPokemon(name) {
    pokemon = null;
    setTimeout(async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        pokemon = await response.json();
        console.log(pokemon);
      } catch (e) {
        console.log(e);
      }
    }, 500);
  }

  function getNumberFromDex(number) {
    let targetNumber = number;
    if (number < 10) {
      targetNumber = '00' + targetNumber;
    } else if (number >= 10 && number < 100) {
      targetNumber = '0' + targetNumber;
    }

    return targetNumber;
  }
</script>

<main class="container flex">
  <div class="side-bar overflow-y-scroll">
    <ul>
      {#each pokemons as pokemon, i}
        <li on:click={e => getPokemon(pokemon.name)}>
          <label>{getNumberFromDex(i+1)} {pokemon.name}</label>
        </li>
      {/each}
    </ul>
  </div>
  <div class="content">
    {#if pokemon}
      <DetailPokemon pokemon={pokemon} />
    {:else}
      <LoadingIndicator />
    {/if}
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
