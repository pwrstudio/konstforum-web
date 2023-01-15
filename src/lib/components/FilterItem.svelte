<script lang="ts">
  import { activeTypes, languageStore } from "$lib/stores"
  import { Language } from "$lib/types"

  export let filterItem

  const toggleType = () => {
    if ($activeTypes.indexOf(filterItem.type) === -1) {
      activeTypes.set([...$activeTypes, filterItem.type])
    } else {
      activeTypes.set($activeTypes.filter(t => t !== filterItem.type))
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="filter-item" on:click={toggleType}>
  <div class="bullet" class:active={$activeTypes.includes(filterItem.type)} />
  {$languageStore === Language.English
    ? filterItem.englishTitle
    : filterItem.title}
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .filter-item {
    text-transform: uppercase;
    border: 1px solid $black;
    margin-right: 10px;
    padding: 10px;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    cursor: pointer;

    @include screen-size("small") {
      font-size: $FONT_SIZE_XSMALL;
      padding: 6px 8px;
      margin-right: 5px;
    }

    .bullet {
      height: 13px;
      width: 13px;
      border-radius: 10px;
      background: transparent;
      border: 1px solid $black;
      margin-right: 5px;

      @include screen-size("small") {
        height: 7px;
        width: 7px;
      }

      &.active {
        background: $black;
      }
    }
  }
</style>
