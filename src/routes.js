import Pokemon from './pages/pokemon/List.svelte';
import Move from './pages/Move.svelte';
import Machine from './pages/Machine.svelte';
import Berry from './pages/Berry.svelte';
import Item from './pages/Item.svelte';

const routes = {
  '/': Pokemon,
  '/pokemons': Pokemon,
  '/pokemon/:id': Pokemon,
  '/moves': Move,
  '/machines': Machine,
  '/berries': Berry,
  '/items': Item,
};

export default routes;
