<script lang="ts">
  import { renderBlockText } from "$lib/modules/sanity"
  import type { Post } from "$lib/types"
  export let post: Post
</script>

<div class="anslag">
  <div class="content">
    {@html renderBlockText(post.content_sve?.content ?? [])}
  </div>
  <div class="author">
    {post.name}
  </div>
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .anslag {
    padding: 20px;
    padding-top: 10px;
    background: $lime;
    display: inline-block;
    width: calc(50% - 60px);
    max-width: 500px;
    margin: 15px;
    height: auto;
    font-size: $FONT_SIZE_MEDIUM;

    @include screen-size("small") {
      width: 100%;
      max-width: unset;
    }

    .content {
      font-size: $FONT_SIZE_MEDIUM;
      line-height: 1.2em;
    }

    .author {
      text-transform: uppercase;
      font-size: $FONT_SIZE_SMALL;
      border: 1px solid $black;
      border-radius: 15px;
      display: inline-block;
      padding: 5px 15px;
    }
  }
</style>
