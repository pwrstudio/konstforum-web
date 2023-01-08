<script lang="ts">
  import { UIColor } from "$lib/types"
  export let color: UIColor
  const colorClass = color === UIColor.White ? "white" : ""
</script>

<svg
  class={colorClass}
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
>
  <line class="cls-2" x1="28.55" y1=".27" x2=".27" y2="28.55" />
  <line class="cls-2" x1="28.55" y1="28.55" x2=".27" y2=".27" />
</svg>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  svg {
    // height: 30px;
    // width: 30px;
    height: 100%;
    width: 100%;
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
