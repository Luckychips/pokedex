<script>
  import Router from 'svelte-spa-router';
  import NavBar from './components/NavBar.svelte';
  import routes from './routes';
</script>

<NavBar />
<Router {routes} />

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
