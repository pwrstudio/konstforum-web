<script lang="ts">
  import Metadata from "$lib/components/Metadata.svelte"
  import { fade } from "svelte/transition"
  import { quadOut } from "svelte/easing"
  import { urlPrefix, languageStore, focusedPost } from "$lib/stores"
  import { renderBlockText } from "$lib/modules/sanity"
  import { Language } from "$lib/types"
  import LargeArrowRight from "$lib/graphics/LargeArrowRight.svelte"
  import Image from "$lib/components/Image.svelte"

  export let language: Language
  export let post

  const tags =
    $languageStore === Language.English ? post.tags_eng : post.tags_sve
</script>

<div class="post-item">
  <div class="left">
    <div class="post-title">
      {post.title}
    </div>
    <div class="post-tags">
      {tags.join(",")}
    </div>
  </div>
  <div class="right">
    <LargeArrowRight />
  </div>
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .post-item {
    font-size: $FONT_SIZE_NORMAL;
    padding-top: 5px;
    width: 100%;
    border-bottom: 1px solid $white;
    height: 60px;
    display: flex;
    justify-content: space-between;
    color: $white;
    cursor: pointer;
    user-select: none;

    .right {
      width: 30px;
      opacity: 0;
    }

    &:hover {
      color: $lime;
    }
  }
</style>
