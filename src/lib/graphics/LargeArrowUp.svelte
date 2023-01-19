<script lang="ts">
  export let black = false
</script>

<svg
  id="Layer_2"
  class:black
  data-name="Layer 2"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 40.45 21.09"
>
  <defs>
    <clipPath id="clippath">
      <rect class="cls-1" width="40.45" height="21.09" />
    </clipPath>
  </defs>
  <g id="Layer_1-2" data-name="Layer 1">
    <g class="cls-3">
      <polyline class="cls-2" points="40.09 20.73 20.07 .71 .36 20.73" />
    </g>
  </g>
</svg>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  svg {
    height: 16px;
  }

  .cls-1,
  .cls-2 {
    fill: none;
  }

  .cls-3 {
    clip-path: url(#clippath);
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
