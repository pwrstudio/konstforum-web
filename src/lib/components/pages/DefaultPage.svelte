<script lang="ts">
  import { fade } from "svelte/transition"
  import { quadOut } from "svelte/easing"
  import { menuActive } from "$lib/stores"
  import { onMount } from "svelte"
  import Hamburger from "$lib/components/Hamburger.svelte"
  import Metadata from "$lib/components/Metadata.svelte"
  import { renderBlockText, toPlainText } from "$lib/modules/sanity.js"
  import { Language } from "$lib/types"
  export let language: Language
  export let data
  const { post } = data

  const title = language === Language.English ? post.title_eng : post.title

  const content =
    language === Language.English
      ? post.content_eng.content
      : post.content_sve.content

  const description =
    language === Language.English
      ? toPlainText(post.content_eng.content)
      : toPlainText(post.content_sve.content)

  const openMenu = () => {
    menuActive.set(true)
  }

  onMount(async () => {
    menuActive.set(false)
  })
</script>

<Metadata {title} {description} />

{#if !$menuActive}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <span on:click={openMenu}>
    <Hamburger />
  </span>
{/if}

<div class="default-page">
  <div class="inner" in:fade={{ easing: quadOut, duration: 400 }}>
    <div class="content">
      <!-- CENTER -->
      <div class="center">
        <h2>{title}</h2>
        <div>{@html renderBlockText(content)}</div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .default-page {
    width: 100vw;
    background: $white;
    color: $black;
    height: 100vh;
    font-family: $REGULAR_STACK;
    font-size: $FONT_SIZE_LARGE;

    @include screen-size("small") {
      overflow-y: auto;
    }

    .inner {
      margin-left: auto;
      margin-right: auto;
      padding-top: 60px;

      h2 {
        font-family: $COMPRESSED_STACK;
        font-size: $FONT_SIZE_SEMI;
        text-transform: uppercase;
      }

      .content {
        height: calc(100vh - 85px);
        overflow-y: auto;

        .center {
          font-family: $REGULAR_STACK;
          font-size: $FONT_SIZE_MEDIUM;
          width: 800px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1em;
        }
      }
    }
  }
</style>
