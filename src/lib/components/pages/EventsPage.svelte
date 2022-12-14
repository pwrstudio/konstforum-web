<script lang="ts">
  import EventForm from "$lib/components/forms/EventForm.svelte"
  import Metadata from "$lib/components/Metadata.svelte"
  import { fade } from "svelte/transition"
  import { quadOut } from "svelte/easing"
  import { menuActive, filteredEvents } from "$lib/stores"
  import { onMount } from "svelte"
  import Calendar from "$lib/components/Calendar.svelte"
  import EventItem from "$lib/components/EventItem.svelte"
  import Hamburger from "$lib/components/Hamburger.svelte"
  import X from "$lib/graphics/X.svelte"
  import LargeArrowDown from "$lib/graphics/LargeArrowDown.svelte"
  import { type Language, UIColor } from "$lib/types"

  export let language: Language

  let formActive = false

  const toggleForm = () => {
    formActive = !formActive
  }

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
  <Calendar />
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

{#if formActive}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="close-form" on:click={toggleForm}>
    <X color={UIColor.White} />
  </div>
  <div class="event-form">
    <EventForm />
  </div>
{:else}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="event-form-banner" on:click={toggleForm}>
    <div class="text">NYTT EVENEMANG?</div>
    <div class="arrow"><LargeArrowDown /></div>
  </div>
{/if}

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

  .event-form {
    position: fixed;
    left: 66.666666666%;
    width: 33.333333333%;
    height: calc(100vh - 70px);
    padding-bottom: 40px;
    top: 70px;
    z-index: 1000;
    background: $black;
    color: $white;
    overflow-y: auto;
  }

  .event-form-banner {
    position: fixed;
    left: 66.666666666%;
    width: 33.333333333%;
    padding: 20px 20px;
    height: 70px;
    top: 70px;
    z-index: 1000;
    background: $black;
    color: $white;
    display: flex;
    justify-content: space-between;
    font-size: $FONT_SIZE_MEDIUM;
    font-family: $COMPRESSED_STACK;
    text-transform: uppercase;
    cursor: pointer;
    user-select: none;
  }

  .close-form {
    position: fixed;
    right: 20px;
    width: 40px;
    height: 40px;
    top: 90px;
    z-index: 1001;
    cursor: pointer;
  }
</style>
