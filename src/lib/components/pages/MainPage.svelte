<script lang="ts">
  import PostForm from "$lib/components/forms/PostForm.svelte"
  import Metadata from "$lib/components/Metadata.svelte"
  import { fade } from "svelte/transition"
  import { quadOut } from "svelte/easing"
  import {
    mapMode,
    menuActive,
    filteredPosts,
    splitPosts,
    activeTypeTags,
    urlPrefix,
  } from "$lib/stores"
  import { onMount } from "svelte"
  import Map from "$lib/components/Map.svelte"
  import PostItem from "$lib/components/PostItem.svelte"
  import Tag from "$lib/components/Tag.svelte"
  import Tile from "$lib/components/Tile.svelte"
  import Hamburger from "$lib/components/Hamburger.svelte"
  import X from "$lib/graphics/X.svelte"
  import LargeArrowDown from "$lib/graphics/LargeArrowDown.svelte"
  import type { Language } from "$lib/types"

  export let language: Language
  export let isSearch = false
  export let data

  let formActive = false

  const openMenu = () => {
    menuActive.set(true)
  }

  const toggleForm = () => {
    formActive = !formActive
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
    <div class="counter">
      List of {isSearch ? data.posts.length : $filteredPosts.length}
    </div>
    {#each isSearch ? data.posts : $filteredPosts as post (post._id)}
      <PostItem {post} />
    {/each}
  </div>
</div>

<!-- RIGHT -->
<div class="column right" in:fade={{ easing: quadOut, duration: 400 }}>
  {#if $mapMode}
    <Map />
  {:else}
    <div class="inner evens">
      {#each isSearch ? data.posts : $splitPosts.evens as post (post._id)}
        <Tile {post} {language} />
      {/each}
    </div>
    <div class="inner odds">
      {#each isSearch ? data.posts : $splitPosts.odds as post (post._id)}
        <Tile {post} {language} />
      {/each}
    </div>
  {/if}
</div>

{#if formActive}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="close-form" on:click={toggleForm}>
    <X />
  </div>
  <div class="post-form">
    <PostForm />
  </div>
{:else}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="post-form-banner" on:click={toggleForm}>
    <div class="text">Var med på Konstforum?</div>
    <div class="arrow"><LargeArrowDown black={true} /></div>
  </div>
{/if}

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .column {
    height: calc(100vh - 60px);
    position: fixed;
    top: 70px;

    @include screen-size("small") {
      height: auto;
      position: static;
      padding-top: 75px;
    }

    &.left {
      padding: 10px;
      left: 0;
      width: 33.333333333%;
      background: $black;
      overflow-y: auto;
      color: $white;
      padding-left: 35px;
      padding-right: 20px;
      padding-top: 10px;

      @include screen-size("small") {
        left: unset;
        width: 100%;
        display: none;
      }

      .tags {
        margin-bottom: 5px;
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
      background: $lime;
      overflow-y: auto;

      @include screen-size("small") {
        left: unset;
        width: 100%;
        min-height: 100vh;
      }

      .inner {
        width: 50%;
        padding: 15px;
        padding-top: 0;
        padding-bottom: 40px;
        height: fit-content;

        @include screen-size("small") {
          padding: 10px;
        }

        &.odds {
          margin-top: 85px;

          @include screen-size("small") {
            margin-top: unset;
          }
        }
      }
    }
  }

  .post-form {
    position: fixed;
    left: 66.666666666%;
    width: 33.333333333%;
    height: calc(100vh - 70px);
    padding-bottom: 40px;
    top: 70px;
    z-index: 1000;
    background: $white;
    overflow-y: auto;

    @include screen-size("small") {
      left: 0;
      width: 100vw;
      padding: 10px 10px;
      height: calc(100vh - 70px);
      top: 70px;
    }
  }

  .post-form-banner {
    position: fixed;
    left: 66.666666666%;
    width: 33.333333333%;
    padding: 20px 20px;
    height: 70px;
    top: 70px;
    z-index: 1000;
    background: $white;
    display: flex;
    justify-content: space-between;
    font-size: $FONT_SIZE_MEDIUM;
    font-family: $COMPRESSED_STACK;
    text-transform: uppercase;
    cursor: pointer;
    user-select: none;

    @include screen-size("small") {
      left: 0;
      width: 100vw;
      padding: 20px 20px;
      height: 70px;
      top: unset;
      bottom: 0;
    }
  }

  .close-form {
    position: fixed;
    right: 20px;
    width: 30px;
    height: 30px;
    top: 90px;
    z-index: 1001;
    cursor: pointer;
  }
</style>
