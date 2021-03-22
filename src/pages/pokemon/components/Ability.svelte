<script>
  export let pokemon;

  async function getAbilityContent(url) {
    try {
      const response = await fetch(url);
      // pokemon = await response.json();
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }
</script>

<div class="pokemon-abilities">
  <div class="title">Ability</div>
  {#each pokemon.abilities as value}
    <div
      class={`ability-name ${value.is_hidden ? 'text-blue-300' : 'text-blue-900'}`}
      on:click={(e) => getAbilityContent(value.ability.url)}
    >
      {value.ability.name}
    </div>
  {/each}
</div>

<style type="text/scss">
  .pokemon-abilities {
    .title {
      margin-top: 50px;
    }

    .ability-name {
      &:hover {
        cursor: pointer;
      }
    }
  }
</style>
