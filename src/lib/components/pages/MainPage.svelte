<script lang="ts">
  import Metadata from "$lib/components/Metadata.svelte"
  import { fade } from "svelte/transition"
  import { quadOut } from "svelte/easing"
  import { menuActive } from "$lib/stores"
  import { onMount } from "svelte"
  // import Slideshow from "$lib/components/Slideshow.svelte"
  // import ArtistList from "$lib/components/ArtistList.svelte"
  import Hamburger from "$lib/components/Hamburger.svelte"
  // import LargeArrowDown from "$lib/graphics/LargeArrowDown.svelte"
  import { renderBlockText } from "$lib/modules/sanity"
  import { Language } from "$lib/types"
  // import Image from "$lib/components/Image.svelte"

  export let language: Language
  export let data
  const { posts } = data

  console.log(posts)

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
  <div>POSTER</div>
  {#each posts as post}
    <div>
      <a
        href={urlPrefix + "post/" + post.slug.current}
        data-sveltekit-preload-data>{post.title}</a
      >
    </div>
  {/each}
</div>

<!-- RIGHT -->
<div class="column right" in:fade={{ easing: quadOut, duration: 400 }}>
  <div>POSTER</div>
  {#each posts as post}
    <div>
      <a
        href={urlPrefix + "post/" + post.slug.current}
        data-sveltekit-preload-data>{post.title}</a
      >
    </div>
  {/each}
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
</style>
