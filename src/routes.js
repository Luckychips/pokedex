import Home from './routes/Home.svelte';
import Pokemon from './routes/Pokemon.svelte';
import Move from './routes/Move.svelte';
import Machine from './routes/Machine.svelte';
import Berry from './routes/Berry.svelte';
import Item from './routes/Item.svelte';

const routes = {
  '/': Home,
  '/pokemons': Pokemon,
  '/moves': Move,
  '/machines': Machine,
  '/berries': Berry,
  '/items': Item,
};

export default routes;
