<script lang="ts">
  import MainPage from "$lib/components/pages/MainPage.svelte"
  import { Language } from "$lib/types/"
  import { languageStore } from "$lib/stores"
  languageStore.set(Language.Swedish)
  export let data: any
</script>

<MainPage {data} language={Language.Swedish} isSearch={true} />
