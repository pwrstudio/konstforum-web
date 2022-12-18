<script lang="ts">
  import Image from "$lib/components/Image.svelte"
  import Metadata from "$lib/components/Metadata.svelte"
  import LargeArrowLeft from "$lib/graphics/LargeArrowLeft.svelte"
  import { renderBlockText, toPlainText } from "$lib/modules/sanity.js"
  import { Language, type ArtistType } from "$lib/types"
  export let language: Language
  export let data: ArtistType
  const title = language === Language.English ? data.title_eng : data.title
  const content =
    language === Language.English
      ? data.content_eng.content
      : data.content_sve.content
  const description =
    language === Language.English
      ? toPlainText(data.content_eng.content)
      : toPlainText(data.content_sve.content)
  const caption =
    language === Language.English
      ? data.mainImage.bildtext_eng || ""
      : data.mainImage.bildtext_sve || ""
  const urlPrefix = language === Language.English ? "/en/" : "/"
</script>

<Metadata {title} {description} />

<div class="single-artist">
  <a
    href={urlPrefix + "konstnarer"}
    data-sveltekit-preload-data
    class="back-arrow"
  >
    <LargeArrowLeft black={true} />
  </a>

  <div class="image">
    <Image imageDyad={data.mainImage} caption={title} />
  </div>
  <figcaption>{caption}</figcaption>
  <h1>{title}</h1>
  <div>{@html renderBlockText(content)}</div>
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .single-artist {
    font-family: $ATLAS_STACK;
    position: relative;

    .back-arrow {
      position: absolute;
      top: 0px;
      left: 0px;
    }

    h1 {
      font-size: $FONT_SIZE_MEDIUM;
      font-weight: normal;
      text-transform: uppercase;
    }

    .image {
      width: calc(100% - 80px);
      margin-left: auto;
      margin-right: auto;
      line-height: 0;
    }

    figcaption {
      font-size: $FONT_SIZE_SMALL;
      width: 100%;
      text-align: center;
      margin-top: 5px;
      margin-bottom: 25px;
    }
  }

  :global(.image img) {
    width: 100%;
    max-height: 500px;
    object-fit: contain;
  }
</style>
