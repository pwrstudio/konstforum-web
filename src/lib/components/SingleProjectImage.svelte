<script lang="ts">
  import Image from "$lib/components/Image.svelte"
  import { Language } from "$lib/types"
  export let language: Language
  export let project: any
  const caption = Language.English ? project.title_eng : project.title
</script>

<div class="inner">
  <div class="image">
    <Image imageDyad={project.mainImage} {caption} />
  </div>
  <div class="caption">
    <div>{caption}</div>
  </div>
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .inner {
    width: 100%;
    height: calc(100% - 20px);
    font-family: $ATLAS_STACK;
    font-size: $FONT_SIZE_SMALL;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    color: $white;

    img {
      max-width: 100%;
    }

    .caption {
      width: 100%;
      text-align: center;
      padding: 0 10px;
      display: flex;
      justify-content: center;
      .arrow {
        height: 8px;
        width: 8px;
      }
    }
  }

  :global(.inner img) {
    max-width: 100%;
  }
</style>
