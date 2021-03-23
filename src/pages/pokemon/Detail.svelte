<script>
  import PokemonProfile from './components/Profile.svelte';
  import PokemonType from './components/Type.svelte';
  import BaseStatChart from './components/BaseStat.svelte';
  import PokemonAbility from './components/Ability.svelte';
  import PokemonSkill from './components/Skill.svelte';
  import PopUp from '../../components/PopUp.svelte';

  export let pokemon;

  let isHidePopUp = true;
  function openPopup() {
    isHidePopUp = false;
  }
</script>

<section class="">
  {#if !isHidePopUp}
    <PopUp dismiss={() => (isHidePopUp = !isHidePopUp)} />
  {/if}
  <PokemonProfile {pokemon} />
  <PokemonType {pokemon} />
  <BaseStatChart {pokemon} />
  <PokemonAbility {pokemon} {openPopup} />
  <PokemonSkill {pokemon} {openPopup} />
</section>

<style type="text/scss">
  section {
    margin-left: 100px;

    :global(.title) {
      font-size: 1.3rem;
      font-weight: bold;
      margin-top: 15px;
    }
  }
</style>
