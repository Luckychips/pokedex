<script>
  import { link } from 'svelte-spa-router';
  import active from 'svelte-spa-router/active';
</script>

<header class="bg-blue-600">
  <a href="/pokemons" use:link use:active> Pokemons </a>
</header>

<style>
  header {
    max-height: 45px;
    padding: 10px;
  }

  header a {
    font-size: 1.1rem;
    color: white;
    margin-right: 5px;
  }

  :global(header a.active) {
    font-weight: bold;
  }

  :global(header a:hover) {
    text-decoration: none;
  }
</style>
