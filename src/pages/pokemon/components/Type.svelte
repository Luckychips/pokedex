<script>
  export let pokemon;
</script>

<div class="pokemon-types">
  {#each pokemon.types as value}
    <span
      class="type-tag"
      class:grass={value.type.name === 'grass'}
      class:poison={value.type.name === 'poison'}
      class:fire={value.type.name === 'fire'}
      class:flying={value.type.name === 'flying'}
      class:water={value.type.name === 'water'}
      class:bug={value.type.name === 'bug'}
      class:normal={value.type.name === 'normal'}
      class:ground={value.type.name === 'ground'}
      class:electric={value.type.name === 'electric'}
      class:psychic={value.type.name === 'psychic'}
      class:ice={value.type.name === 'ice'}
      class:ghost={value.type.name === 'ghost'}
      class:steel={value.type.name === 'steel'}
      class:rock={value.type.name === 'rock'}
      class:fighting={value.type.name === 'fighting'}
      class:dragon={value.type.name === 'dragon'}
      class:dark={value.type.name === 'dark'}
      class:fairy={value.type.name === 'fairy'}>{value.type.name}</span
    >
  {/each}
</div>

<style type="text/scss">
  .pokemon-types {
    .type-tag {
      color: white;
      font-weight: bold;
      padding: 5px 10px;
      border-radius: 8px;
      margin-right: 10px;

      &.grass {
        background-color: #78c850;
      }
      &.poison {
        background-color: #a040a0;
      }
      &.fire {
        background-color: #f08030;
      }
      &.flying {
        background-color: #a890f0;
      }
      &.water {
        background-color: #6890f0;
      }
      &.bug {
        background-color: #a8b820;
      }
      &.normal {
        background-color: #a8a878;
      }
      &.fairy {
        background-color: #ee99ac;
      }
      &.ground {
        background-color: #e0c068;
      }
      &.electric {
        background-color: #f8d030;
      }
      &.psychic {
        background-color: #f85888;
      }
      &.ice {
        background-color: #98d8d8;
      }
      &.ghost {
        background-color: #705898;
      }
      &.steel {
        background-color: #b8b8d0;
      }
      &.rock {
        background-color: #b8a038;
      }
      &.fighting {
        background-color: #c03028;
      }
      &.dragon {
        background-color: #7038f8;
      }
      &.dark {
        background-color: #705848;
      }
    }
  }
</style>
