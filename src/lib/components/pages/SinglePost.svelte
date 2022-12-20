<script lang="ts">
  import { fade } from "svelte/transition"
  import { quadOut } from "svelte/easing"
  import { menuActive, urlPrefix, languageStore } from "$lib/stores"
  import { onMount } from "svelte"
  import Metadata from "$lib/components/Metadata.svelte"
  import X from "$lib/components/X.svelte"
  import SinglePostSlideshow from "$lib/components/SinglePostSlideshow.svelte"
  import SinglePostImage from "$lib/components/SinglePostImage.svelte"
  import { renderBlockText, toPlainText } from "$lib/modules/sanity.js"
  import { Language } from "$lib/types"
  export let language: Language
  export let data
  const { post } = data

  let title: string
  let content: string
  let description: string

  $: title = $languageStore === Language.English ? post.title_eng : post.title

  $: content =
    $languageStore === Language.English
      ? post.content_eng?.content
      : post.content_sve?.content

  $: description =
    $languageStore === Language.English
      ? toPlainText(post.content_eng?.content)
      : toPlainText(post.content_sve?.content)

  onMount(async () => {
    menuActive.set(false)
  })
</script>

<Metadata {title} {description} />

<a href={$urlPrefix} data-sveltekit-preload-data>
  <X />
</a>

<div class="single-post">
  <div class="inner" in:fade={{ easing: quadOut, duration: 400 }}>
    <div class="content">
      <!-- LEFT -->
      <div class="column left">
        {#if post.bildspel && post.bildspel.length > 0}
          <SinglePostSlideshow slides={post.bildspel} {language} />
        {:else}
          <SinglePostImage {post} {language} />
        {/if}
      </div>
      <!-- RIGHT -->
      <div class="column right">
        <h2>{title}</h2>
        {#if content}
          <div>{@html renderBlockText(content)}</div>
        {/if}
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .single-post {
    width: 100vw;
    background: $white;
    color: $black;
    height: 100vh;
    font-family: $REGULAR_STACK;

    @include screen-size("small") {
      overflow-y: auto;
    }

    .inner {
      margin-left: auto;
      margin-right: auto;
      padding-top: 60px;

      h2 {
        font-size: $FONT_SIZE_MEDIUM;
        font-family: $COMPRESSED_STACK;
        text-transform: uppercase;
      }

      .content {
        height: calc(100vh - 85px);
        overflow-y: auto;

        .column {
          float: left;
          height: calc(100vh - 85px);
          padding-right: 15px;

          @include screen-size("small") {
            height: auto;
            width: 100%;
          }

          &.left {
            width: 66.666666%;
            border-right: 1px solid $white;
            overflow-y: auto;
            padding-left: 35px;

            @include screen-size("small") {
              border-right: unset;
              border-bottom: 1px solid $white;
              padding-bottom: 15px;
              margin-bottom: 15px;
            }
          }

          &.right {
            width: 33.333333%;

            font-size: $FONT_SIZE_NORMAL;
            font-family: $REGULAR_STACK;
            line-height: 1em;
            padding-left: 15px;
            overflow-y: auto;
            padding-bottom: 40px;
            padding-right: 35px;

            @include screen-size("small") {
              padding-left: unset;
            }
          }
        }
      }
    }
  }
</style>
