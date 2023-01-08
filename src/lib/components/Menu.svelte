<script lang="ts">
  import X from "$lib/graphics/X.svelte"
  import { fade } from "svelte/transition"
  import { quadOut } from "svelte/easing"
  import { languageStore, menuActive, urlPrefix } from "$lib/stores"
  import { Language, type MenuItem, UIColor } from "$lib/types"

  const menuItems: {
    sve: MenuItem[]
    eng: MenuItem[]
  } = {
    sve: [
      {
        title: "Evenemang och Projekt",
        link: "evenemang",
      },
      {
        title: "Om Konstforum",
        link: "om",
      },
    ],
    eng: [
      {
        title: "Events and Projects",
        link: "evenemang",
      },
      {
        title: "About Konstforum",
        link: "om",
      },
    ],
  }

  const closeMenu = () => {
    menuActive.set(false)
  }

  let activeMenuItems: MenuItem[]
  $: activeMenuItems =
    $languageStore === Language.English ? menuItems.eng : menuItems.sve
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="close" on:click={closeMenu}><X color={UIColor.White} /></div>

<div class="menu" in:fade={{ easing: quadOut, duration: 400 }}>
  <div class="inner">
    {#each activeMenuItems as item}
      <div>
        <a href={$urlPrefix + item.link} data-sveltekit-preload-data>
          {item.title}
        </a>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .close {
    z-index: 100001;
    position: fixed;
    top: 20px;
    right: 25px;
    width: 30px;
    height: 30px;
  }

  .menu {
    font-family: $COMPRESSED_STACK;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: $black;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100000;
    color: $white;
    text-align: center;

    @include screen-size("small") {
      align-items: flex-start;
      top: 70px;
      height: calc(100vh - 70px);
      padding-top: 70px;
    }

    .inner {
      width: calc(100vw - 360px);
      max-width: 95vw;
      display: flex;
      flex-direction: column;

      @include screen-size("small") {
        width: calc(100vw - 30px);
      }

      a {
        font-size: $FONT_SIZE_XLARGE;
        line-height: 1em;
        display: inline-block;
        color: inherit;
        text-decoration: none;
        text-transform: uppercase;
        line-height: 0.8em;
        margin-bottom: 20px;
        user-select: none;
        border-bottom: 10px solid $white;

        @include screen-size("small") {
          font-size: 36px;
        }
      }
    }
  }
</style>
