<script lang="ts">
  import { page } from "$app/stores"
  import Menu from "$lib/components/Menu.svelte"
  import FilterItem from "$lib/components/FilterItem.svelte"
  import EventFilterItem from "$lib/components/EventFilterItem.svelte"
  import Search from "$lib/components/Search.svelte"
  import SubPageItem from "$lib/components/SubPageItem.svelte"
  import LanguageSwitch from "$lib/components/LanguageSwitch.svelte"
  import MapModeSwitch from "$lib/components/MapModeSwitch.svelte"
  import {
    menuActive,
    activeTypes,
    activeEventTypes,
    rawPosts,
    rawEvents,
    searchInputActive,
    categories,
  } from "$lib/stores"
  export let data
  const {
    posts,
    events,
    categoriesEvent,
    categoriesArtist,
    categoriesOrganisation,
    categoriesParticipant,
    categoriesProject,
    settings,
  } = data
  rawPosts.set(posts)
  rawEvents.set(events)
  activeTypes.set(["artist", "organization", "participant", "project"])
  activeEventTypes.set(["event", "festival", "open-call"])
  categories.set({
    event: categoriesEvent.categories.map(c => {
      return { label: { eng: c.label_eng, sve: c.label_sve }, id: c.label_sve }
    }),
    artist: categoriesArtist.categories.map(c => {
      return { label: { eng: c.label_eng, sve: c.label_sve }, id: c.label_sve }
    }),
    organisation: categoriesOrganisation.categories.map(c => {
      return { label: { eng: c.label_eng, sve: c.label_sve }, id: c.label_sve }
    }),
    participant: categoriesParticipant.categories.map(c => {
      return { label: { eng: c.label_eng, sve: c.label_sve }, id: c.label_sve }
    }),
    project: categoriesProject.categories.map(c => {
      return { label: { eng: c.label_eng, sve: c.label_sve }, id: c.label_sve }
    }),
  })

  const aboutSubPages = [
    {
      title: "Om",
      englishTitle: "About",
      id: "#about",
    },
    {
      title: "FAQ",
      englishTitle: "FAQ",
      id: "#faq",
    },
    {
      title: "Kontakt",
      englishTitle: "Contact",
      id: "#kontakt",
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
      englishTitle: "Professionals",
      type: "participant",
    },
    {
      title: "Projekt",
      englishTitle: "Projects",
      type: "project",
    },
  ]

  const eventFilterList = [
    {
      title: "Evenemang",
      englishTitle: "Event",
      type: "event",
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

  const aboutPages = ["/om", "/om/[slug]", "/en/om", "/en/om/[slug]"]
  const postPages = [
    "/",
    "/post",
    "/en/post",
    "/en",
    "/search",
    "/search/[slug]",
    "/en/search",
    "/en/search/[slug]",
  ]
  const eventPages = ["/evenemang", "/en/evenemang"]
  const newsPages = ["/nyheter", "/en/nyheter"]
</script>

{#if newsPages.includes($page.route?.id)}
  <nav class="top-bar news">
    <!-- TITLE -->
    <div class="title">
      <a href="/" data-sveltekit-preload-data>Konstforum i Skåne</a>
    </div>
    <!-- FILTER -->
    {#if !$searchInputActive}
      <div class="filter">
        <div class="news-head">
          <div class="bullet active" />
          NYHETER
        </div>
      </div>
    {/if}
    <!-- TOOLBAR -->
    <div class="toolbar">
      <Search />
      <LanguageSwitch />
    </div>
  </nav>
{/if}

{#if aboutPages.includes($page.route?.id)}
  <nav class="top-bar about">
    <!-- TITLE -->
    <div class="title">
      <a href="/" data-sveltekit-preload-data>Konstforum i Skåne</a>
    </div>
    <!-- FILTER -->
    {#if !$searchInputActive}
      <div class="filter">
        {#each aboutSubPages as subpage (subpage.id)}
          <SubPageItem {subpage} />
        {/each}
      </div>
    {/if}
    <!-- TOOLBAR -->
    <div class="toolbar">
      <Search />
      <LanguageSwitch />
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
        {#each filterList as filterItem (filterItem.type)}
          <FilterItem {filterItem} />
        {/each}
      {/if}
    </div>
    <!-- TOOLBAR -->
    <div class="toolbar">
      <Search />
      <MapModeSwitch />
      <LanguageSwitch />
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
        {#each eventFilterList as filterItem (filterItem.type)}
          <EventFilterItem {filterItem} />
        {/each}
      {/if}
    </div>
    <!-- TOOLBAR -->
    <div class="toolbar">
      <Search />
      <LanguageSwitch />
    </div>
  </nav>
{/if}

{#if $menuActive}
  <Menu {settings} />
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
    background: $white;

    @include screen-size("small") {
      flex-wrap: wrap;
      padding: 0 30px 0 10px;
    }

    &.post {
      background: $lime;
    }

    &.event {
      background: $grey;
    }

    &.news {
      background: $grey;
    }

    .title {
      a {
        text-decoration: none;
      }
      order: 1;

      @include screen-size("small") {
        font-size: $FONT_SIZE_SMALL;
        width: 40%;
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
        width: 60%;
        justify-content: flex-end;
        padding-right: 10px;
      }
    }
  }

  :global(body) {
    font-family: $REGULAR_STACK;
  }

  :global(*) {
    scroll-behavior: smooth;
    box-sizing: border-box;
    -webkit-font-feature-settings:
      "liga" on,
      "calt" on;
    -webkit-font-smoothing: antialiased;
    text-rendering: geometricPrecision;

    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
  }

  .news-head {
    text-transform: uppercase;
    border: 1px solid $black;
    margin-right: 10px;
    padding: 10px;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    cursor: pointer;

    @include screen-size("small") {
      font-size: $FONT_SIZE_XSMALL;
      padding: 6px 8px;
      margin-right: 5px;
      display: none;
    }

    .bullet {
      height: 13px;
      width: 13px;
      border-radius: 10px;
      background: transparent;
      border: 1px solid $black;
      margin-right: 5px;

      @include screen-size("small") {
        height: 7px;
        width: 7px;
      }

      &.active {
        background: $black;
      }
    }
  }
</style>
