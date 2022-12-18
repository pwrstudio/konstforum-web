<script lang="ts">
  import { fade } from "svelte/transition"
  import { quadOut } from "svelte/easing"
  import { menuActive } from "$lib/stores"
  import { onMount } from "svelte"
  import Metadata from "$lib/components/Metadata.svelte"
  import X from "$lib/components/X.svelte"
  import Image from "$lib/components/Image.svelte"
  import LargeArrowLeft from "$lib/graphics/LargeArrowLeft.svelte"
  import LargeArrowRight from "$lib/graphics/LargeArrowRight.svelte"
  import SingleProjectSlideshow from "$lib/components/SingleProjectSlideshow.svelte"
  import SingleProjectImage from "$lib/components/SingleProjectImage.svelte"
  import { renderBlockText, toPlainText } from "$lib/modules/sanity.js"
  import { Language, type ProjectType, UIColor } from "$lib/types"
  export let language: Language
  export let data: { project: ProjectType; projectList: ProjectType[] }
  const { project, projectList } = data

  let textColumnEl: HTMLElement

  function scrollDown() {
    textColumnEl.scrollIntoView({ behavior: "smooth" })
  }

  const title =
    language === Language.English ? project.title_eng : project.title

  const content =
    language === Language.English
      ? project.content_eng.content
      : project.content_sve.content

  const description =
    language === Language.English
      ? toPlainText(project.content_eng.content)
      : toPlainText(project.content_sve.content)

  const category =
    language === Language.English ? project.kategori_eng : project.kategori_sve

  const urlPrefix = language === Language.English ? "/en/" : "/"

  const timeCategoryHeader = () => {
    if (language === Language.English) {
      if (project.tidskategori === "pagaende-projekt") return "Ongoing project"
      return "Archive/documentation*"
    }
    if (language === Language.Swedish) {
      if (project.tidskategori === "pagaende-projekt") return "Pågående projekt"
      return "Arkiv/dokumentation*"
    }
  }

  const projectIndex = projectList.findIndex(
    (p: ProjectType) => p._id === project._id
  )

  let prevProjectLink =
    urlPrefix +
    "projekt/" +
    (projectIndex === 0
      ? projectList[projectList.length - 1].slug.current
      : projectList[projectIndex - 1].slug.current)

  let nextProjectLink =
    urlPrefix +
    "projekt/" +
    (projectIndex === projectList.length - 1
      ? projectList[0].slug.current
      : projectList[projectIndex + 1].slug.current)

  onMount(async () => {
    menuActive.set(false)
  })
</script>

<Metadata {title} {description} />

<a href={urlPrefix + "projekt"} data-sveltekit-preload-data>
  <X color={UIColor.White} />
</a>

<div class="page">
  <a
    href={prevProjectLink}
    class="page-navigation prev"
    data-sveltekit-preload-data
    data-sveltekit-reload
  >
    <LargeArrowLeft />
  </a>
  <a
    href={nextProjectLink}
    class="page-navigation next"
    data-sveltekit-preload-data
    data-sveltekit-reload
  >
    <LargeArrowRight />
  </a>
  <div class="inner" in:fade={{ easing: quadOut, duration: 400 }}>
    <div class="top-bar">{timeCategoryHeader()}</div>

    <div class="content" class:double={project.layout === "alt2"}>
      {#if project.layout === "alt2"}
        <div class="hero" on:click={scrollDown}>
          <Image imageDyad={project.mainImage} caption={title} />
        </div>
      {/if}

      <div class="column left" bind:this={textColumnEl}>
        {#if project.layout === "alt1" || project.layout === "alt2"}
          {#if project.bildspel && project.bildspel.length > 0}
            <SingleProjectSlideshow slides={project.bildspel} {language} />
          {:else}
            <SingleProjectImage {project} {language} />
          {/if}
        {/if}

        {#if project.layout === "alt3"}
          <div class="category">{category}</div>
          <div class="rubrik-text">
            {Language.English ? project.rubriktext_eng : project.rubriktext_sve}
          </div>
        {/if}
      </div>

      <div class="column right">
        {#if project.layout !== "alt3"}
          <div class="category">{category}</div>
          <h1>{title}</h1>
        {/if}
        <div>{@html renderBlockText(content)}</div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    background: $black;
    color: $white;
    height: 100vh;
    font-family: $ATLAS_STACK;
    font-size: $FONT_SIZE_LARGE;

    @include screen-size("small") {
      overflow-y: auto;
    }

    .page-navigation {
      width: 30px;
      height: 30px;
      position: fixed;
      top: 50%;
      transform: translateY(-50%);
      display: block;

      @include screen-size("small") {
        display: none;
      }

      &.next {
        right: 15px;
      }

      &.prev {
        left: 15px;
      }
    }

    .inner {
      width: 1040px;
      max-width: 90vw;
      margin-left: auto;
      margin-right: auto;

      .top-bar {
        padding-top: 35px;
        padding-bottom: 15px;
        width: 100%;
        border-bottom: 1px solid $white;
        font-family: $ATLAS_STACK;
        font-size: $FONT_SIZE_MEDIUM;
        text-transform: uppercase;
        margin-bottom: 15px;
        height: 70px;
      }

      .content {
        height: calc(100vh - 85px);
        overflow-y: auto;

        .hero {
          padding-bottom: 15px;
          width: 100%;
          height: calc(100vh - 85px);
          cursor: pointer;
        }

        .column {
          width: 50%;
          float: left;
          height: calc(100vh - 85px);
          padding-right: 15px;

          @include screen-size("small") {
            height: auto;
            width: 100%;
          }

          &.left {
            border-right: 1px solid $white;
            overflow-y: auto;

            @include screen-size("small") {
              border-right: unset;
              border-bottom: 1px solid $white;
              padding-bottom: 15px;
              margin-bottom: 15px;
            }

            .category {
              font-size: $FONT_SIZE_MEDIUM;

              @include screen-size("small") {
                font-size: $FONT_SIZE_SMALL;
              }
            }

            .rubrik-text {
              font-family: $BARBARA_STACK;
              font-size: $FONT_SIZE_XLARGE;
              line-height: 1em;

              @include screen-size("small") {
                font-size: $FONT_SIZE_SEMI_EXTRA;
              }
            }
          }

          &.right {
            font-size: $FONT_SIZE_MEDIUM;
            padding-left: 15px;
            overflow-y: auto;
            padding-bottom: 40px;

            @include screen-size("small") {
              padding-left: unset;
            }

            .category {
              font-size: $FONT_SIZE_SMALL;
            }
          }
        }
      }
    }
  }

  :global(h1) {
    font-size: $FONT_SIZE_MEDIUM;
  }

  :global(.column a) {
    color: inherit;
  }

  :global(.column p:first-child) {
    margin-top: 0;
  }

  :global(.hero img) {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
</style>
