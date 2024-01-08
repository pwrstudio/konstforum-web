<script lang="ts">
  import AnslagsForm from "$lib/components/forms/AnslagsForm.svelte"

  import X from "$lib/graphics/X.svelte"
  import LargeArrowDown from "$lib/graphics/LargeArrowDown.svelte"
  import LargeArrowUp from "$lib/graphics/LargeArrowUp.svelte"

  import { menuActive, languageStore } from "$lib/stores"
  import { onMount } from "svelte"
  import { Language, UIColor, type Post } from "$lib/types"

  import Metadata from "$lib/components/Metadata.svelte"
  import Hamburger from "$lib/components/Hamburger.svelte"
  import Anslag from "$lib/components/Anslag.svelte"

  export let data
  export let language = $languageStore
  const { posts }: { posts: Post[] } = data

  let formActive = false

  const toggleForm = () => {
    formActive = !formActive
  }

  const openMenu = () => {
    menuActive.set(true)
  }

  onMount(async () => {
    menuActive.set(false)
  })
</script>

<Metadata
  title={$languageStore === Language.English
    ? "Bulletin Board"
    : "Anslagstavla"}
/>

{#if !$menuActive}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <span on:click={openMenu}>
    <Hamburger />
  </span>
{/if}

{#if formActive}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="close-form" on:click={toggleForm}>
    <X color={UIColor.White} />
  </div>
  <div class="form">
    <AnslagsForm />
  </div>
{:else}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="form-banner" on:click={toggleForm}>
    <div class="text">
      {$languageStore === Language.English ? "New message?" : "Nytt anslag?"}
    </div>
    <div class="arrow down"><LargeArrowDown /></div>
    <div class="arrow up"><LargeArrowUp /></div>
  </div>
{/if}

<div class="anslagstavla">
  <div class="container">
    {#each posts as post}
      <Anslag {post} />
    {/each}
  </div>
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .anslagstavla {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: $grey;
    overflow-y: scroll;

    .container {
      width: 70%;
      display: flex;
      flex-wrap: wrap;
      padding-top: 50px;
      padding-bottom: 50px;
      align-items: flex-start;
      justify-content: flex-start;

      @include screen-size("small") {
        width: 100%;
      }
    }
  }

  .form {
    position: fixed;
    left: 66.666666666%;
    width: 33.333333333%;
    height: calc(100vh - 70px);
    padding-bottom: 40px;
    top: 70px;
    z-index: 1000;
    background: $black;
    color: $white;
    overflow-y: auto;

    @include screen-size("small") {
      left: 0;
      width: 100vw;
      padding: 10px 10px;
      height: calc(100vh - 70px);
      top: 70px;
    }
  }

  .form-banner {
    position: fixed;
    left: 66.666666666%;
    width: 33.333333333%;
    padding: 20px 20px;
    height: 70px;
    top: 70px;
    z-index: 1000;
    background: $black;
    color: $white;
    display: flex;
    justify-content: space-between;
    font-size: $FONT_SIZE_MEDIUM;
    font-family: $COMPRESSED_STACK;
    text-transform: uppercase;
    cursor: pointer;
    user-select: none;

    @include screen-size("small") {
      left: 0;
      width: 100vw;
      padding: 0px 20px;
      top: unset;
      bottom: 0;
      height: 40px;
      line-height: 40px;
      font-size: 18px;
    }

    .arrow {
      &.down {
        display: block;
        @include screen-size("small") {
          display: none;
        }
      }
      &.up {
        display: none;
        @include screen-size("small") {
          display: block;
        }
      }
    }
  }

  .close-form {
    position: fixed;
    right: 20px;
    width: 40px;
    height: 40px;
    top: 90px;
    z-index: 1001;
    cursor: pointer;
  }
</style>
