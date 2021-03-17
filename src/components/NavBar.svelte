<script>
  import { link } from 'svelte-spa-router';
  import active from 'svelte-spa-router/active';
</script>

<header>
  <a href="/" use:link use:active> Home </a>
  <a href="/pokemons" use:link use:active> Pokemons </a>
  <a href="/moves" use:link use:active> Moves </a>
  <a href="/machines" use:link use:active> Machines </a>
  <a href="/berries" use:link use:active> Berries </a>
  <a href="/items" use:link use:active> Items </a>
</header>

<style>
  :global(header a.active) {
    font-weight: bold;
    text-decoration: underline;
  }
</style>
