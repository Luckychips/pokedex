<script>
  import { onMount } from 'svelte';
  import DetailBerry from './Detail.svelte';
  import LoadingIndicator from '../../components/LoadingIndicator.svelte';

  export let params = {};

  let berries = [];
  let berry = null;

  onMount(async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/berry?limit=64');
      const json = await response.json();
      if (json.hasOwnProperty('results')) {
        berries = json.results;
      }
    } catch (e) {
      console.log(e);
    }
  });

  onMount(async () => {
    if (params.id) {
      await getBerry(params.id);
    } else {
      await getBerry('1');
    }
  });

  async function getBerry(name) {
    berry = null;
    setTimeout(async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/berry/${name}`);
        berry = await response.json();
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
      {#each berries as berry, i}
        <li on:click={(e) => getBerry(berry.name)}>
          <label>{getNumberFromDex(i + 1)} {berry.name}</label>
        </li>
      {/each}
    </ul>
  </div>
  <div class="content">
    {#if berry}
      <DetailBerry {berry} />
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
