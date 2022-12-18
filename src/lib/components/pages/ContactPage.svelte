<script lang="ts">
  import Metadata from "$lib/components/Metadata.svelte"
  import { fade } from "svelte/transition"
  import { quadOut } from "svelte/easing"
  import { menuActive } from "$lib/stores"
  import { onMount } from "svelte"
  import X from "$lib/components/X.svelte"
  import Logos from "$lib/components/Logos.svelte"
  import { renderBlockText } from "$lib/modules/sanity.js"
  import { Language, type ContactPageType } from "$lib/types"
  export let language: Language
  export let data: ContactPageType

  const infoText =
    language === Language.English
      ? data.info_eng.content
      : data.info_sve.content
  const content =
    language === Language.English
      ? data.content_eng.content
      : data.content_sve.content
  const urlPrefix = language === Language.English ? "/en/" : "/"

  onMount(async () => {
    menuActive.set(false)
  })
</script>

<Metadata title={"Information / Kontakt"} />

<a href={urlPrefix + ""}>
  <X />
</a>

<div class="page">
  <div class="inner" in:fade={{ easing: quadOut, duration: 400 }}>
    <div class="top-bar">Information/Kontakt</div>

    <div class="column left">
      <div class="top">
        <div class="logo">Plattform KcSyd</div>
        <div class="tagline">
          En konstnärsdriven plattform för offentlig konst i södra sverige
        </div>
      </div>
      <div class="bottom">
        <div class="info-text">{@html renderBlockText(infoText)}</div>
        <div class="logos">
          <Logos />
        </div>
      </div>
    </div>

    <div class="column right">
      <div>{@html renderBlockText(content)}</div>
    </div>

    <div class="logos-phone">
      <div class="info-text">{@html renderBlockText(infoText)}</div>
      <div class="logos">
        <Logos />
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    background: $grey;
    height: 100vh;
    color: $black;
    font-family: $BARBARA_STACK;
    font-size: $FONT_SIZE_LARGE;
    padding-bottom: 5em;

    @include screen-size("small") {
      overflow-y: auto;
    }

    .inner {
      width: 1040px;
      max-width: 90vw;
      margin-left: auto;
      margin-right: auto;

      .top-bar {
        padding-top: 35px;
        padding-bottom: 15px;
        width: 100%;
        border-bottom: 1px solid $black;
        font-family: $ATLAS_STACK;
        font-size: $FONT_SIZE_MEDIUM;
        text-transform: uppercase;
        margin-bottom: 15px;
        height: 70px;
      }

      .column {
        width: 50%;
        float: left;
        height: calc(100vh - 85px);
        padding-right: 15px;

        @include screen-size("small") {
          width: 100%;
          height: auto;
        }

        &.left {
          border-right: 1px solid black;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          @include screen-size("small") {
            border-right: unset;
          }

          .top {
            border-left: 1px solid black;

            @include screen-size("small") {
              border-left: unset;
            }

            .logo {
              font-size: 60px;
              line-height: 1em;
              margin: 0 15px;
              padding: 15px 0;
              border-bottom: 1px solid black;

              @include screen-size("small") {
                margin: 0;
              }
            }

            .tagline {
              padding: 15px;
              font-size: 24px;

              @include screen-size("small") {
                padding: 15px 0;
              }
            }
          }

          .bottom {
            margin-bottom: 15px;

            @include screen-size("small") {
              display: none;
            }

            .info-text {
              font-family: $ATLAS_STACK;
              font-size: $FONT_SIZE_MEDIUM;
            }
            .logos {
              display: inline-block;
              border-top: 1px solid black;
              border-bottom: 1px solid black;
            }
          }
        }

        &.right {
          padding: 0 15px;
          overflow-y: auto;
          padding-bottom: 40px;

          @include screen-size("small") {
            padding: 0;
            font-size: $FONT_SIZE_MEDIUM;
          }
        }
      }
    }
  }

  .logos-phone {
    display: none;

    @include screen-size("small") {
      display: block;
    }

    .info-text {
      font-family: $ATLAS_STACK;
      font-size: $FONT_SIZE_MEDIUM;
    }
    .logos {
      display: inline-block;
      border-top: 1px solid black;
      border-bottom: 1px solid black;
    }
  }

  :global(.right .small) {
    font-family: $ATLAS_STACK;
    font-size: $FONT_SIZE_MEDIUM;
  }
</style>
