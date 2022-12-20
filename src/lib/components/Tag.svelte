<script lang="ts">
  import { activeTags } from "$lib/stores"

  export let tag: string

  const toggleTag = () => {
    if ($activeTags.indexOf(tag) === -1) {
      activeTags.set([...$activeTags, tag])
    } else {
      activeTags.set($activeTags.filter(t => t !== tag))
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="tag" class:active={$activeTags.includes(tag)} on:click={toggleTag}>
  {tag}
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .tag {
    font-size: $FONT_SIZE_SMALL;
    display: inline-block;
    border: 1px solid $white;
    padding: 5px 10px;
    border-radius: 10px;
    margin-right: 5px;
    user-select: none;
    cursor: pointer;

    &.active {
      background: $white;
      color: $black;
    }
  }
</style>
