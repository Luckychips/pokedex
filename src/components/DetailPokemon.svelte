<script>
    export let pokemon;

    // function getTypeColor(type) {
    //     let className = '';
    //     switch (type) {
    //         case 'grass':
    //             className = 'grass';
    //             break;
    //         case 'poison':
    //             break;
    //
    //     }
    //
    //     return className;
    // }
</script>

<section class="">
    <div class="pokemon-profile-header">
        <img src={pokemon.sprites.front_default} alt="thumbnail" />
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
                class:water={value.type.name === 'water'}>{value.type.name}</span>
        {/each}
    </div>
</section>

<style type="text/scss">
    section {
        .pokemon-profile-header {
            display: flex;
            align-items: center;

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

                &.grass {
                    background-color: #78C850;
                }

                &.poison {
                    background-color: #A040A0;
                }

                &.fire {
                    background-color: #F08030;
                }

                &.flying {
                    background-color: #A890F0;
                }

                &.water {
                    background-color: #6890F0;
                }
            }
        }
    }
</style>
