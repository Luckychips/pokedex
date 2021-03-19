<script>
  import Icon from 'svelte-awesome';
  import { faSpinner } from '@fortawesome/free-solid-svg-icons';
</script>

<main class="loading-indicator">
  <div class="icon-wrapper">
    <Icon class="animate-spin text-blue-600 block" data={faSpinner} scale="5" />
  </div>
</main>

<style type="text/scss">
  .loading-indicator {
    position: relative;
    margin-top: 250px;
  }

  .icon-wrapper {
    position: absolute;
    left: 50%;
  }
</style>
