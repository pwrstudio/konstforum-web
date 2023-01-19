<script lang="ts">
  import { fade } from "svelte/transition"
  import { quadOut } from "svelte/easing"
  import { menuActive, languageStore } from "$lib/stores"
  import { onMount } from "svelte"
  import Hamburger from "$lib/components/Hamburger.svelte"
  import Metadata from "$lib/components/Metadata.svelte"
  import { renderBlockText, toPlainText } from "$lib/modules/sanity.js"
  import { Language } from "$lib/types"
  export let data
  const { posts } = data

  let title: string
  let content: string
  let description: string

  $: title =
    $languageStore === Language.English ? "About Konstforum" : "Om Konstforum"

  $: content =
    $languageStore === Language.English
      ? posts[0].content_eng.content
      : posts[0].content_sve.content

  $: description =
    $languageStore === Language.English
      ? toPlainText(posts[0].content_eng.content)
      : toPlainText(posts[0].content_sve.content)

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
      {#each posts as post (post._id)}
        <!-- CENTER -->
        <div class="center" id={post._id}>
          <h2>
            {$languageStore === Language.English ? post.title_eng : post.title}
          </h2>
          <div>
            {@html renderBlockText(
              $languageStore === Language.English
                ? post.content_eng.content
                : post.content_sve.content
            )}
          </div>
        </div>
      {/each}
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
      padding-top: 70px;

      h2 {
        font-family: $COMPRESSED_STACK;
        font-size: $FONT_SIZE_SEMI;
        text-transform: uppercase;
      }

      .content {
        height: calc(100vh - 60px);
        overflow-y: auto;

        .center {
          font-family: $REGULAR_STACK;
          font-size: $FONT_SIZE_MEDIUM;
          width: 800px;
          margin-left: auto;
          margin-right: auto;
          height: fit-content;
          margin-top: 40px;
          line-height: 1.4em;

          @include screen-size("small") {
            width: 90%;
            font-size: $FONT_SIZE_NORMAL;
          }

          h2 {
            padding-top: 20px;

            @include screen-size("small") {
              font-size: $FONT_SIZE_NORMAL;
            }
          }
        }
      }
    }
  }
</style>
