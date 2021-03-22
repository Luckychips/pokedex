<script>
  export let dismiss;
</script>

<figure class="popup-view" on:click={(e) => dismiss()}>
  <div>hello world</div>
</figure>

<style type="text/scss">
  .popup-view {
    z-index: 9999;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);

    & > div {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      width: 70%;
      height: 70%;
      border-radius: 10px;
      padding: 15px;
      box-shadow: 10px 10px 35px grey;
    }
  }
</style>
