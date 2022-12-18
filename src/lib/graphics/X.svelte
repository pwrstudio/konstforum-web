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
  viewBox="0 0 28.82 28.82"
>
  <defs>
    <clipPath id="clippath">
      <rect class="cls-1" width="28.82" height="28.82" />
    </clipPath>
  </defs>
  <g id="Layer_1-2" data-name="Layer 1">
    <g class="cls-3">
      <line class="cls-2" x1="28.55" y1=".27" x2=".27" y2="28.55" />
      <line class="cls-2" x1="28.55" y1="28.55" x2=".27" y2=".27" />
    </g>
  </g>
</svg>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  svg {
    height: 30px;
    width: 30px;
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
