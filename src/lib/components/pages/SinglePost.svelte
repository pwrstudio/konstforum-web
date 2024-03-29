<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import { fade } from "svelte/transition"
  import { quadOut } from "svelte/easing"
  import { menuActive, urlPrefix, languageStore } from "$lib/stores"
  import { onMount } from "svelte"
  import Metadata from "$lib/components/Metadata.svelte"
  import X from "$lib/graphics/X.svelte"
  import SinglePostSlideshow from "$lib/components/SinglePostSlideshow.svelte"
  import SinglePostImage from "$lib/components/SinglePostImage.svelte"
  import { renderBlockText, toPlainText } from "$lib/modules/sanity.js"
  import { Language, type Block, type Post } from "$lib/types"
  export let data
  export let language = $languageStore
  export let popUp = false
  const { post }: { post: Post } = data

  console.log(post)

  const dispatch = createEventDispatcher()

  const close = () => {
    dispatch("close")
  }

  let title: string
  let content: Block[]
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

{#if popUp}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div on:click={close} class="close">
    <X />
  </div>
{:else}
  <a
    href={post._type == "event" ? $urlPrefix + "evenemang/" : $urlPrefix}
    class="close"
    data-sveltekit-preload-data
  >
    <X />
  </a>
{/if}

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

        <div class="section">
          <!-- WEBSITE -->
          {#if post.website}
            <a
              class="link"
              href={post.website}
              target="_blank"
              rel="noreferrer"
            >
              {$languageStore === Language.English ? "WEBSITE" : "HEMSIDA"}
            </a>
          {/if}
          <!-- SOCIAL MEDIA -->
          {#if post.socialMediaLinks?.length > 0}
            {#each post.socialMediaLinks as link}
              <a class="link" href={link.url} target="_blank" rel="noreferrer">
                {link.title}
              </a>
            {/each}
          {/if}
        </div>

        {#if post.emailAddress}
          <a
            href={"mailto:" +
              post.emailAddress +
              "?subject=Mail from Konstform"}
            class="contact"
          >
            {$languageStore === Language.English ? "CONTACT" : "KONTAKTA"}
          </a>
        {/if}
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .single-post {
    width: 100vw;
    background: $grey;
    color: $black;
    height: 100vh;
    font-family: $REGULAR_STACK;

    @include screen-size("small") {
      overflow-y: auto;
      height: auto;
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
        height: calc(100vh - 60px);
        overflow-y: auto;

        @include screen-size("small") {
          height: auto;
        }

        .column {
          float: left;
          height: calc(100vh - 60px);
          padding-right: 15px;

          @include screen-size("small") {
            height: auto;
            width: 100%;
          }

          &.left {
            width: 66.666666%;
            overflow-y: auto;
            padding-left: 35px;

            @include screen-size("small") {
              border-right: unset;
              padding-bottom: 0;
              margin-bottom: 0;
              padding-left: 10px;
              padding-right: 10px;
              width: 100%;
            }
          }

          &.right {
            width: 33.333333%;

            font-size: $FONT_SIZE_NORMAL;
            font-family: $REGULAR_STACK;
            padding-left: 15px;
            overflow-y: auto;
            padding-bottom: 40px;
            padding-right: 35px;
            line-height: 1.4em;

            @include screen-size("small") {
              padding-left: 10px;
              padding-right: 10px;
              width: 100%;
            }

            .section {
              margin-top: 20px;
              margin-bottom: 20px;

              .link {
                padding: 5px 10px;
                border: 1px solid $black;
                border-radius: 10px;
                font-family: $EXPANDED_STACK;
                font-size: $FONT_SIZE_XSMALL;
                display: inline-block;
                cursor: pointer;
                text-decoration: none;
                text-transform: uppercase;
                user-select: none;
                margin-right: 5px;

                &:hover {
                  text-decoration: underline;
                }
              }
            }

            .contact {
              padding: 5px 10px;
              border: 1px solid $black;
              border-radius: 10px;
              font-family: $EXPANDED_STACK;
              font-size: $FONT_SIZE_XSMALL;
              display: inline-block;
              cursor: pointer;
              text-decoration: none;
              user-select: none;

              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }

  .close {
    z-index: 100001;
    position: fixed;
    top: 20px;
    right: 25px;
    width: 30px;
    height: 30px;

    @include screen-size("small") {
      top: 10px;
      right: 15px;
    }
  }
</style>
