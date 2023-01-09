<script lang="ts">
  import { Language } from "$lib/types"
  import { mapMode, languageStore } from "$lib/stores"

  const toggleMapMode = () => {
    mapMode.set(!$mapMode)
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="toolbar-item map-mode"
  class:active={$mapMode}
  on:click={toggleMapMode}
>
  {#if $mapMode}
    {$languageStore === Language.English ? "LIST" : "LISTA"}
  {:else}
    {$languageStore === Language.English ? "MAP" : "KARTA"}
  {/if}
</div>

<style lang="scss" global>
  @import "src/lib/style/variables.scss";

  .toolbar-item {
    border: 1px solid $black;
    border-radius: 20px;
    padding: 10px;
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;

    &.map-mode {
      font-size: $FONT_SIZE_XSMALL;
      user-select: none;
      cursor: pointer;

      &:hover {
        background: $black;
        color: $white;
      }
    }
  }
</style>
