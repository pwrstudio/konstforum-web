<script lang="ts">
  import { UIColor } from "$lib/types"
  export let color: UIColor
  const colorClass = color === UIColor.White ? "white" : ""
</script>

<svg
  id="Layer_2"
  class={colorClass}
  data-name="Layer 2"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 40.53 20.25"
>
  <defs>
    <clipPath id="clippath">
      <rect class="cls-1" width="40.53" height="20.25" />
    </clipPath>
  </defs>
  <g id="Layer_1-2" data-name="Layer 1">
    <g class="cls-3">
      <line class="cls-2" y1=".38" x2="40" y2=".38" />
      <line class="cls-2" y1="10.12" x2="40" y2="10.12" />
      <line class="cls-2" x1=".53" y1="19.88" x2="40.53" y2="19.88" />
    </g>
  </g>
</svg>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  svg {
    width: 40px;
  }

  .cls-1,
  .cls-2 {
    fill: none;
  }

  .cls-3 {
    clip-path: url(#clippath);
  }

  .cls-2 {
    stroke: $black;
    stroke-width: 0.75px;
  }

  .white {
    .cls-2 {
      stroke: $white;
    }
  }
</style>
