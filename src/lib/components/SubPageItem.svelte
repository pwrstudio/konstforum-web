<script lang="ts">
  import { languageStore, urlPrefix } from "$lib/stores"
  import { Language } from "$lib/types"

  export let subpage
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<a
  href={$urlPrefix + subpage.url}
  data-sveltekit-preload-data
  class="subpage-item"
>
  <div class="bullet" class:active={true} />
  {$languageStore === Language.English ? subpage.englishTitle : subpage.title}
</a>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .subpage-item {
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
    text-decoration: none;

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
