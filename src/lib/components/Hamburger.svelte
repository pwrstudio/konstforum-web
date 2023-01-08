<script lang="ts">
  import Hamburger from "$lib/graphics/Hamburger.svelte"
  import { UIColor } from "$lib/types"
  export let color: UIColor = UIColor.Black
</script>

<div class="menu-toggle">
  <Hamburger {color} />
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .menu-toggle {
    position: fixed;
    top: 25px;
    right: 15px;
    z-index: 10000;
    cursor: pointer;

    &.x {
      top: 25px;
      right: 20px;
    }
  }
</style>
