<script lang="ts">
  import { page } from "$app/stores"
  import Menu from "$lib/components/Menu.svelte"
  import FilterItem from "$lib/components/FilterItem.svelte"
  import EventFilterItem from "$lib/components/EventFilterItem.svelte"
  import Search from "$lib/components/Search.svelte"
  import SubPageItem from "$lib/components/SubPageItem.svelte"
  import { Language } from "$lib/types"
  import {
    mapMode,
    menuActive,
    activeTypes,
    rawPosts,
    languageStore,
    rawEvents,
    searchInputActive,
  } from "$lib/stores"
  export let data
  const { posts, events } = data
  rawPosts.set(posts)
  rawEvents.set(events)
  activeTypes.set(["artist", "organization", "participant", "project"])

  const aboutSubPages = [
    {
      title: "Om",
      englishTitle: "About",
      url: "om",
    },
    {
      title: "FAQ",
      englishTitle: "FAQ",
      url: "om/faq",
    },
    {
      title: "Kontakt",
      englishTitle: "Contact",
      url: "om/kontakt",
    },
  ]

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

  const eventFilterList = [
    {
      title: "Evenemang",
      englishTitle: "Event",
      type: "evenemang",
    },
    {
      title: "Festival",
      englishTitle: "Festival",
      type: "festival",
    },
    {
      title: "Open call",
      englishTitle: "Open call",
      type: "open-call",
    },
  ]

  const toggleLanguage = () => {
    if ($languageStore === Language.English) {
      languageStore.set(Language.Swedish)
    } else {
      languageStore.set(Language.English)
    }
  }

  const toggleMapMode = () => {
    mapMode.set(!$mapMode)
  }

  const aboutPages = ["/om", "/om/[slug]", "/en/om", "/en/om/[slug]"]
  const postPages = [
    "/",
    "/en",
    "/search",
    "/search/[slug]",
    "/en/search",
    "/en/search/[slug]",
  ]
  const eventPages = ["/evenemang", "/en/evenemang"]
</script>

{#if aboutPages.includes($page.route?.id)}
  <nav class="top-bar about">
    <!-- TITLE -->
    <div class="title">
      <a href="/" data-sveltekit-preload-data>Konstforum i Skåne</a>
    </div>
    <!-- FILTER -->
    {#if !$searchInputActive}
      <div class="filter">
        {#each aboutSubPages as subpage}
          <SubPageItem {subpage} />
        {/each}
      </div>
    {/if}
    <!-- TOOLBAR -->
    <div class="toolbar">
      <Search />
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

{#if postPages.includes($page.route?.id)}
  <nav class="top-bar post">
    <!-- TITLE -->
    <div class="title">
      <a href="/" data-sveltekit-preload-data>Konstforum i Skåne</a>
    </div>
    <!-- FILTER -->
    <div class="filter">
      {#if !$searchInputActive}
        {#each filterList as filterItem}
          <FilterItem {filterItem} />
        {/each}
      {/if}
    </div>
    <!-- TOOLBAR -->
    <div class="toolbar">
      <Search />
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="toolbar-item map-mode"
        class:active={$mapMode}
        on:click={toggleMapMode}
      >
        {$languageStore === Language.English ? "MAP" : "KARTA"}
      </div>
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

{#if eventPages.includes($page.route?.id)}
  <nav class="top-bar event">
    <!-- TITLE -->
    <div class="title">
      <a href="/" data-sveltekit-preload-data>Konstforum i Skåne</a>
    </div>
    <!-- FILTER -->
    <div class="filter">
      {#if !$searchInputActive}
        {#each eventFilterList as filterItem}
          <EventFilterItem {filterItem} />
        {/each}
      {/if}
    </div>
    <!-- TOOLBAR -->
    <div class="toolbar">
      <Search />
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
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 70px 0 35px;
    font-family: $EXPANDED_STACK;
    font-size: $FONT_SIZE_NORMAL;

    @include screen-size("small") {
      flex-wrap: wrap;
      padding: 0 70px 0 20px;
    }

    &.post {
      background: $lime;
    }

    .title {
      a {
        text-decoration: none;
      }
      order: 1;

      @include screen-size("small") {
        font-size: $FONT_SIZE_SMALL;
      }
    }

    .filter {
      display: flex;

      order: 2;

      @include screen-size("small") {
        order: 3;
        width: 100%;
        font-size: $FONT_SIZE_SMALL;
      }
    }

    .toolbar {
      display: flex;
      justify-content: center;
      align-items: center;

      order: 3;

      @include screen-size("small") {
        order: 2;
      }

      .toolbar-item {
        border: 1px solid $black;
        border-radius: 20px;
        padding: 10px;
        margin-right: 5px;
        display: flex;
        justify-content: center;
        align-items: center;

        &.map-mode {
          font-size: $FONT_SIZE_XSMALL;
          user-select: none;
          cursor: pointer;

          &.active {
            background: $black;
            color: $white;
          }
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
