<script lang="ts">
  import X from "$lib/graphics/X.svelte"
  import { UIColor } from "$lib/types"
  export let color: UIColor = UIColor.Black
</script>

<div class="menu-toggle">
  <X {color} />
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .menu-toggle {
    position: fixed;
    z-index: 1001;
    cursor: pointer;

    top: 20px;
    right: 20px;

    @include screen-size("small") {
      top: 80px;
    }
  }
</style>
