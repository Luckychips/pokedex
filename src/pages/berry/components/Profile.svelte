<script>
    import { onMount } from 'svelte';
    import Icon from 'svelte-awesome';
    import { faSpinner } from '@fortawesome/free-solid-svg-icons';
    export let berry;

    let isLoading = true;

    onMount(() => {
        setTimeout(() => {
            isLoading = false;
        }, 1000);
    });
</script>

<div class="pokemon-profile-header">
    <div class="thumbnail-downloading border-double border-4 border-green-600 rounded-xl">
        {#if isLoading}
            <Icon class="animate-spin text-blue-600 block" data={faSpinner} scale="2" />
        {:else}
            <img src={berry.item.sprites.default} alt="thumbnail" />
        {/if}
    </div>
    <div class="pokemon-name">{berry.item.name}</div>
</div>

<style type="text/scss">
    .pokemon-profile-header {
        display: flex;
        align-items: center;

        .thumbnail-downloading {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 65px;
            height: 65px;
            margin: 15px;
        }

        img {
            width: 35px;
        }

        .pokemon-name {
            font-size: 1.1rem;
            font-weight: bold;
        }
    }
</style>
