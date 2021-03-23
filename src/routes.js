import Pokemon from './pages/pokemon/List.svelte';
import Machine from './pages/Machine.svelte';
import Berry from './pages/berry/List.svelte';
import Item from './pages/Item.svelte';

const routes = {
  '/': Pokemon,
  '/pokemons': Pokemon,
  '/pokemon/:id': Pokemon,
  '/machines': Machine,
  '/berries': Berry,
  '/berry/:id': Berry,
  '/items': Item,
};

export default routes;
