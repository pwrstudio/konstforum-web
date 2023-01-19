<script lang="ts">
  import Image from "$lib/components/Image.svelte"
  import { Language } from "$lib/types"
  export let language: Language
  export let post: any
  const caption = Language.English ? post.title_eng : post.title
</script>

<div class="inner">
  <div class="image">
    <Image imageDyad={post.mainImage} {caption} />
  </div>
  <div class="caption">
    <div>{caption}</div>
  </div>
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .inner {
    width: 100%;
    height: calc(100% - 20px);
    font-family: $MONO_STACK;
    font-size: $FONT_SIZE_SMALL;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    color: $white;
    user-select: none;

    img {
      max-width: 100%;
      user-select: none;
      mix-blend-mode: multiply;
    }

    .caption {
      width: 100%;
      text-align: center;
      padding: 0 10px;
      display: flex;
      justify-content: center;
      .arrow {
        height: 8px;
        width: 8px;
      }
    }
  }

  :global(.inner img) {
    max-width: 100%;
  }
</style>
