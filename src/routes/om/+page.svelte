<script lang="ts">
  import DefaultPage from "$lib/components/pages/DefaultPage.svelte"
  import { Language } from "$lib/types"
  import { languageStore } from "$lib/stores"
  languageStore.set(Language.Swedish)
  export let data
</script>

{#key data}
  <DefaultPage {data} />
{/key}
