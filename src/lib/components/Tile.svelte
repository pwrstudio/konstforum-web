<script lang="ts">
  import { fade } from "svelte/transition"
  import { quadOut } from "svelte/easing"
  import { urlPrefix, focusedPost } from "$lib/stores"
  import type { Language } from "$lib/types"
  import Image from "$lib/components/Image.svelte"

  export let language: Language
  export let post
</script>

<a
  class="tile"
  href={$urlPrefix + "post/" + post.slug.current}
  data-sveltekit-preload-data
>
  {#if post.mainImage}
    <div class="tile-image">
      <Image imageDyad={post.mainImage} caption={post.title} />
    </div>
  {/if}
  <div class="tile-title" class:focused={$focusedPost === post._id}>
    <div>{post.title}</div>
  </div>
</a>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .tile {
    display: grid;
    display: flex;
    grid-template-rows: 1fr auto;
    margin-bottom: 10px;
    break-inside: avoid;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    text-align: center;
    user-select: none;

    // &:nth-child(2) {
    //   margin-top: 100px;
    // }

    .tile-image {
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .tile-title {
      display: flex;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: $black;
      color: $white;
      justify-content: center;
      align-items: center;
      font-family: $COMPRESSED_STACK;
      font-size: $FONT_SIZE_LARGE;
      line-height: 1em;
      text-transform: uppercase;
      opacity: 0;

      &.focused {
        opacity: 1;
      }
    }

    &:hover {
      .tile-title {
        opacity: 1;
      }
    }
  }

  :global(.tile-image img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
