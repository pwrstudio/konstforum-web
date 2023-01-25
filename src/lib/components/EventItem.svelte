<script lang="ts">
  import { languageStore, activeEventSlug } from "$lib/stores"
  import { format } from "date-fns"
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

<a
  href={event.website}
  target="_blank"
  rel="noreferrer"
  class="event-item"
  class:selected={$activeEventSlug == event.slug?.current}
  id={event.slug?.current}
>
  <div class="event-item-header">
    <div class="left">
      <!-- TITLE -->
      <div class="event-title">
        {title}
      </div>
      <!-- LOCATION -->
      <div class="event-location">
        {location}
      </div>
      <!-- TIME -->
      <div class="event-date">
        {#if event.time}
          {format(Date.parse(event.time), "d MMMM yyyy, hh:mm")}
        {/if}
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
</a>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .event-item {
    font-family: $MONO_STACK;
    font-size: $FONT_SIZE_NORMAL;
    padding-top: 5px;
    width: calc(100% - 5px);
    border-top: 1px solid $black;
    cursor: pointer;
    user-select: none;
    padding-bottom: 10px;
    text-decoration: none;
    display: block;

    &.selected {
      text-decoration: underline;
    }

    @include screen-size("small") {
      width: 100%;
    }

    .event-item-header {
      height: 55px;
      display: flex;
      justify-content: space-between;

      .right {
        width: 30px;
        opacity: 0;
        @include screen-size("small") {
          display: none;
        }
      }
    }

    .event-item-body {
      display: flex;
      padding-bottom: 20px;

      .image {
        width: 50%;
        padding-right: 10px;
        border-radius: 10px;
        overflow: hidden;
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

  :global(.image img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

  :global(.image) {
    height: fit-content;
  }
</style>
