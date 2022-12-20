<script lang="ts">
  import Metadata from "$lib/components/Metadata.svelte"
  import { fade } from "svelte/transition"
  import { quadOut } from "svelte/easing"
  import {
    menuActive,
    filteredPosts,
    activeTypeTags,
    urlPrefix,
  } from "$lib/stores"
  import { onMount } from "svelte"
  import PostItem from "$lib/components/PostItem.svelte"
  import Tag from "$lib/components/Tag.svelte"
  import Tile from "$lib/components/Tile.svelte"
  import Hamburger from "$lib/components/Hamburger.svelte"
  import type { Language } from "$lib/types"
  import Image from "$lib/components/Image.svelte"

  export let language: Language

  const openMenu = () => {
    menuActive.set(true)
  }

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
    {#each $activeTypeTags as tag}
      <Tag {tag} />
    {/each}
  </div>
  <!-- POST LIST  -->
  <div class="post-list">
    <div class="counter">List of {$filteredPosts.length}</div>
    {#each $filteredPosts as post (post._id)}
      <PostItem {post} {language} />
    {/each}
  </div>
</div>

<!-- RIGHT -->
<div class="column right" in:fade={{ easing: quadOut, duration: 400 }}>
  <div class="masonry-container">
    {#each $filteredPosts as post (post._id)}
      <Tile {post} {language} />
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
      padding-left: 35px;
      padding-right: 15px;
      padding-top: 20px;

      @include screen-size("small") {
        left: unset;
        width: 100%;
      }

      .tags {
        margin-bottom: 20px;
      }

      .post-list {
        width: 100%;
        font-family: $MONO_STACK;

        .counter {
          font-size: $FONT_SIZE_SMALL;
          border-bottom: 1px solid $white;
          padding-bottom: 10px;
        }
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
      }

      .masonry-container {
        column-count: 2;
        column-gap: 20px;
      }
    }
  }
</style>
