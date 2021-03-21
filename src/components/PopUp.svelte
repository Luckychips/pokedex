<script>

</script>

<figure class="popup-view">
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
        }
    }
</style>
