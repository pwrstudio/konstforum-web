<script lang="ts">
  import X from "$lib/components/X.svelte"
  import Menu from "$lib/components/Menu.svelte"
  import { menuActive } from "$lib/stores"

  export let data

  const filterList = [
    {
      title: "Konstnärer",
      category: "artist",
    },
    {
      title: "Org",
      category: "organization",
    },
    {
      title: "Verksamma",
      category: "participant",
    },
    {
      title: "Projekt",
      category: "project",
    },
  ]

  const closeMenu = () => {
    menuActive.set(false)
  }
</script>

<nav class="top-bar">
  <!-- TITLE -->
  <div class="title">Konstforum i Skåne</div>
  <!-- FILTER -->
  <div class="filter">
    {#each filterList as filterItem}
      <div class="filter-item">
        <div class="bullet" />
        {filterItem.title}
      </div>
    {/each}
  </div>
  <!-- TOOLBAR -->
  <div class="toolbar">
    <div class="toolbar-item search">Sök</div>
    <div class="toolbar-item mode">Karta</div>
    <div class="toolbar-item language">SV</div>
  </div>
</nav>

{#if $menuActive}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <span on:click={closeMenu}>
    <X />
  </span>
  <Menu />
{/if}

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

<slot />

<style lang="scss" global>
  @import "src/lib/style/variables.scss";

  .top-bar {
    height: 60px;
    top: 0;
    left: 0;
    width: 100vw;
    z-index: 10000;
    background: $lime;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    font-family: $EXPANDED_STACK;

    .filter {
      display: flex;

      .filter-item {
        text-transform: uppercase;
        border: 1px solid $black;
        margin-right: 10px;
        padding: 10px;
        border-radius: 30px;
        display: flex;
        justify-content: center;
        align-items: center;

        .bullet {
          height: 10px;
          width: 10px;
          border-radius: 10px;
          background: $black;
          margin-right: 5px;
        }
      }
    }

    .toolbar {
      display: flex;

      .toolbar-item {
        border: 1px solid $black;
        border-radius: 5px;
        padding: 5px;
        margin-right: 5px;

        &.mode {
          font-size: $FONT_SIZE_SMALL;
        }

        &.language {
          font-size: $FONT_SIZE_SMALL;
        }
      }
    }
  }

  body,
  html {
    font-family: $REGULAR_STACK;
  }
</style>
