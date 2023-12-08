<script lang="ts">
  import { fade } from "svelte/transition"
  import { Language } from "$lib/types"
  import { createEventDispatcher } from "svelte"
  import { renderBlockText } from "$lib/modules/sanity"
  const dispatch = createEventDispatcher()

  const close = () => {
    dispatch("close")
  }

  export let language: Language
  export let miljopolicy: any

  const content =
    language === Language.English
      ? miljopolicy.content_eng.content
      : miljopolicy.content_sve.content

  const buttonText =
    language === Language.English ? "ok, got it" : "ok, jag förstår"
</script>

<div class="miljopolicy" transition:fade>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="inner" on:click={close}>
    <div class="close">{buttonText}</div>
    {@html renderBlockText(content)}
  </div>
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .miljopolicy {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    width: calc(50vw - 45px);
    font-family: $MONO_STACK;
    font-size: $FONT_SIZE_SMALL;
    min-height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;

    @include screen-size("small") {
      display: none;
    }

    .inner {
      position: relative;
      padding: 5px 20px;
      background: $lime;
      z-index: 10000;
      width: 400px;
      border-radius: 10px;
      font-family: $MONO_STACK;
      font-size: $FONT_SIZE_SMALL;
      cursor: pointer;

      .close {
        position: absolute;
        top: 10px;
        right: 10px;
        border: 1px solid $black;
        border-radius: 40px;
        padding: 0 10px;
      }
    }
  }
</style>
