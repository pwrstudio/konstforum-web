<script lang="ts">
  import Metadata from "$lib/components/Metadata.svelte"
  import Hamburger from "$lib/components/Hamburger.svelte"
  import { fade } from "svelte/transition"
  import { quadOut } from "svelte/easing"
  import Image from "$lib/components/Image.svelte"
  import { Language, UIColor, type ProjectType } from "$lib/types"
  import { menuActive } from "$lib/stores"
  import { onMount } from "svelte"

  export let language: Language
  export let data: {
    projektPagaende: ProjectType[]
    projektArkivDokumentation: ProjectType[]
    listor: any[]
  }
  const { projektPagaende, projektArkivDokumentation, listor } = data

  const onGoingHeader =
    language === Language.English ? "Ongoing" : "Pågående projekt"
  const pastHeader =
    language === Language.English
      ? "Archive / documentation*"
      : "Arkiv / dokumentation*"
  const urlPrefix = language === Language.English ? "/en/" : "/"

  const specialIDs = [
    ...listor.pagaendeList.map(p => p._id),
    ...listor.arkivDokumentationList.map(p => p._id),
  ]
  const projektPagaendeSorted = [
    ...listor.pagaendeList,
    ...projektPagaende.filter(p => !specialIDs.includes(p._id)),
  ]
  const projektArkivDokumentationSorted = [
    ...listor.arkivDokumentationList,
    ...projektArkivDokumentation.filter(p => !specialIDs.includes(p._id)),
  ]

  const openMenu = () => {
    menuActive.set(true)
  }

  onMount(async () => {
    menuActive.set(false)
  })
</script>

<Metadata title={"Projekt"} />

{#if !$menuActive}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <span on:click={openMenu}>
    <Hamburger color={UIColor.White} />
  </span>
{/if}

<div class="page">
  <div class="inner" in:fade={{ easing: quadOut, duration: 400 }}>
    <!-- ONGOING -->
    <div class="section">
      <div class="section-header">{onGoingHeader}</div>
      {#each projektPagaendeSorted as project, i (project._id)}
        {#if i > 0 && i % 4 === 0}
          <div class="desktop-divider" />
        {/if}
        {#if i > 0 && i % 2 === 0}
          <div class="phone-divider" />
        {/if}
        <a class="project" href={urlPrefix + "projekt/" + project.slug.current}>
          <div class="image">
            <Image
              imageDyad={project.mainImage}
              caption={project.title}
              width={400}
              height={300}
            />
          </div>
          <div class="title">{project.title}</div>
        </a>
      {/each}
    </div>

    <!-- ARCHIVE -->
    <div class="section">
      <div class="section-header">{pastHeader}</div>
      {#each projektArkivDokumentationSorted as project, i (project._id)}
        {@const category =
          language === Language.English
            ? project.kategori_eng
            : project.kategori_sve}
        {#if i > 0 && i % 4 === 0}
          <div class="desktop-divider" />
        {/if}
        {#if i > 0 && i % 2 === 0}
          <div class="phone-divider" />
        {/if}
        <a
          class="project"
          data-sveltekit-preload-data
          href={urlPrefix + "projekt/" + project.slug.current}
        >
          <div class="image">
            <Image
              imageDyad={project.mainImage}
              caption={project.title}
              width={400}
              height={300}
            />
          </div>
          <div class="category">{category}</div>
          <div class="title">{project.title}</div>
        </a>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .page {
    background: $black;
    color: $white;
    font-family: $MONO_STACK;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    font-size: $FONT_SIZE_MEDIUM;

    .inner {
      width: 1040px;
      max-width: 90vw;
      margin-left: auto;
      margin-right: auto;
      padding-top: 35px;

      @include screen-size("small") {
        padding-top: 90px;
      }

      .section {
        display: inline-block;
        width: 100%;
        margin-bottom: 40px;
        border-bottom: 1px solid white;

        @include screen-size("small") {
          margin-bottom: 10px;
        }

        .section-header {
          border-bottom: 1px solid white;
          width: 100%;
          padding-bottom: 15px;
          margin-bottom: 15px;
          text-transform: uppercase;

          @include screen-size("small") {
            padding-bottom: 10px;
            margin-bottom: 10px;
            font-size: $FONT_SIZE_SMALL;
          }
        }

        .phone-divider {
          width: 100%;
          height: 1px;
          background: $white;
          float: left;
          margin-bottom: 10px;
          display: none;

          @include screen-size("small") {
            display: block;
          }
        }

        .desktop-divider {
          width: 100%;
          height: 1px;
          background: $white;
          float: left;
          margin-bottom: 20px;
          display: block;

          @include screen-size("small") {
            display: none;
          }
        }

        .project {
          width: 25%;
          border-left: 1px solid white;
          color: white;
          text-decoration: none;
          padding: 0 15px;
          display: block;
          float: left;
          height: 290px;
          margin-bottom: 20px;
          border-right: 1px solid white;

          @include screen-size("small") {
            margin-bottom: 10px;
            font-size: $FONT_SIZE_SMALL;
            width: 50%;
            height: 200px;
          }

          .category {
            font-size: $FONT_SIZE_SMALL;
            margin-bottom: 5px;
          }

          .image {
            margin-top: 0;
            margin-bottom: 15px;
            height: 180px;
            width: 100%;

            @include screen-size("small") {
              height: 110px;
            }
          }
        }
      }
    }
  }

  :global(.project .image img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin-top: 0;
  }
</style>
