<script lang="ts">
  import { page } from "$app/stores"
  import X from "$lib/components/X.svelte"
  import Menu from "$lib/components/Menu.svelte"
  import FilterItem from "$lib/components/FilterItem.svelte"
  import { Language } from "$lib/types"
  import { menuActive, activeTypes, rawPosts, languageStore } from "$lib/stores"
  export let data
  const { posts } = data
  rawPosts.set(posts)
  activeTypes.set(["artist", "organization", "participant", "project"])

  $: console.log($page)

  const filterList = [
    {
      title: "Konstnärer",
      englishTitle: "Artists",
      type: "artist",
    },
    {
      title: "Org",
      englishTitle: "Org",
      type: "organization",
    },
    {
      title: "Verksamma",
      englishTitle: "Participant",
      type: "participant",
    },
    {
      title: "Projekt",
      englishTitle: "Project",
      type: "project",
    },
  ]

  const closeMenu = () => {
    menuActive.set(false)
  }

  const toggleLanguage = () => {
    if ($languageStore === Language.English) {
      languageStore.set(Language.Swedish)
    } else {
      languageStore.set(Language.English)
    }
  }
</script>

{#if $page.route?.id != "/post/[slug]"}
  <nav class="top-bar">
    <!-- TITLE -->
    <div class="title">
      <a href="/" data-sveltekit-preload-data>Konstforum i Skåne</a>
    </div>
    <!-- FILTER -->
    <div class="filter">
      {#each filterList as filterItem}
        <FilterItem {filterItem} />
      {/each}
    </div>
    <!-- TOOLBAR -->
    <div class="toolbar">
      <div class="toolbar-item search">Sök</div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="toolbar-item map-mode">Karta</div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="toolbar-item language"
        class:english={$languageStore === Language.English}
        on:click={toggleLanguage}
      >
        EN
      </div>
    </div>
  </nav>
{/if}

{#if $menuActive}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <span on:click={closeMenu}>
    <X />
  </span>
  <Menu />
{/if}

<slot />

<style lang="scss" global>
  @import "src/lib/style/variables.scss";

  .top-bar {
    height: 70px;
    top: 0;
    left: 0;
    width: 100vw;
    z-index: 10000;
    background: $lime;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 70px 0 35px;
    font-family: $EXPANDED_STACK;
    font-size: $FONT_SIZE_NORMAL;

    .title {
      a {
        text-decoration: none;
      }
    }

    .filter {
      display: flex;
    }

    .toolbar {
      display: flex;
      justify-content: center;
      align-items: center;

      .toolbar-item {
        border: 1px solid $black;
        border-radius: 20px;
        padding: 10px;
        margin-right: 5px;
        display: flex;
        justify-content: center;
        align-items: center;

        &.search {
          opacity: 0.6;
          padding-left: 20px;
          padding-right: 20px;
        }

        &.map-mode {
          font-size: $FONT_SIZE_SMALL;
          user-select: none;
          cursor: pointer;
        }

        &.language {
          font-size: $FONT_SIZE_XSMALL;
          user-select: none;
          cursor: pointer;
          padding: unset;
          height: 25px;
          width: 25px;
          border-radius: 100%;

          &.english {
            background: $black;
            color: $white;
          }
        }
      }
    }
  }

  body,
  html {
    font-family: $REGULAR_STACK;
  }
</style>
