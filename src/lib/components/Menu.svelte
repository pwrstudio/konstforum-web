<script lang="ts">
  import X from "$lib/graphics/X.svelte"
  import { fade } from "svelte/transition"
  import { quadOut } from "svelte/easing"
  import { languageStore, menuActive, urlPrefix } from "$lib/stores"
  import { Language, type MenuItem, UIColor } from "$lib/types"

  export let settings: any

  const menuItems: MenuItem[] = [
    {
      title: {
        sve: "Nyheter",
        eng: "News",
      },
      link: "nyheter",
    },
    {
      title: {
        sve: "Anslagstavla",
        eng: "Bulletin Board",
      },
      link: "anslagstavla",
    },
    {
      title: {
        sve: "Evenemang",
        eng: "Events",
      },
      link: "evenemang",
    },
    {
      title: {
        sve: "Verksamma",
        eng: "Database",
      },
      link: "post",
    },
    {
      title: {
        sve: "Om Konstforum",
        eng: "About Konstforum",
      },
      link: "om",
    },
  ]

  const closeMenu = () => {
    menuActive.set(false)
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="close" on:click={closeMenu}><X color={UIColor.White} /></div>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="menu"
  on:click={closeMenu}
  in:fade={{ easing: quadOut, duration: 400 }}
>
  <div class="inner">
    <!-- {#if settings.showNewsInMenu}
      <div>
        <a href={$urlPrefix + "nyheter"} data-sveltekit-preload-data>
          {$languageStore === Language.English ? "News" : "Nyheter"}
        </a>
      </div>
    {/if} -->
    {#each menuItems as item (item.link)}
      <div>
        <a href={$urlPrefix + item.link} data-sveltekit-preload-data>
          {$languageStore === Language.English
            ? item.title.eng
            : item.title.sve}
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

    @include screen-size("small") {
      top: 10px;
      right: 5px;
    }
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

    .inner {
      width: calc(100vw - 360px);
      max-width: 95vw;
      display: flex;
      flex-direction: column;

      @include screen-size("small") {
        width: 100%;
      }

      a {
        display: inline-block;
        color: inherit;
        text-decoration: none;
        text-transform: uppercase;
        line-height: 0.8em;
        margin-bottom: 20px;
        user-select: none;
        border-bottom: 10px solid $white;
        font-size: $FONT_SIZE_XLARGE;
        word-spacing: 0.05em;

        @include screen-size("small") {
          font-size: $FONT_SIZE_LARGE;
          border-bottom: 7px solid $white;
        }

        &:hover {
          border-bottom: 10px solid transparent;
        }

        // @include screen-size("small") {
        //   font-family: $COMPRESSED_STACK;
        //   font-size: $FONT_SIZE_XLARGE;
        // }

        // @include screen-size("medium") {
        //   font-family: $REGULAR_STACK;
        //   font-size: $FONT_SIZE_LARGE;
        // }

        // @include screen-size("large") {
        //   font-family: $EXPANDED_STACK;
        //   font-size: $FONT_SIZE_LARGE;
        // }
      }
    }
  }
</style>
