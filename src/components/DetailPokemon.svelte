<script>
    import { onMount } from 'svelte';
    import Icon from 'svelte-awesome';
    import { faSpinner } from '@fortawesome/free-solid-svg-icons';

    export let pokemon;

    let isLoading = true;
    onMount(() => {
        setTimeout(() => {
            isLoading = false;
        }, 1000);
    })
</script>

<section class="">
    <div class="pokemon-profile-header">
        <div class="thumbnail-downloading">
            {#if isLoading}
                <Icon class="animate-spin text-blue-600 block" data={faSpinner} scale="2" />
            {:else}
                <img src={pokemon.sprites.front_default} alt="thumbnail" />
            {/if}
        </div>
        <div class="pokemon-name">{pokemon.name}</div>
    </div>
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
                class:fairy={value.type.name === 'fairy'}>{value.type.name}</span>
        {/each}
    </div>
</section>

<style type="text/scss">
    section {
        .pokemon-profile-header {
            display: flex;
            align-items: center;

            .thumbnail-downloading {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 120px;
                height: 120px;
            }

            img {
                width: 120px;
            }

            .pokemon-name {
                font-size: 1.1rem;
                font-weight: bold;
            }
        }

        .pokemon-types {
            .type-tag {
                color: white;
                font-weight: bold;
                padding: 5px 10px;
                border-radius: 8px;
                margin-right: 10px;

                &.grass { background-color: #78C850; }
                &.poison { background-color: #A040A0; }
                &.fire { background-color: #F08030; }
                &.flying { background-color: #A890F0; }
                &.water { background-color: #6890F0; }
                &.bug { background-color: #A8B820; }
                &.normal { background-color: #A8A878; }
                &.fairy { background-color: #EE99AC; }
                &.ground { background-color: #E0C068; }
                &.electric { background-color: #F8D030; }
                &.psychic { background-color: #F85888; }
                &.ice { background-color: #98D8D8; }
                &.ghost { background-color: #705898; }
                &.steel { background-color: #B8B8D0; }
                &.rock { background-color: #B8A038; }
                &.fighting { background-color: #C03028; }
                &.dragon { background-color: #7038F8; }
                &.dark { background-color: #705848; }
            }
        }
    }
</style>
