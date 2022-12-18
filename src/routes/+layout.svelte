<script lang="ts">
  import X from "$lib/components/X.svelte"
  import Menu from "$lib/components/Menu.svelte"
  import { menuActive } from "$lib/stores"

  export let data

  const closeMenu = () => {
    menuActive.set(false)
  }
</script>

<nav class="top-bar">
  <div>Konstforum i Skåne</div>
</nav>

{#if $menuActive}
  <span on:click={closeMenu}>
    <X />
  </span>
  <Menu />
{/if}

<slot />

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .top-bar {
    height: 60px;
    top: 0;
    left: 0;
    width: 100vw;
    z-index: 10000;
    background: $lime;
    position: fixed;
  }
</style>
