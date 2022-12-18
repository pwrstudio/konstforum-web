<script lang="ts">
  export let black = false
</script>

<svg
  id="Layer_2"
  class:black
  data-name="Layer 2"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 22.01 42.96"
>
  <polyline class="cls-2" points="21.74 .27 .53 21.48 21.74 42.69" />
</svg>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  svg {
    height: 50px;
  }

  .cls-2 {
    fill: transparent;
    stroke: $white;
    stroke-width: 0.75px;
  }

  .black {
    .cls-2 {
      stroke: $black;
    }
  }
</style>
