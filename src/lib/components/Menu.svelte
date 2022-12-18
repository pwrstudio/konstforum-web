<script lang="ts">
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"
  import { quadOut } from "svelte/easing"
  import { languageStore } from "$lib/stores"
  import { Language, type MenuItem } from "$lib/types"

  const menuItems: {
    sve: MenuItem[]
    eng: MenuItem[]
  } = {
    sve: [
      {
        title: "Evenemang och Projekt",
        link: "/evenemang",
      },
      {
        title: "Om Konstforum",
        link: "/om",
      },
    ],
    eng: [
      {
        title: "Events and Projects",
        link: "/evenemang",
      },
      {
        title: "About Konstforum",
        link: "/om",
      },
    ],
  }

  let activeMenuItems: MenuItem[]
  $: activeMenuItems =
    $languageStore === Language.English ? menuItems.eng : menuItems.sve
</script>

<div class="menu" in:fade={{ easing: quadOut, duration: 400 }}>
  <!-- <div class="language-switch">
    <span
      class="language-option"
      class:selected={$languageStore === Language.Swedish}
      on:click={() => {
        languageStore.set(Language.Swedish)
      }}
    >
      SVE
    </span>
    <span class="slash">/</span>
    <span
      class="language-option"
      class:selected={$languageStore === Language.English}
      on:click={() => {
        languageStore.set(Language.English)
      }}
    >
      ENG
    </span>
  </div> -->

  <div class="inner">
    {#each activeMenuItems as item}
      <a href={item.link} data-sveltekit-preload-data>
        {item.title}
      </a>
    {/each}
  </div>
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .language-switch {
    position: absolute;
    top: 30px;
    left: 180px;
    font-size: $FONT_SIZE_LARGE;
    user-select: none;
    cursor: pointer;

    @include screen-size("small") {
      font-size: $FONT_SIZE_MEDIUM;
      left: 15px;
      top: 15px;
    }

    .language-option {
      &.selected {
        border-bottom: 1px solid black;
      }
    }

    .slash {
      display: inline-block;
      padding-left: 3px;
      padding-right: 3px;

      @include screen-size("small") {
        padding-left: 5px;
        padding-right: 5px;
      }
    }
  }

  .menu {
    font-family: $BARBARA_STACK;
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

      @include screen-size("small") {
        width: calc(100vw - 30px);
      }

      a {
        font-size: $FONT_SIZE_XLARGE;
        line-height: 1em;
        display: block;
        color: inherit;
        text-decoration: none;
        padding: 10px 0;
        user-select: none;

        @include screen-size("small") {
          font-size: 36px;
        }
      }
    }
  }
</style>
