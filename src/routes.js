import Pokemon from './pages/pokemon/List.svelte';

const routes = {
  '/': Pokemon,
  '/pokemons': Pokemon,
  '/pokemon/:id': Pokemon,
};

export default routes;
