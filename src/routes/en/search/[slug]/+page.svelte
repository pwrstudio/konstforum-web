<script lang="ts">
  import MainPage from "$lib/components/pages/MainPage.svelte"
  import { Language } from "$lib/types/"
  import { languageStore } from "$lib/stores"
  languageStore.set(Language.English)
  export let data: any
</script>

{#key data}
  <MainPage {data} language={Language.English} isSearch={true} />
{/key}
