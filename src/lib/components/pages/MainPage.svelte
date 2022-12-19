<script lang="ts">
  import Metadata from "$lib/components/Metadata.svelte"
  import { fade } from "svelte/transition"
  import { quadOut } from "svelte/easing"
  import { menuActive } from "$lib/stores"
  import { onMount } from "svelte"
  import Hamburger from "$lib/components/Hamburger.svelte"
  // import LargeArrowDown from "$lib/graphics/LargeArrowDown.svelte"
  import { renderBlockText } from "$lib/modules/sanity"
  import { Language } from "$lib/types"
  import LargeArrowRight from "$lib/graphics/LargeArrowRight.svelte"
  import Image from "$lib/components/Image.svelte"

  export let language: Language
  export let data
  const { posts } = data

  console.log(posts)

  const tags =
    language === Language.English
      ? posts.flatMap(p => p.tags_eng).filter(t => t !== undefined)
      : posts.flatMap(p => p.tags_sve).filter(t => t !== undefined)

  const openMenu = () => {
    menuActive.set(true)
  }

  const urlPrefix = language === Language.English ? "/en/" : "/"

  onMount(async () => {
    menuActive.set(false)
  })
</script>

<Metadata />

{#if !$menuActive}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <span on:click={openMenu}>
    <Hamburger />
  </span>
{/if}

<!-- LEFT -->
<div class="column left" in:fade={{ easing: quadOut, duration: 400 }}>
  <!-- TAGS -->
  <div class="tags">
    {#each tags as tag}
      <div class="tag">{tag}</div>
    {/each}
  </div>
  <!-- POST LIST  -->
  <div class="post-list">
    <div class="counter">List of {posts.length}</div>
    {#each posts as post}
      <div class="post-item">
        <div class="left">
          <div class="post-title">
            {post.title}
          </div>
          {#if post.tags_sve}
            <div class="post-tags">
              {#each post.tags_sve as tag}
                {tag}
              {/each}
            </div>
          {/if}
        </div>
        <div class="right">
          <LargeArrowRight />
        </div>
      </div>
    {/each}
  </div>
</div>

<!-- RIGHT -->
<div class="column right" in:fade={{ easing: quadOut, duration: 400 }}>
  <div class="masonry-container">
    {#each posts as post}
      <a
        class="tile"
        href={urlPrefix + "post/" + post.slug.current}
        data-sveltekit-preload-data
      >
        {#if post.mainImage}
          <div class="tile-image">
            <Image imageDyad={post.mainImage} caption={post.title} />
          </div>
        {/if}
        <div class="tile-title">
          <div>{post.title}</div>
        </div>
      </a>
    {/each}
  </div>
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .column {
    height: 100vh;
    position: fixed;
    top: 60px;
    padding: 10px;

    @include screen-size("small") {
      height: auto;
      position: static;
    }

    &.left {
      left: 0;
      width: 33.333333333%;
      background: $black;
      overflow-y: auto;
      color: $white;

      @include screen-size("small") {
        left: unset;
        width: 100%;
      }
    }

    &.right {
      left: 33.333333333%;
      width: 66.666666666%;
      display: flex;
      flex-direction: column;
      background: $lime;

      @include screen-size("small") {
        display: none;
        &.landing {
          display: flex;
          left: unset;
          width: 100%;
        }
      }
    }
  }

  .tags {
    margin-bottom: 20px;

    .tag {
      font-size: $FONT_SIZE_SMALL;
      display: inline-block;
      border: 1px solid $white;
      padding: 5px;
      border-radius: 5px;
      margin-right: 5px;
    }
  }

  .post-list {
    width: 100%;
    font-family: $MONO_STACK;

    .counter {
      font-size: $FONT_SIZE_SMALL;
      border-bottom: 1px solid $white;
    }

    .post-item {
      width: 100%;
      border-bottom: 1px solid $white;
      height: 60px;
      display: flex;
      justify-content: space-between;

      .right {
        width: 30px;
      }
    }
  }

  .masonry-container {
    column-count: 2;
    column-gap: 10px;

    .tile {
      display: grid;
      display: flex;
      grid-template-rows: 1fr auto;
      margin-bottom: 10px;
      break-inside: avoid;
      border-radius: 20px;
      overflow: hidden;
      position: relative;

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
        font-size: $FONT_SIZE_XLARGE;
        text-transform: uppercase;
        opacity: 0;
      }

      &:hover {
        .tile-title {
          opacity: 1;
        }
      }
    }
  }

  :global(.tile-image img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
