<script lang="ts">
  import { Language } from "$lib/types"
  import { languageStore } from "$lib/stores"

  const toggleLanguage = () => {
    if ($languageStore === Language.English) {
      languageStore.set(Language.Swedish)
    } else {
      languageStore.set(Language.English)
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="toolbar-item language" on:click={toggleLanguage}>
  {$languageStore === Language.English ? "SV" : "EN"}
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

    @include screen-size("small") {
      padding: 5px;
      margin-right: 5px;
    }

    &.language {
      font-size: $FONT_SIZE_XSMALL;
      user-select: none;
      cursor: pointer;
      padding: unset;
      height: 25px;
      width: 25px;
      border-radius: 100%;

      &:hover {
        background: $black;
        color: $white;
      }
    }
  }
</style>
