<script lang="ts">
  import NewsPage from "$lib/components/pages/NewsPage.svelte"
  import { Language } from "$lib/types/"
  import { languageStore } from "$lib/stores"
  languageStore.set(Language.Swedish)
  export let data: any
</script>

<NewsPage {data} language={Language.Swedish} />
