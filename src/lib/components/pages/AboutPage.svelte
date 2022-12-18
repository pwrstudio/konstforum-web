<script lang="ts">
  import Metadata from "$lib/components/Metadata.svelte"
  import { fade } from "svelte/transition"
  import { quadOut } from "svelte/easing"
  import { menuActive } from "$lib/stores"
  import { onMount } from "svelte"
  import { renderBlockText } from "$lib/modules/sanity.js"
  import X from "$lib/components/X.svelte"
  import { Language, type AboutPageType } from "$lib/types"
  export let language: Language
  export let data: AboutPageType
  const urlPrefix = language === Language.English ? "/en/" : "/"

  onMount(async () => {
    menuActive.set(false)
  })
</script>

<Metadata title={"Om Plattform KcSyd"} />

<a href={urlPrefix + ""}>
  <X />
</a>

<div class="page">
  <div class="inner about" in:fade={{ easing: quadOut, duration: 400 }}>
    {#if language === Language.English}
      <div>{@html renderBlockText(data.content_eng.content)}</div>
    {:else}
      <div>{@html renderBlockText(data.content_sve.content)}</div>
    {/if}
    <div class="sidfot">
      <div class="text-logotyp">Plattform KcSyd</div>
      <div class="tagline">
        <div>
          En konstnärsdriven plattform för offentlig konst i södra Sverige
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .page {
    background: $lime;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    padding-top: 35px;
    font-family: $BARBARA_STACK;
    font-size: $FONT_SIZE_LARGE;

    @include screen-size("small") {
      font-size: $FONT_SIZE_MEDIUM;
    }

    .inner {
      width: 720px;
      margin-left: auto;
      margin-right: auto;
      max-width: 90vw;

      @include screen-size("small") {
        padding-top: 50px;
      }
    }
  }

  h1 {
    text-transform: uppercase;
  }

  :global(.page .small) {
    font-family: $ATLAS_STACK;
    font-size: $FONT_SIZE_MEDIUM;
    margin-left: 35px;

    @include screen-size("small") {
      margin-left: 20px;
    }
  }

  :global(.page h2:first-child) {
    margin-top: 0;
  }

  :global(.page h2) {
    font-size: $FONT_SIZE_LARGE;
    margin-top: 2em;

    @include screen-size("small") {
      font-size: $FONT_SIZE_MEDIUM;
    }
  }

  :global(.page img) {
    margin-top: 10px;
    width: 100%;
  }

  :global(.page figure) {
    margin-left: 0;
    margin-right: 0;
  }

  .sidfot {
    margin-top: 40px;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    display: flex;
    min-height: 200px;
    margin-bottom: 35px;

    @include screen-size("small") {
      flex-wrap: wrap;
      min-height: unset;
    }

    .text-logotyp {
      margin: 15px;
      font-size: $FONT_SIZE_XLARGE;
      line-height: 1em;
      width: 50%;
      border-right: 1px solid black;

      @include screen-size("small") {
        font-size: $FONT_SIZE_SEMI_EXTRA;
        padding-bottom: 15px;
        padding-top: 15px;
        margin: unset;
        width: 100%;
        border-right: unset;
        border-bottom: 1px solid black;
      }
    }

    .tagline {
      margin: 15px;
      font-size: $FONT_SIZE_SEMI_EXTRA;
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      @include screen-size("small") {
        padding-bottom: 15px;
        padding-top: 15px;
        margin: unset;
        width: 100%;
        font-size: $FONT_SIZE_LARGE;
      }
    }
  }
</style>
