<script lang="ts">
  import { renderBlockText } from "$lib/modules/sanity.js"
  import { type Block } from "$lib/types"

  import VideoPlayer from "$lib/components/VideoPlayer.svelte"

  export let content: Block[]
</script>

{#if content}
  {#each content as block}
    {#if block._type === "video"}
      <VideoPlayer {block} />
    {:else}
      {@html renderBlockText(block)}
    {/if}
  {/each}
{/if}
