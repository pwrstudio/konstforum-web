<script lang="ts">
  import { fade } from "svelte/transition"
  import { quadOut } from "svelte/easing"
  import { urlPrefix, languageStore, focusedPost } from "$lib/stores"
  import { renderBlockText } from "$lib/modules/sanity"
  import { Language } from "$lib/types"
  import LargeArrowRight from "$lib/graphics/LargeArrowRight.svelte"
  import Image from "$lib/components/Image.svelte"

  export let post

  let extended = false
  const toggleExtended = () => {
    extended = !extended
  }

  let title: string
  let content: string
  let tags: string[]

  $: tags =
    ($languageStore === Language.English ? post.tags_eng : post.tags_sve) || []

  $: title = $languageStore === Language.English ? post.title_eng : post.title

  $: content =
    $languageStore === Language.English
      ? post.shortText_eng?.content
      : post.shortText_sve?.content

  const setFocus = () => {
    focusedPost.set(post._id)
  }

  const unsetFocus = () => {
    focusedPost.set("")
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="post-item" on:mouseenter={setFocus} on:mouseleave={unsetFocus}>
  <div class="post-item-header" on:click={toggleExtended}>
    <div class="left">
      <div class="post-title">
        {title}
      </div>
      <div class="post-tags">
        {tags.join(",")}
      </div>
    </div>
    <div class="right">
      <LargeArrowRight />
    </div>
  </div>

  {#if extended}
    <div class="post-item-body">
      <div class="image">
        <Image imageDyad={post.mainImage} width={300} />
      </div>
      <div class="text">
        {#if content}
          {@html renderBlockText(content)}
          <a
            href={$urlPrefix + "post/" + post.slug?.current}
            data-sveltekit-preload-data
            class="read-more">Läs vidare</a
          >
        {/if}
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .post-item {
    font-size: $FONT_SIZE_NORMAL;
    padding-top: 5px;
    width: 100%;
    border-bottom: 1px solid $white;
    color: $white;
    cursor: pointer;
    user-select: none;

    .post-item-header {
      height: 55px;
      display: flex;
      justify-content: space-between;

      .right {
        width: 30px;
        opacity: 0;
      }
    }

    .post-item-body {
      display: flex;
      padding-bottom: 20px;

      .image {
        width: 50%;
        padding-right: 10px;
      }

      .text {
        font-size: $FONT_SIZE_SMALL;
        width: 50%;
      }
    }

    &:hover {
      color: $lime;
    }
  }

  :global(.text p:first-child) {
    margin-top: 0;
  }
</style>
