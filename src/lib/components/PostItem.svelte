<script lang="ts">
  import { fade } from "svelte/transition"
  import { urlPrefix, languageStore, focusedPost } from "$lib/stores"
  import { renderBlockText } from "$lib/modules/sanity"
  import { Language, type Post, type Block } from "$lib/types"
  import MidArrowRight from "$lib/graphics/MidArrowRight.svelte"
  import MidArrowLeft from "$lib/graphics/MidArrowLeft.svelte"
  import Image from "$lib/components/Image.svelte"

  export let post: Post

  let extended = false
  const toggleExtended = () => {
    extended = !extended
  }

  let title: string
  let content: Block[]
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
      {#if extended}
        <MidArrowLeft />
      {:else}
        <MidArrowRight />
      {/if}
    </div>
  </div>

  {#if extended}
    <a
      href={$urlPrefix + "post/" + post.slug?.current}
      data-sveltekit-preload-data
      class="post-item-body"
      in:fade={{ duration: 300 }}
    >
      <div class="image">
        <Image imageDyad={post.mainImage} width={300} />
      </div>
      <div class="text">
        {#if content}
          {@html renderBlockText(content)}
        {/if}
        <div class="read-more">
          <div>Läs vidare</div>
          <MidArrowRight />
        </div>
      </div>
    </a>
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
      padding-bottom: 1em;
      display: flex;
      justify-content: space-between;

      .left {
        max-width: 90%;
      }

      .right {
        display: flex;
        align-items: center;
        padding-bottom: 5px;
      }
    }

    .post-item-body {
      display: flex;
      padding-bottom: 20px;
      text-decoration: none;

      .image {
        width: 50%;
        padding-right: 10px;
        border-radius: 10px;
      }

      .text {
        font-size: $FONT_SIZE_SMALL;
        width: 50%;
        line-height: 1.6em;

        .read-more {
          div {
            margin-bottom: 3px;
          }
        }
      }
    }

    &:hover {
      color: $lime;
    }
  }

  :global(.text p:first-child) {
    margin-top: 0;
  }

  :global(.image img) {
    border-radius: 10px;
  }
</style>
