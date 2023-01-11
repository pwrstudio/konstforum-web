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
  } = data
  rawPosts.set(posts)
  rawEvents.set(events)
  activeTypes.set(["artist", "organization", "participant", "project"])
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
        {#each filterList as filterItem}
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
        {#each eventFilterList as filterItem}
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
    }
  }

  body,
  html {
    font-family: $REGULAR_STACK;
  }

  * {
    scroll-behavior: smooth;
  }
</style>
