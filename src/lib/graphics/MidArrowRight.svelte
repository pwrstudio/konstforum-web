<script lang="ts">
  export let black = false
</script>

<svg
  id="Layer_2"
  class:black
  data-name="Layer 2"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 6.94 20.64"
>
  <g id="Layer_1-2" data-name="Layer 1">
    <polygon
      class="cls-1"
      points="0 0 4.94 10.42 .14 20.64 2.14 20.64 6.94 10.37 2.04 0 0 0"
    />
  </g>
</svg>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  svg {
    height: 25px;
  }

  .cls-1 {
    // fill: $white;
    fill: currentColor;
  }
  .black {
    .cls-1 {
      stroke: $black;
    }
  }
</style>
