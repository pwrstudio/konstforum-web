<script lang="ts">
  export let black = false
</script>

<svg
  id="Layer_2"
  class:black
  data-name="Layer 2"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
>
  <polyline class="cls-2" points=".27 42.69 21.48 21.48 .27 .27" />
</svg>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  svg {
    height: 100%;
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
