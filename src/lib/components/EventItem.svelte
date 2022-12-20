<script lang="ts">
  import { fade } from "svelte/transition"
  import { quadOut } from "svelte/easing"
  import { urlPrefix, languageStore } from "$lib/stores"
  import { renderBlockText } from "$lib/modules/sanity"
  import { Language } from "$lib/types"
  import LargeArrowRight from "$lib/graphics/LargeArrowRight.svelte"
  import Image from "$lib/components/Image.svelte"

  export let event

  let extended = false
  const toggleExtended = () => {
    extended = !extended
  }

  let title: string
  let tags: string[]
  let location =
    $languageStore === Language.English
      ? event.locationText_eng
      : event.locationText_sve

  $: tags =
    ($languageStore === Language.English ? event.tags_eng : event.tags_sve) ||
    []

  $: title = $languageStore === Language.English ? event.title_eng : event.title
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="event-item">
  <div class="event-item-header">
    <div class="left">
      <!-- TITLE -->
      <div class="event-title">
        {title}
      </div>
      <!-- TIME -->
      <div class="event-date">
        {event.time}
      </div>
      <!-- LOCATION -->
      <div class="event-location">
        {location}
      </div>
      <!-- IMAGE -->
      {#if event.mainImage}
        <div class="image">
          <Image imageDyad={event.mainImage} width={300} />
        </div>
      {/if}
    </div>
    <div class="right">
      <LargeArrowRight />
    </div>
  </div>
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .event-item {
    font-family: $MONO_STACK;
    font-size: $FONT_SIZE_NORMAL;
    padding-top: 5px;
    width: 100%;
    border-bottom: 1px solid $black;
    cursor: pointer;
    user-select: none;
    padding-bottom: 10px;

    .event-item-header {
      height: 55px;
      display: flex;
      justify-content: space-between;

      .right {
        width: 30px;
        opacity: 0;
      }
    }

    .event-item-body {
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
  }

  :global(.text p:first-child) {
    margin-top: 0;
  }
</style>
