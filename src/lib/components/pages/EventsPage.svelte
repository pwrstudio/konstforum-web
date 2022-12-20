<script lang="ts">
  import Metadata from "$lib/components/Metadata.svelte"
  import { fade } from "svelte/transition"
  import { quadOut } from "svelte/easing"
  import {
    mapMode,
    menuActive,
    filteredPosts,
    filteredEvents,
    activeTypeTags,
    urlPrefix,
  } from "$lib/stores"
  import { onMount } from "svelte"
  import EventItem from "$lib/components/EventItem.svelte"
  import Hamburger from "$lib/components/Hamburger.svelte"
  import type { Language } from "$lib/types"

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
  CALENDAR
</div>

<!-- RIGHT -->
<div class="column right" in:fade={{ easing: quadOut, duration: 400 }}>
  <!-- EVENT LIST  -->
  <div class="post-list">
    <div class="counter">List of {$filteredEvents.length}</div>
    {#each $filteredEvents as event (event._id)}
      <EventItem {event} />
    {/each}
  </div>
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .column {
    height: 100vh;
    position: fixed;
    top: 60px;

    @include screen-size("small") {
      height: auto;
      position: static;
    }

    &.left {
      padding: 10px;
      left: 0;
      width: 66.666666666%;
      background: $white;
      overflow-y: auto;
      color: $black;
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
      left: 66.666666666%;
      width: 33.333333333%;
      display: flex;
      flex-direction: column;
      padding-top: 100px;

      @include screen-size("small") {
        display: none;
      }

      .masonry-container {
        column-count: 2;
        column-gap: 20px;
        padding: 10px;
      }
    }
  }
</style>
