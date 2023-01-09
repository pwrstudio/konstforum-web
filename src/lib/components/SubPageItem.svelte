<script lang="ts">
  import { languageStore } from "$lib/stores"
  import { Language } from "$lib/types"
  export let subpage
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<a href={subpage.id} class="subpage-item">
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

    &:hover {
      background: $black;
      color: $white;
    }
  }
</style>
