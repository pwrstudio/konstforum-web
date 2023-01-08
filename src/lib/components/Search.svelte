<script lang="ts">
  import { languageStore } from "$lib/stores"
  import { Language } from "$lib/types"
  import { goto } from "$app/navigation"
  import { tick } from "svelte"
  import { searchInputActive } from "$lib/stores"

  let term = ""
  let inputEl: HTMLElement

  const openInput = async () => {
    searchInputActive.set(true)
    await tick()
    inputEl.focus()
  }
  const closeInput = () => {
    searchInputActive.set(false)
  }
  const submit = () => {
    goto("/search/" + term)
    term = ""
    closeInput()
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="search" class:active={$searchInputActive}>
  {#if $searchInputActive}
    <input
      type="text"
      bind:value={term}
      bind:this={inputEl}
      on:keydown={e => {
        if (e.key === "Enter") submit()
      }}
    />
    <div class="submit" on:click={submit}>
      {$languageStore === Language.English ? "SEARCH" : "SÖK"}
    </div>
    <div class="close" on:click={closeInput}>X</div>
  {:else}
    <span on:click={openInput}>
      {$languageStore === Language.English ? "SEARCH..." : "SÖK..."}
    </span>
  {/if}
</div>

<style lang="scss" global>
  @import "src/lib/style/variables.scss";

  .search {
    border: 1px solid $black;
    border-radius: 20px;
    padding: 10px;
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: $EXPANDED_STACK;
    font-size: $FONT_SIZE_NORMAL;

    @include screen-size("small") {
      font-size: $FONT_SIZE_XSMALL;
    }

    input[type="text"] {
      border: unset;
      border-bottom: 1px solid $black;
      background: transparent;
      outline: unset;
      font-family: $EXPANDED_STACK;
      font-size: $FONT_SIZE_NORMAL;

      @include screen-size("small") {
        font-size: $FONT_SIZE_XSMALL;
      }
    }

    &.search {
      opacity: 0.6;
      padding-left: 20px;
      padding-right: 20px;

      &.active {
        opacity: 1;
      }

      .submit,
      .close {
        user-select: none;
        padding: 0 5px;
        cursor: pointer;
      }
    }
  }
</style>
