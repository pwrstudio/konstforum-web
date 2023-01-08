<script lang="ts">
  export let black = false
</script>

<svg
  id="Layer_2"
  data-name="Layer 2"
  class:black
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 42.96 22.01"
>
  <polyline class="cls-2" points=".27 .27 21.48 21.48 42.69 .27" />
</svg>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  svg {
    height: 22px;
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
