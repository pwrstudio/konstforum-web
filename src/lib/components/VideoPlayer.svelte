<script lang="ts">
  import { type Block } from "$lib/types"
  import { urlFor } from "$lib/modules/sanity"
  import getVideoId from "get-video-id"

  export let block: Block

  let active = false
  let imageURL = urlFor(block.posterImage)
    .height(800)
    .auto("format")
    .saturation(-100)
    .url()

  function generateEmbedCode(url: string): string {
    const { id, service } = getVideoId(url)

    if (!id || !service) {
      return "Invalid URL or unsupported video service"
    }

    switch (service) {
      case "youtube":
        return `<iframe width="100%"" height="100%" src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
      case "vimeo":
        return `<iframe src="https://player.vimeo.com/video/${id}?autoplay=1" width="100%" height="100%" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`
      default:
        return "Unsupported video service"
    }
  }

  let videoEmbedCode = generateEmbedCode(block.url ?? "")
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="video" class:active on:click={() => (active = true)}>
  {#if active}
    {@html videoEmbedCode}
  {:else}
    <div class="play-button">▶</div>
    <img src={imageURL} alt="video thumbnail" />
  {/if}
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .video {
    background: $lime;
    width: 100%;
    aspect-ratio: 16/9;
    cursor: pointer;
    line-height: 0;
    position: relative;

    .play-button {
      position: absolute;
      top: 55%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 100;
      font-size: 100px;
      color: $white;
    }

    &:hover {
      .play-button {
        color: $lime;
      }
    }

    &.active {
      cursor: default;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
</style>
