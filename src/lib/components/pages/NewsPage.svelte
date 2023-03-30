<script lang="ts">
  import { menuActive, languageStore } from "$lib/stores"
  import { onMount } from "svelte"
  import Metadata from "$lib/components/Metadata.svelte"
  import SinglePostImage from "$lib/components/SinglePostImage.svelte"
  import { renderBlockText } from "$lib/modules/sanity.js"
  import { Language } from "$lib/types"
  import Hamburger from "$lib/components/Hamburger.svelte"
  export let data
  export let language = $languageStore
  const { posts } = data

  const openMenu = () => {
    menuActive.set(true)
  }

  onMount(async () => {
    menuActive.set(false)
  })
</script>

<Metadata title={$languageStore === Language.English ? "News" : "Nyheter"} />

{#if !$menuActive}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <span on:click={openMenu}>
    <Hamburger />
  </span>
{/if}

<div class="news-page">
  <div class="inner">
    <div class="header">
      {#if $languageStore === Language.English}
        News
      {:else}
        Nyheter
      {/if}
    </div>
    {#each posts as post}
      <div class="news-item">
        <!-- TITLE -->
        {#if $languageStore === Language.English}
          <h1>
            {post.title_eng}
          </h1>
        {:else}
          <h1>
            {post.title}
          </h1>
        {/if}
        <!-- INGRESS -->
        <div class="intro">
          {#if $languageStore === Language.English}
            {#if post.intro_eng?.content}
              {@html renderBlockText(post.intro_eng?.content)}
            {/if}
          {/if}
          {#if $languageStore === Language.Swedish}
            {#if post.intro_sve?.content}
              {@html renderBlockText(post.intro_sve?.content)}
            {/if}
          {/if}
        </div>
        <!-- IMAGE -->
        <div class="image">
          <SinglePostImage {post} {language} />
        </div>
        <!-- MAIN CONTENT -->
        <div class="content">
          {#if $languageStore === Language.English}
            {#if post.content_eng?.content}
              {@html renderBlockText(post.content_eng?.content)}
            {/if}
          {/if}
          {#if $languageStore === Language.Swedish}
            {#if post.content_sve?.content}
              {@html renderBlockText(post.content_sve?.content)}
            {/if}
          {/if}
        </div>
        <!-- LIST -->
        {#if post.list?.length > 0}
          <div class="list">
            {#each post.list as item (item._key)}
              <div class="list-item">
                <div class="text">
                  {$languageStore === Language.English
                    ? item.text_eng
                    : item.text_sve}
                </div>
                <div class="time">
                  {item.time}
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .news-page {
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
      width: 800px;
      padding-top: 70px;
      padding-bottom: 50px;

      @include screen-size("small") {
        width: calc(100% - 20px);
        font-size: $FONT_SIZE_NORMAL;
        margin-top: 0;
      }

      .header {
        font-family: $COMPRESSED_STACK;
        font-size: $FONT_SIZE_SEMI;
        text-transform: uppercase;

        @include screen-size("small") {
          font-size: $FONT_SIZE_NORMAL;
        }
      }

      .news-item {
        margin-bottom: 50px;
        padding-bottom: 50px;

        h1 {
          font-family: $EXPANDED_STACK;
          font-size: $FONT_SIZE_SEMI_XLARGE;
          line-height: 1em;
          margin-top: 0;

          @include screen-size("small") {
            font-size: 24px;
            padding-top: 0;
          }
        }

        .intro {
          font-size: $FONT_SIZE_ALMOST_MEDIUM;
          font-family: $REGULAR_STACK;
          margin-bottom: 20px;

          @include screen-size("small") {
            font-size: $FONT_SIZE_NORMAL;
          }
        }

        .image {
          margin-bottom: 20px;
        }

        .content {
          font-size: $FONT_SIZE_MEDIUM;

          @include screen-size("small") {
            font-size: $FONT_SIZE_NORMAL;
          }
        }

        .list {
          margin-top: 40px;

          .list-item {
            padding-bottom: 10px;
            padding-top: 10px;
            border-bottom: 1px solid $black;

            .text {
              font-size: $FONT_SIZE_MEDIUM;
              font-family: $REGULAR_STACK;

              @include screen-size("small") {
                font-size: $FONT_SIZE_NORMAL;
              }
            }

            .time {
              font-size: $FONT_SIZE_SMALL;
              font-family: $REGULAR_STACK;
            }
          }
        }
      }
    }
  }
</style>
