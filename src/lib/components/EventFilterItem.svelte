<script lang="ts">
  import { activeEventTypes, languageStore } from "$lib/stores"
  import { Language } from "$lib/types"

  export let filterItem

  const toggleType = () => {
    if ($activeEventTypes.indexOf(filterItem.type) === -1) {
      activeEventTypes.set([...$activeEventTypes, filterItem.type])
    } else {
      activeEventTypes.set($activeEventTypes.filter(t => t !== filterItem.type))
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="filter-item" on:click={toggleType}>
  <div
    class="bullet"
    class:active={$activeEventTypes.includes(filterItem.type)}
  />
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

    .bullet {
      height: 13px;
      width: 13px;
      border-radius: 10px;
      background: transparent;
      border: 1px solid $black;
      margin-right: 5px;

      &.active {
        background: $black;
      }
    }
  }
</style>
